'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

export interface User {
  id: number
  name: string
  email: string
}

export interface ProgressState {
  xp: number
  streak: number
  lastActivityDate: string
  hearts: number
  maxHearts: number
  lastHeartsRefill: string
  completedLessons: string[]
  perfectLessons: string[]
  weakSigns: string[]
}

const MAX_HEARTS = 5

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function defaultState(): ProgressState {
  return {
    xp: 0, streak: 0, lastActivityDate: '',
    hearts: MAX_HEARTS, maxHearts: MAX_HEARTS,
    lastHeartsRefill: today(),
    completedLessons: [], perfectLessons: [], weakSigns: [],
  }
}

// Map API field names → our ProgressState
function fromAPI(data: any): ProgressState {
  return {
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
    lastActivityDate: data.lastActivity ?? '',
    hearts: data.hearts ?? MAX_HEARTS,
    maxHearts: MAX_HEARTS,
    lastHeartsRefill: data.heartsLastRefill ?? today(),
    completedLessons: data.completedLessons ?? [],
    perfectLessons: data.perfectLessons ?? [],
    weakSigns: data.weakSigns ?? [],
  }
}

function toAPI(state: ProgressState) {
  return {
    xp: state.xp,
    streak: state.streak,
    lastActivity: state.lastActivityDate || null,
    hearts: state.hearts,
    heartsLastRefill: state.lastHeartsRefill || null,
    completedLessons: state.completedLessons,
    perfectLessons: state.perfectLessons,
    badges: [],
    weakSigns: state.weakSigns,
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────
interface ProgressCtx {
  user: User | null
  progress: ProgressState
  loading: boolean
  saveProgress: (state: ProgressState) => Promise<void>
  addXP: (amount: number) => Promise<ProgressState>
  loseHeart: () => Promise<ProgressState>
  completeLesson: (lessonId: string, perfect: boolean, xpEarned: number) => Promise<ProgressState>
  recordWeak: (signId: string) => Promise<void>
  clearWeak: (signId: string) => Promise<void>
  refetch: () => Promise<void>
}

const Ctx = createContext<ProgressCtx | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState<ProgressState>(defaultState())
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch('/api/progress')
      if (!res.ok) { setLoading(false); return }
      const data = await res.json()
      setUser(data.user ?? null)
      let state = fromAPI(data)
      // Refill hearts if day changed
      if (state.lastHeartsRefill !== today()) {
        state = { ...state, hearts: MAX_HEARTS, lastHeartsRefill: today() }
        await persistProgress(state)
      }
      setProgress(state)
    } catch {
      // not logged in or network error — use defaults
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const persistProgress = async (state: ProgressState) => {
    setProgress(state)
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toAPI(state)),
      })
    } catch { /* ignore */ }
  }

  const addXP = async (amount: number): Promise<ProgressState> => {
    const t = today()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yStr = yesterday.toISOString().split('T')[0]

    const next: ProgressState = {
      ...progress,
      xp: progress.xp + amount,
      streak: progress.lastActivityDate !== t
        ? (progress.lastActivityDate === yStr ? progress.streak + 1 : 1)
        : progress.streak,
      lastActivityDate: t,
    }
    await persistProgress(next)
    return next
  }

  const loseHeart = async (): Promise<ProgressState> => {
    const next = { ...progress, hearts: Math.max(0, progress.hearts - 1) }
    await persistProgress(next)
    return next
  }

  const completeLesson = async (lessonId: string, perfect: boolean, xpEarned: number): Promise<ProgressState> => {
    const afterXP = await addXP(xpEarned)
    const next: ProgressState = {
      ...afterXP,
      completedLessons: afterXP.completedLessons.includes(lessonId)
        ? afterXP.completedLessons
        : [...afterXP.completedLessons, lessonId],
      perfectLessons: perfect && !afterXP.perfectLessons.includes(lessonId)
        ? [...afterXP.perfectLessons, lessonId]
        : afterXP.perfectLessons,
    }
    await persistProgress(next)
    return next
  }

  const recordWeak = async (signId: string) => {
    if (progress.weakSigns.includes(signId)) return
    const next = { ...progress, weakSigns: [...progress.weakSigns, signId] }
    await persistProgress(next)
  }

  const clearWeak = async (signId: string) => {
    const next = { ...progress, weakSigns: progress.weakSigns.filter((s) => s !== signId) }
    await persistProgress(next)
  }

  return (
    <Ctx.Provider value={{
      user, progress, loading,
      saveProgress: persistProgress,
      addXP, loseHeart, completeLesson,
      recordWeak, clearWeak,
      refetch: fetchProgress,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}

// ─── Pure helpers (no side effects) ───────────────────────────────────────────
export function getLevel(xp: number): { labelKey: string; next: number } {
  if (xp < 100)  return { labelKey: 'Beginner',     next: 100 }
  if (xp < 300)  return { labelKey: 'Elementary',   next: 300 }
  if (xp < 700)  return { labelKey: 'Intermediate', next: 700 }
  if (xp < 1500) return { labelKey: 'Advanced',     next: 1500 }
  return { labelKey: 'Master', next: 1500 }
}

export const BADGES = [
  { id: 'first-lesson',  label: 'First Step',    emoji: '👶', description: 'Complete your first lesson',       check: (s: ProgressState) => s.completedLessons.length >= 1 },
  { id: 'streak-3',      label: '3-Day Streak',  emoji: '🔥', description: 'Learn 3 days in a row',            check: (s: ProgressState) => s.streak >= 3 },
  { id: 'streak-7',      label: 'Week Warrior',  emoji: '💪', description: 'Learn 7 days in a row',            check: (s: ProgressState) => s.streak >= 7 },
  { id: 'perfect',       label: 'Perfectionist', emoji: '⭐', description: 'Complete a lesson without errors',  check: (s: ProgressState) => s.perfectLessons.length >= 1 },
  { id: 'xp-500',        label: 'XP Hunter',     emoji: '⚡', description: 'Earn 500 XP total',               check: (s: ProgressState) => s.xp >= 500 },
  { id: 'lessons-10',    label: 'Dedicated',     emoji: '📚', description: 'Complete 10 lessons',              check: (s: ProgressState) => s.completedLessons.length >= 10 },
]
