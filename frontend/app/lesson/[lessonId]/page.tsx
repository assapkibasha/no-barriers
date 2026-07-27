'use client'

import { useEffect, useState, useCallback, useRef, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { getLessonById } from '../../../src/data/lessons'
import { signs, type Sign } from '../../../src/data/signs'
import { useProgress } from '../../../src/store/progress-context'
import { useTranslations } from 'next-intl'

// ─── Types ────────────────────────────────────────────────────────────────────
type ExerciseType = 'image-to-word' | 'word-to-image' | 'typing'

interface Exercise {
  type: ExerciseType
  sign: Sign
  choices: Sign[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pickWrongChoices(correct: Sign, allSigns: Sign[], unitSigns: Sign[], n = 3): Sign[] {
  const pool = unitSigns.filter((s) => s.id !== correct.id)
  const extended = allSigns.filter((s) => s.id !== correct.id)
  const source = pool.length >= n ? pool : extended
  return shuffle(source).slice(0, n)
}

function buildExercises(signIds: string[], allUnitSigns: Sign[]): Exercise[] {
  const lessonSigns = signIds.map((id) => signs.find((s) => s.id === id)!).filter(Boolean)
  return lessonSigns.map((sign, idx) => {
    const type: ExerciseType =
      idx % 3 === 0 ? 'image-to-word' : idx % 3 === 1 ? 'word-to-image' : 'typing'
    const wrongs = pickWrongChoices(sign, signs, allUnitSigns)
    return { type, sign, choices: shuffle([sign, ...wrongs]) }
  })
}

function Hearts({ count, max }: { count: number; max: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-xl transition-all ${i < count ? 'opacity-100' : 'opacity-20'}`}>❤️</span>
      ))}
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-line/60 dark:bg-gray-800">
      <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

import { ErrorBoundary } from '../../../src/components/ErrorBoundary'

// ─── Main ─────────────────────────────────────────────────────────────────────
function LessonPageContent({ params }: { params: { lessonId: string } }) {
  const t = useTranslations('pages.lesson')
  const tSigns = useTranslations('signs')
  const router = useRouter()
  const lesson = getLessonById(params.lessonId)
  const { progress, loseHeart, completeLesson, recordWeak } = useProgress()

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [done, setDone] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [noHearts, setNoHearts] = useState(false)
  const [mounted, setMounted] = useState(false)
  // Guards completeLesson against double-firing when Finish is clicked twice
  // before the async save resolves (would double-award XP).
  const completingRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!lesson || !mounted) return
    const unitSigns = signs.filter((s) => s.unitId === lesson.unitId)
    setExercises(buildExercises(lesson.signIds, unitSigns))
  }, [lesson, mounted])

  const exercise = exercises[current]

  const handleAnswer = useCallback(
    async (answerId: string | null, typedVal?: string) => {
      if (answered || !exercise) return
      setAnswered(true)
      const typedNorm = (typedVal ?? '').trim().toLowerCase()
      const isCorrect =
        exercise.type === 'typing'
          ? typedNorm === tSigns(exercise.sign.wordKey).toLowerCase() || typedNorm === exercise.sign.word.toLowerCase()
          : answerId === exercise.sign.id

      setCorrect(isCorrect)
      setSelected(answerId)

      if (!isCorrect) {
        setMistakes((m) => m + 1)
        const updated = await loseHeart()
        // If hearts just hit 0, show the no-hearts screen
        if (updated.hearts <= 0) {
          setNoHearts(true)
        }
        await recordWeak(exercise.sign.id)
      }
    },
    [answered, exercise, loseHeart, recordWeak]
  )

  const handleNext = useCallback(async () => {
    if (current + 1 >= exercises.length) {
      if (completingRef.current) return
      completingRef.current = true
      const perfect = mistakes === 0
      const xp = 50 + (perfect ? 50 : 0) + (exercises.length - mistakes) * 10
      setXpEarned(xp)
      await completeLesson(lesson!.id, perfect, xp)
      setDone(true)
      if (perfect) {
        const end = Date.now() + 2000
        const frame = () => {
          confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#0F766E', '#2DD4BF', '#D97706', '#1D4ED8'] })
          confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#0F766E', '#2DD4BF', '#D97706', '#1D4ED8'] })
          if (Date.now() < end) requestAnimationFrame(frame)
        }
        frame()
      }
    } else {
      setCurrent((c) => c + 1)
      setAnswered(false)
      setSelected(null)
      setTyped('')
      setCorrect(false)
    }
  }, [current, exercises.length, mistakes, lesson, completeLesson])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-ink-soft">{t('lessonNotFound')}</p>
      </div>
    )
  }

  // ── ❤️ No Hearts Screen ──────────────────────────────────────────────────────
  if (noHearts) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper dark:bg-gray-900 px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-8 text-center shadow-xl border border-heart/20 dark:border-red-900/40">
          <div className="text-7xl mb-2">💔</div>
          <h1 className="font-display text-3xl font-extrabold text-ink dark:text-gray-100">{t('outOfHearts')}</h1>
          <p className="mt-3 text-ink-soft dark:text-gray-400">
            {t('outOfHeartsBody')}
          </p>

          <div className="mt-6 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="flex-1 text-center text-2xl opacity-20">❤️</span>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/review"
              className="block w-full rounded-full bg-brand py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-brand-hover transition"
            >
              {t('practiceWeakSigns')}
            </Link>
            <Link
              href="/learn"
              className="block w-full rounded-full border-2 border-line dark:border-gray-700 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink-soft dark:text-gray-300 hover:bg-paper dark:hover:bg-gray-800 transition"
            >
              {t('backToDashboard')}
            </Link>
          </div>

          <p className="mt-5 text-xs text-ink-soft/80 dark:text-gray-500">
            {t('heartsRefill')}
          </p>
        </div>
      </div>
    )
  }

  // ── Completion screen ──────────────────────────────────────────────────────
  if (done) {
    const perfect = mistakes === 0
    const accuracy = Math.round(((exercises.length - mistakes) / exercises.length) * 100)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper dark:bg-gray-900 px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-8 text-center shadow-xl border border-line dark:border-gray-700">
          <div className="text-7xl">{perfect ? '🏆' : '🎉'}</div>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-ink dark:text-gray-100">
            {perfect ? t('perfect') : t('wellDone')}
          </h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-gray-500">{lesson.title}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: t('xpEarned'), value: `+${xpEarned}`, color: 'text-reward', bg: 'bg-reward-soft', border: 'border-reward/25' },
              { label: t('accuracy'), value: `${accuracy}%`, color: 'text-brand', bg: 'bg-brand-soft', border: 'border-brand/25' },
              { label: t('correct2'), value: `${exercises.length - mistakes}/${exercises.length}`, color: 'text-unit', bg: 'bg-unit-soft', border: 'border-unit/25' },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl ${s.bg} border ${s.border} p-3`}>
                <div className={`text-xl font-extrabold ${s.color} [font-variant-numeric:tabular-nums]`}>{s.value}</div>
                <div className="text-[10px] font-semibold text-ink-soft mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/learn')}
            className="mt-8 w-full rounded-full bg-brand py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-brand-hover transition shadow-md"
          >
            {t('continueBtn')}
          </button>
        </div>
      </div>
    )
  }

  if (!exercise) return null

  // ── Lesson player UI ──────────────────────────────────────────────────────
  return (
    <main className="flex min-h-screen flex-col bg-paper dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-line dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <Link href="/learn" className="text-ink-soft/70 dark:text-gray-500 hover:text-ink dark:hover:text-gray-300 text-xl font-bold">✕</Link>
          <div className="flex-1">
            <ProgressBar current={current} total={exercises.length} />
          </div>
          <Hearts count={progress.hearts} max={5} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 py-8">
        {/* Prompt */}
        <p className="mb-6 text-center text-lg font-extrabold text-ink dark:text-gray-200">
          {exercise.type === 'image-to-word' && t('imageToWord')}
          {exercise.type === 'word-to-image' && t('wordToImage', { word: tSigns(exercise.sign.wordKey) })}
          {exercise.type === 'typing' && t('typing')}
        </p>

        {/* Image (shown for image-to-word and typing, the QUESTION image) */}
        {(exercise.type === 'image-to-word' || exercise.type === 'typing') && (
          <div className="mb-6 flex items-center justify-center rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-md border border-line dark:border-gray-700 w-full">
            <img src={exercise.sign.imagePath} alt="Sign" className="max-h-48 w-auto object-contain" />
          </div>
        )}

        {/* Typing input */}
        {exercise.type === 'typing' && (
          <div className="mb-4 w-full">
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !answered) handleAnswer(null, typed) }}
              disabled={answered}
              placeholder={t('typeHere')}
              className="w-full rounded-2xl border-2 border-line dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3.5 text-center text-lg font-bold text-ink dark:text-gray-100 placeholder-ink-soft/60 dark:placeholder-gray-500 outline-none focus:border-brand transition"
              autoFocus
            />
            {!answered && (
              <button
                onClick={() => handleAnswer(null, typed)}
                className="mt-3 w-full rounded-full bg-brand py-3 text-sm font-extrabold uppercase text-white hover:bg-brand-hover transition"
              >
                {t('check')}
              </button>
            )}
          </div>
        )}

        {/* MC choices */}
        {exercise.type !== 'typing' && (
          <div className="grid w-full grid-cols-2 gap-3">
            {exercise.choices.map((choice) => {
              const isSelected = selected === choice.id
              const isCorrectChoice = choice.id === exercise.sign.id
              let borderClass = 'border-line dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand hover:bg-brand-soft/50 dark:hover:bg-teal-900/30'
              if (answered) {
                if (isCorrectChoice) borderClass = 'border-brand bg-brand-soft dark:bg-teal-900/30'
                else if (isSelected) borderClass = 'border-heart bg-heart-soft dark:bg-red-900/30'
                else borderClass = 'border-line dark:border-gray-700 bg-white dark:bg-gray-800 opacity-50'
              }

              return (
                <button
                  key={choice.id}
                  disabled={answered}
                  onClick={() => handleAnswer(choice.id)}
                  aria-label={exercise.type === 'word-to-image' ? t('optionLabel', { number: exercise.choices.indexOf(choice) + 1 }) : undefined}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${borderClass}`}
                >
                  {exercise.type === 'word-to-image' ? (
                    // Deliberately unnamed: naming the sign here would hand the
                    // quiz answer to screen readers and the DOM inspector.
                    <img src={choice.imagePath} alt="" aria-hidden="true" className="h-24 w-auto object-contain" />
                  ) : (
                    <span className="text-base font-extrabold text-ink dark:text-gray-200">{tSigns(choice.wordKey)}</span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Feedback bar */}
        {answered && (
          <div className={`mt-6 w-full rounded-2xl px-5 py-4 flex items-center justify-between ${correct ? 'bg-brand-soft border-2 border-brand dark:bg-teal-900/30 dark:border-teal-700' : 'bg-heart-soft border-2 border-heart/50 dark:bg-red-900/30 dark:border-red-800'}`}>
            <div>
              <p className={`font-extrabold text-lg ${correct ? 'text-brand dark:text-teal-400' : 'text-heart dark:text-red-400'}`}>
                {correct ? t('correct') : t('wrong')}
              </p>
              {!correct && (
                <p className="text-sm text-ink-soft dark:text-gray-300 mt-0.5">
                  {t('answer')}: <strong>{tSigns(exercise.sign.wordKey)}</strong>
                </p>
              )}
            </div>
            <button
              onClick={handleNext}
              className={`rounded-full px-6 py-2.5 text-sm font-extrabold uppercase text-white transition ${correct ? 'bg-brand hover:bg-brand-hover' : 'bg-heart hover:brightness-110'}`}
            >
              {current + 1 >= exercises.length ? t('finish') : t('nextArrow')}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const t = useTranslations('pages.lesson')
  return (
    <ErrorBoundary fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper dark:bg-gray-950 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg max-w-sm w-full border border-line dark:border-gray-700">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-ink dark:text-gray-200">{t('errorTitle')}</h1>
          <p className="text-ink-soft dark:text-gray-400 mt-2 mb-6">{t('errorBody')}</p>
          <Link href="/learn" className="block w-full rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold uppercase text-white hover:bg-brand-hover transition">
            {t('backToDashboard')}
          </Link>
        </div>
      </div>
    }>
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        </div>
      }>
        <LessonPageContent params={params} />
      </Suspense>
    </ErrorBoundary>
  )
}
