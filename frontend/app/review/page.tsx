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
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0faf8] dark:bg-gray-950 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-sm w-full border border-gray-100 dark:border-gray-700">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('errorTitle')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">{t('errorBody')}</p>
          <Link href="/learn" className="block w-full rounded-2xl bg-teal-600 px-6 py-3.5 text-sm font-extrabold uppercase text-white hover:bg-teal-700 transition">
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
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 }, colors: ['#0d9488','#fbbf24','#a78bfa'] })
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
      <div className="flex min-h-screen items-center justify-center bg-[#f0faf8] dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    )
  }

  if (done) {
    const allCleared = cleared === exercises.length
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#e8f7f5] to-[#f0faf8] dark:from-teal-950 dark:to-gray-900 px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-8 text-center shadow-2xl">
          <div className="text-6xl">{exercises.length === 0 ? '✨' : allCleared ? '🏆' : '💪'}</div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800 dark:text-gray-100">
            {exercises.length === 0 ? t('nothingToReview') : allCleared ? t('allCleared') : t('reviewDone')}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {exercises.length === 0
              ? t('nothingBody')
              : t('masteredOf', { cleared, total: exercises.length })}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 w-full rounded-2xl bg-teal-600 dark:bg-teal-500 py-3.5 font-extrabold uppercase tracking-wide text-white hover:bg-teal-700"
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
    <main className="flex min-h-screen flex-col bg-[#f0faf8] dark:bg-gray-950">
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-4 py-3 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xl font-bold">✕</button>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{current + 1}/{exercises.length}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300">{t('reviewMode')}</span>
        </div>

        <p className="mb-6 mt-2 text-center text-lg font-extrabold text-gray-700 dark:text-gray-200">
          {exercise.type === 'image-to-word' ? t('imageToWord') : t('wordToImage', { word: tSigns(exercise.sign.wordKey) })}
        </p>

        {exercise.type === 'image-to-word' && (
          <>
            <div className="mb-8 flex justify-center">
              <img src={exercise.sign.imagePath} alt="Sign" className="h-52 w-52 rounded-2xl object-contain shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {exercise.choices.map((c) => {
                let cls = 'rounded-2xl border-2 py-4 text-center font-bold text-gray-800 dark:text-gray-200 transition-all '
                if (!answered) cls += 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer'
                else if (c.id === exercise.sign.id) cls += 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                else if (c.id === selected) cls += 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                else cls += 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-50'
                return <button key={c.id} className={cls} onClick={() => handleAnswer(c.id)} disabled={answered}>{tSigns(c.wordKey)}</button>
              })}
            </div>
          </>
        )}

        {exercise.type === 'word-to-image' && (
          <div className="grid grid-cols-2 gap-4">
            {exercise.choices.map((c) => {
              let cls = 'overflow-hidden rounded-2xl border-2 transition-all '
              if (!answered) cls += 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400 cursor-pointer'
              else if (c.id === exercise.sign.id) cls += 'border-teal-500 bg-teal-50 dark:bg-teal-900/30'
              else if (c.id === selected) cls += 'border-red-400 bg-red-50 dark:bg-red-900/30'
              else cls += 'border-gray-100 dark:border-gray-800 opacity-50'
              return (
                <button key={c.id} className={cls} onClick={() => handleAnswer(c.id)} disabled={answered}>
                  <img src={c.imagePath} alt={c.word} className="h-36 w-full object-contain bg-white dark:bg-gray-200 p-2" />
                  <p className="py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-300">{tSigns(c.wordKey)}</p>
                </button>
              )
            })}
          </div>
        )}

        {answered && (
          <div className={`mt-6 rounded-2xl p-4 text-center ${correct ? 'bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
            <p className={`text-lg font-extrabold ${correct ? 'text-teal-700 dark:text-teal-400' : 'text-red-700 dark:text-red-400'}`}>
              {correct ? t('correct') : t('wrongAnswer', { word: tSigns(exercise.sign.wordKey) })}
            </p>
          </div>
        )}

        <div className="flex-1" />

        {answered && (
          <button onClick={handleNext} className="mt-6 w-full rounded-2xl bg-purple-600 dark:bg-purple-500 py-4 font-extrabold uppercase tracking-wide text-white hover:bg-purple-700 dark:hover:bg-purple-600">
            {current + 1 >= exercises.length ? t('finishReview') : t('nextArrow')}
          </button>
        )}
      </div>
    </main>
  )
}
