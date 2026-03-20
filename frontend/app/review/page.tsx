'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { signs, type Sign } from '../../src/data/signs'
import { useProgress } from '../../src/store/progress-context'

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

export default function ReviewPage() {
  const router = useRouter()
  const { progress, clearWeak } = useProgress()
  const [exercises, setExercises] = useState<ReviewExercise[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [done, setDone] = useState(false)
  const [cleared, setCleared] = useState(0)

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

  if (done) {
    const allCleared = cleared === exercises.length
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#e8f7f5] to-[#f0faf8] px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
          <div className="text-6xl">{exercises.length === 0 ? '✨' : allCleared ? '🏆' : '💪'}</div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800">
            {exercises.length === 0 ? 'Nothing to review!' : allCleared ? 'All cleared!' : 'Review done!'}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {exercises.length === 0
              ? 'Keep completing lessons to build your review queue.'
              : `You mastered ${cleared} of ${exercises.length} weak signs.`}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 w-full rounded-2xl bg-teal-600 py-3.5 font-extrabold uppercase tracking-wide text-white hover:bg-teal-700"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  if (!exercise) return null

  const pct = Math.round((current / exercises.length) * 100)

  return (
    <main className="flex min-h-screen flex-col bg-[#f0faf8]">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="text-sm font-bold text-gray-500">{current + 1}/{exercises.length}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">🔁 Review Mode</span>
        </div>

        <p className="mb-6 mt-2 text-center text-lg font-extrabold text-gray-700">
          {exercise.type === 'image-to-word' ? 'What sign is this?' : `Which image shows "${exercise.sign.word}"?`}
        </p>

        {exercise.type === 'image-to-word' && (
          <>
            <div className="mb-8 flex justify-center">
              <img src={exercise.sign.imagePath} alt="Sign" className="h-52 w-52 rounded-2xl object-contain shadow-lg border border-gray-100 bg-white p-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {exercise.choices.map((c) => {
                let cls = 'rounded-2xl border-2 py-4 text-center font-bold text-gray-800 transition-all '
                if (!answered) cls += 'border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 cursor-pointer'
                else if (c.id === exercise.sign.id) cls += 'border-teal-500 bg-teal-50 text-teal-700'
                else if (c.id === selected) cls += 'border-red-400 bg-red-50 text-red-700'
                else cls += 'border-gray-100 bg-gray-50 opacity-50'
                return <button key={c.id} className={cls} onClick={() => handleAnswer(c.id)} disabled={answered}>{c.word}</button>
              })}
            </div>
          </>
        )}

        {exercise.type === 'word-to-image' && (
          <div className="grid grid-cols-2 gap-4">
            {exercise.choices.map((c) => {
              let cls = 'overflow-hidden rounded-2xl border-2 transition-all '
              if (!answered) cls += 'border-gray-200 bg-white hover:border-purple-400 cursor-pointer'
              else if (c.id === exercise.sign.id) cls += 'border-teal-500 bg-teal-50'
              else if (c.id === selected) cls += 'border-red-400 bg-red-50'
              else cls += 'border-gray-100 opacity-50'
              return (
                <button key={c.id} className={cls} onClick={() => handleAnswer(c.id)} disabled={answered}>
                  <img src={c.imagePath} alt={c.word} className="h-36 w-full object-contain bg-white p-2" />
                  <p className="py-2 text-center text-xs font-semibold text-gray-600">{c.word}</p>
                </button>
              )
            })}
          </div>
        )}

        {answered && (
          <div className={`mt-6 rounded-2xl p-4 text-center ${correct ? 'bg-teal-50 border border-teal-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-lg font-extrabold ${correct ? 'text-teal-700' : 'text-red-700'}`}>
              {correct ? '✅ Correct! Sign mastered 🎉' : `❌ The answer is "${exercise.sign.word}"`}
            </p>
          </div>
        )}

        <div className="flex-1" />

        {answered && (
          <button onClick={handleNext} className="mt-6 w-full rounded-2xl bg-purple-600 py-4 font-extrabold uppercase tracking-wide text-white hover:bg-purple-700">
            {current + 1 >= exercises.length ? 'Finish Review 🎉' : 'Next →'}
          </button>
        )}
      </div>
    </main>
  )
}
