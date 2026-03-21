'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getLessonById } from '../../../src/data/lessons'
import { signs, type Sign } from '../../../src/data/signs'

import { ErrorBoundary } from '../../../src/components/ErrorBoundary'
import { Suspense } from 'react'

function StudyPageContent({ params }: { params: { lessonId: string } }) {
  const router = useRouter()
  const lesson = getLessonById(params.lessonId)
  const [lessonSigns, setLessonSigns] = useState<Sign[]>([])
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!lesson || !mounted) return
    const ls = lesson.signIds.map((id) => signs.find((s) => s.id === id)!).filter(Boolean)
    setLessonSigns(ls)
  }, [lesson, mounted])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Lesson not found.</p>
      </div>
    )
  }

  if (lessonSigns.length === 0) return null

  const sign = lessonSigns[current]
  const isLast = current === lessonSigns.length - 1
  const pct = Math.round(((current + 1) / lessonSigns.length) * 100)

  const goNext = () => {
    if (isLast) {
      router.push(`/lesson/${lesson.id}`)
    } else {
      setCurrent((c) => c + 1)
      setRevealed(false)
    }
  }

  const goPrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1)
      setRevealed(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-[#e8f7f5] via-[#f0faf8]  to-[#eef4ff]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur px-4 py-3 shadow-sm border-b border-gray-100">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <Link href="/learn" className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</Link>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-gray-500">{current + 1} / {lessonSigns.length}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-8">

        {/* Mode badge */}
        <div className="mb-6 flex items-center gap-2">
          <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-extrabold text-teal-700">
            📖 Study Mode
          </span>
          <span className="text-sm text-gray-400 font-medium">· Learn the signs</span>
        </div>

        {/* Flashcard */}
        <div
          className="relative w-full cursor-pointer select-none rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl"
          onClick={() => setRevealed(true)}
        >
          {/* Sign image */}
          <div className="flex items-center justify-center bg-gray-50 p-8 min-h-[260px]">
            <img
              src={sign.imagePath}
              alt={sign.word}
              className="max-h-56 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Word reveal */}
          <div className={`border-t border-gray-100 px-8 py-6 text-center transition-all duration-300 ${revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="text-3xl font-extrabold text-gray-800">{sign.word}</p>
            <p className="mt-1 text-sm text-gray-400">Sign language</p>
          </div>

          {/* Tap to reveal hint */}
          {!revealed && (
            <div className="border-t border-gray-100 px-8 py-6 text-center">
              <p className="text-sm font-semibold text-gray-400">Tap the card to reveal the word</p>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex w-full items-center gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="flex-1 rounded-2xl border-2 border-gray-200 py-3.5 font-extrabold text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-30"
          >
            ← Prev
          </button>

          <button
            onClick={goNext}
            className={`flex-2 flex-[2] rounded-2xl py-3.5 font-extrabold uppercase tracking-wide text-white transition-all hover:brightness-110 active:scale-[0.98] shadow-md ${
              isLast
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                : 'bg-gradient-to-r from-teal-500 to-teal-600'
            }`}
          >
            {isLast ? '🎯 Start Quiz →' : 'Next →'}
          </button>
        </div>

        {/* Skip to quiz */}
        <button
          onClick={() => router.push(`/lesson/${lesson.id}`)}
          className="mt-5 text-sm text-gray-400 underline underline-offset-2 hover:text-gray-600"
        >
          Skip study and go to quiz
        </button>

      </div>
    </main>
  )
}

export default function StudyPage({ params }: { params: { lessonId: string } }) {
  return (
    <ErrorBoundary fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#e8f7f5] via-[#f0faf8]  to-[#eef4ff] p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-gray-100">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-800">Unable to load study mode</h1>
          <p className="text-gray-500 mt-2 mb-6">Something went wrong while preparing your study sheet.</p>
          <Link href="/learn" className="block w-full rounded-2xl bg-teal-600 px-6 py-3.5 text-sm font-extrabold uppercase text-white hover:bg-teal-700 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    }>
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
        </div>
      }>
        <StudyPageContent params={params} />
      </Suspense>
    </ErrorBoundary>
  )
}
