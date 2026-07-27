'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { signs, type Sign } from '../../src/data/signs'
import { useProgress } from '../../src/store/progress-context'
import { useTranslations } from 'next-intl'

// Exercise types (reuse same pattern as lesson player)
type ExerciseType = 'image-to-word' | 'word-to-image'

interface ReviewExercise {
  type: ExerciseType
  sign: Sign
  choices: Sign[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

import { ErrorBoundary } from '../../src/components/ErrorBoundary'

export default function ReviewPage() {
  const t = useTranslations('pages.review')
  return (
    <ErrorBoundary fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper dark:bg-gray-950 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg max-w-sm w-full border border-line dark:border-gray-700">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-ink dark:text-gray-200">{t('errorTitle')}</h1>
          <p className="text-ink-soft dark:text-gray-400 mt-2 mb-6">{t('errorBody')}</p>
          <Link href="/learn" className="block w-full rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold uppercase text-white hover:bg-brand-hover transition">
            {t('back')}
          </Link>
        </div>
      </div>
    }>
      <ReviewPageContent />
    </ErrorBoundary>
  )
}

function ReviewPageContent() {
  const t = useTranslations('pages.review')
  const tSigns = useTranslations('signs')
  const router = useRouter()
  const { progress, clearWeak } = useProgress()
  const [exercises, setExercises] = useState<ReviewExercise[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [done, setDone] = useState(false)
  const [cleared, setCleared] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const reviewIds = (progress.weakSigns ?? []).slice(0, 8)
    if (reviewIds.length === 0) { setDone(true); return }
    const reviewSigns = reviewIds.map((id) => signs.find((s) => s.id === id)!).filter(Boolean)
    const exs: ReviewExercise[] = reviewSigns.map((sign, idx) => {
      const type: ExerciseType = idx % 2 === 0 ? 'image-to-word' : 'word-to-image'
      const wrongs = shuffle(signs.filter((s) => s.id !== sign.id)).slice(0, 3)
      return { type, sign, choices: shuffle([sign, ...wrongs]) }
    })
    setExercises(exs)
  }, [progress.weakSigns])

  const exercise = exercises[current]

  const handleAnswer = async (choiceId: string) => {
    if (answered) return
    setAnswered(true)
    const isCorrect = choiceId === exercise.sign.id
    setCorrect(isCorrect)
    setSelected(choiceId)
    if (isCorrect) {
      await clearWeak(exercise.sign.id)
      setCleared((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 >= exercises.length) {
      setDone(true)
      if (cleared === exercises.length) {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 }, colors: ['#0F766E','#D97706','#1D4ED8'] })
      }
    } else {
      setCurrent((c) => c + 1)
      setAnswered(false)
      setSelected(null)
      setCorrect(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    )
  }

  if (done) {
    const allCleared = cleared === exercises.length
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper dark:bg-gray-900 px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-8 text-center shadow-xl border border-line dark:border-gray-700">
          <div className="text-6xl">{exercises.length === 0 ? '✨' : allCleared ? '🏆' : '💪'}</div>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-ink dark:text-gray-100">
            {exercises.length === 0 ? t('nothingToReview') : allCleared ? t('allCleared') : t('reviewDone')}
          </h1>
          <p className="mt-2 text-sm text-ink-soft dark:text-gray-400">
            {exercises.length === 0
              ? t('nothingBody')
              : t('masteredOf', { cleared, total: exercises.length })}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 w-full rounded-full bg-brand py-3.5 font-extrabold uppercase tracking-wide text-white hover:bg-brand-hover"
          >
            {t('back')}
          </button>
        </div>
      </div>
    )
  }

  if (!exercise) return null

  const pct = Math.round((current / exercises.length) * 100)

  return (
    <main className="flex min-h-screen flex-col bg-paper dark:bg-slate-950">
      <div className="sticky top-0 z-30 border-b border-line bg-white/85 px-4 py-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/82">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <button onClick={() => router.back()} className="text-ink-soft/70 dark:text-gray-500 hover:text-ink dark:hover:text-gray-300 text-xl font-bold">✕</button>
          <div className="flex-1">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-line/60 dark:bg-slate-800">
              <div className="h-full rounded-full bg-unit transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="min-w-12 text-right text-sm font-black text-ink-soft [font-variant-numeric:tabular-nums] dark:text-slate-400">{current + 1}/{exercises.length}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:py-10">
        <section className="rounded-[1.75rem] border border-line bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/72 dark:shadow-black/20 sm:p-7">
        <div className="mb-5 flex justify-center">
          <span className="rounded-full bg-unit-soft px-3.5 py-1.5 text-xs font-black text-unit">{t('reviewMode')}</span>
        </div>

        <p className="mb-7 text-center font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white">
          {exercise.type === 'image-to-word' ? t('imageToWord') : t('wordToImage', { word: tSigns(exercise.sign.wordKey) })}
        </p>

        {exercise.type === 'image-to-word' && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="rounded-[1.65rem] border border-line bg-paper p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <img src={exercise.sign.imagePath} alt="Sign" className="h-56 w-56 rounded-2xl bg-white object-contain p-2 dark:bg-slate-100" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {exercise.choices.map((c) => {
                let cls = 'min-h-[64px] rounded-2xl border px-5 py-4 text-center text-base font-black text-ink shadow-sm transition-all dark:text-gray-100 '
                if (!answered) cls += 'border-line bg-white hover:-translate-y-0.5 hover:border-unit hover:bg-unit-soft/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 cursor-pointer'
                else if (c.id === exercise.sign.id) cls += 'border-brand bg-brand-soft text-brand dark:bg-teal-950/40 dark:text-teal-300'
                else if (c.id === selected) cls += 'border-heart bg-heart-soft text-heart dark:bg-red-950/40 dark:text-red-300'
                else cls += 'border-line bg-paper opacity-50 dark:border-slate-800 dark:bg-slate-950'
                return <button key={c.id} className={cls} onClick={() => handleAnswer(c.id)} disabled={answered}>{tSigns(c.wordKey)}</button>
              })}
            </div>
          </>
        )}

        {exercise.type === 'word-to-image' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {exercise.choices.map((c) => {
              let cls = 'overflow-hidden rounded-2xl border shadow-sm transition-all '
              if (!answered) cls += 'border-line bg-white hover:-translate-y-0.5 hover:border-unit hover:shadow-md dark:border-slate-700 dark:bg-slate-800 cursor-pointer'
              else if (c.id === exercise.sign.id) cls += 'border-brand bg-brand-soft dark:bg-teal-950/40'
              else if (c.id === selected) cls += 'border-heart bg-heart-soft dark:bg-red-950/40'
              else cls += 'border-line opacity-50 dark:border-slate-800'
              return (
                <button key={c.id} className={cls} onClick={() => handleAnswer(c.id)} disabled={answered}>
                  {/* Caption below names the sign, so the image is decorative */}
                  <img src={c.imagePath} alt="" aria-hidden="true" className="h-40 w-full bg-white object-contain p-3 dark:bg-slate-100" />
                  <p className="border-t border-line py-3 text-center text-sm font-black text-ink dark:border-slate-700 dark:text-gray-200">{tSigns(c.wordKey)}</p>
                </button>
              )
            })}
          </div>
        )}

        {answered && (
          <div className={`mt-6 rounded-2xl border p-4 text-center ${correct ? 'border-brand/30 bg-brand-soft dark:border-teal-800 dark:bg-teal-950/40' : 'border-heart/30 bg-heart-soft dark:border-red-800 dark:bg-red-950/40'}`}>
            <p className={`text-lg font-extrabold ${correct ? 'text-brand dark:text-teal-400' : 'text-heart dark:text-red-400'}`}>
              {correct ? t('correct') : t('wrongAnswer', { word: tSigns(exercise.sign.wordKey) })}
            </p>
          </div>
        )}

        </section>

        <div className="flex-1" />

        {answered && (
          <button onClick={handleNext} className="mt-6 w-full rounded-full bg-brand py-4 font-extrabold uppercase tracking-wide text-white shadow-lg shadow-brand/20 transition hover:bg-brand-hover">
            {current + 1 >= exercises.length ? t('finishReview') : t('nextArrow')}
          </button>
        )}
      </div>
    </main>
  )
}
