'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getLessonById } from '../../../src/data/lessons'
import { signs, type Sign } from '../../../src/data/signs'

import { ErrorBoundary } from '../../../src/components/ErrorBoundary'
import { Suspense } from 'react'
import { useTranslations } from 'next-intl'

function StudyPageContent({ params }: { params: { lessonId: string } }) {
  const t = useTranslations('pages.study')
  const tSigns = useTranslations('signs')
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
    <main className="flex min-h-screen flex-col bg-paper">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur px-4 py-3 shadow-sm border-b border-line">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <Link href="/learn" className="text-ink-soft/70 hover:text-ink text-xl font-bold">✕</Link>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-line/60">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-ink-soft [font-variant-numeric:tabular-nums]">{current + 1} / {lessonSigns.length}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-8">

        {/* Mode badge */}
        <div className="mb-6 flex items-center gap-2">
          <span className="rounded-full bg-brand-soft px-4 py-1.5 text-sm font-extrabold text-brand">
            {t('studyMode')}
          </span>
          <span className="text-sm text-ink-soft font-medium">{t('learnTheSigns')}</span>
        </div>

        {/* Flashcard */}
        <div
          className="relative w-full cursor-pointer select-none rounded-3xl bg-white shadow-lg border border-line overflow-hidden transition-all hover:shadow-xl"
          onClick={() => setRevealed(true)}
        >
          {/* Sign image */}
          <div className="flex items-center justify-center bg-paper p-8 min-h-[260px]">
            <img
              src={sign.imagePath}
              alt={sign.word}
              className="max-h-56 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Word reveal */}
          <div className={`border-t border-line px-8 py-6 text-center transition-all duration-300 ${revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="font-display text-3xl font-extrabold text-ink">{tSigns(sign.wordKey)}</p>
            <p className="mt-1 text-sm text-ink-soft">{t('signLanguage')}</p>
          </div>

          {/* Tap to reveal hint */}
          {!revealed && (
            <div className="border-t border-line px-8 py-6 text-center">
              <p className="text-sm font-semibold text-ink-soft">{t('tapToReveal')}</p>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex w-full items-center gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="flex-1 rounded-full border-2 border-line py-3.5 font-extrabold text-ink-soft transition hover:border-ink/30 hover:bg-white disabled:opacity-30"
          >
            {t('prev')}
          </button>

          <button
            onClick={goNext}
            className={`flex-2 flex-[2] rounded-full py-3.5 font-extrabold uppercase tracking-wide text-white transition-all hover:brightness-110 active:scale-[0.98] shadow-md ${
              isLast ? 'bg-reward' : 'bg-brand'
            }`}
          >
            {isLast ? t('startQuiz') : t('next')}
          </button>
        </div>

        {/* Skip to quiz */}
        <button
          onClick={() => router.push(`/lesson/${lesson.id}`)}
          className="mt-5 text-sm text-ink-soft underline underline-offset-2 hover:text-ink"
        >
          {t('skipToQuiz')}
        </button>

      </div>
    </main>
  )
}

export default function StudyPage({ params }: { params: { lessonId: string } }) {
  const t = useTranslations('pages.study')
  return (
    <ErrorBoundary fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full border border-line">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-ink">{t('errorTitle')}</h1>
          <p className="text-ink-soft mt-2 mb-6">{t('errorBody')}</p>
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
        <StudyPageContent params={params} />
      </Suspense>
    </ErrorBoundary>
  )
}
