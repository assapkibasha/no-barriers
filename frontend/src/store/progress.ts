'use client'

export interface ProgressState {
  xp: number
  streak: number
  lastActivityDate: string // ISO date string YYYY-MM-DD
  hearts: number
  maxHearts: number
  lastHeartsRefill: string // ISO date string
  completedLessons: string[]  // lesson IDs
  perfectLessons: string[]    // lesson IDs with no mistakes
}

const STORAGE_KEY = 'nb_progress'
const MAX_HEARTS = 5

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function defaultState(): ProgressState {
  return {
    xp: 0,
    streak: 0,
    lastActivityDate: '',
    hearts: MAX_HEARTS,
    maxHearts: MAX_HEARTS,
    lastHeartsRefill: today(),
    completedLessons: [],
    perfectLessons: [],
  }
}

export function getProgress(): ProgressState {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const state: ProgressState = JSON.parse(raw)
    // Refill hearts if day changed
    if (state.lastHeartsRefill !== today()) {
      state.hearts = MAX_HEARTS
      state.lastHeartsRefill = today()
      saveProgress(state)
    }
    return state
  } catch {
    return defaultState()
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function addXP(amount: number): ProgressState {
  const state = getProgress()
  state.xp += amount
  // Update streak
  const t = today()
  if (state.lastActivityDate !== t) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yStr = yesterday.toISOString().split('T')[0]
    state.streak = state.lastActivityDate === yStr ? state.streak + 1 : 1
    state.lastActivityDate = t
  }
  saveProgress(state)
  return state
}

export function loseHeart(): ProgressState {
  const state = getProgress()
  if (state.hearts > 0) state.hearts -= 1
  saveProgress(state)
  return state
}

export function completeLesson(lessonId: string, perfect: boolean, xpEarned: number): ProgressState {
  const state = addXP(xpEarned)
  if (!state.completedLessons.includes(lessonId)) {
    state.completedLessons.push(lessonId)
  }
  if (perfect && !state.perfectLessons.includes(lessonId)) {
    state.perfectLessons.push(lessonId)
  }
  saveProgress(state)
  return state
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().completedLessons.includes(lessonId)
}

export function getLevel(xp: number): { label: string; next: number } {
  if (xp < 100)  return { label: 'Beginner',     next: 100 }
  if (xp < 300)  return { label: 'Elementary',   next: 300 }
  if (xp < 700)  return { label: 'Intermediate', next: 700 }
  if (xp < 1500) return { label: 'Advanced',     next: 1500 }
  return { label: 'Master', next: 1500 }
}

export const BADGES = [
  { id: 'first-lesson',  label: 'First Step',   emoji: '👶', description: 'Complete your first lesson',      check: (s: ProgressState) => s.completedLessons.length >= 1 },
  { id: 'streak-3',      label: '3-Day Streak', emoji: '🔥', description: 'Learn 3 days in a row',           check: (s: ProgressState) => s.streak >= 3 },
  { id: 'streak-7',      label: 'Week Warrior', emoji: '💪', description: 'Learn 7 days in a row',           check: (s: ProgressState) => s.streak >= 7 },
  { id: 'perfect',       label: 'Perfectionist',emoji: '⭐', description: 'Complete a lesson without errors', check: (s: ProgressState) => s.perfectLessons.length >= 1 },
  { id: 'xp-500',        label: 'XP Hunter',    emoji: '⚡', description: 'Earn 500 XP total',              check: (s: ProgressState) => s.xp >= 500 },
  { id: 'lessons-10',    label: 'Dedicated',    emoji: '📚', description: 'Complete 10 lessons',             check: (s: ProgressState) => s.completedLessons.length >= 10 },
]
