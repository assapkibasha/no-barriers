'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LearnSidebar from '../../src/components/learn/LearnSidebar'
import LearnRightPanel from '../../src/components/learn/LearnRightPanel'
import { courses } from '../../src/data/courses'
import { units } from '../../src/data/units'
import { getLessonsByUnit } from '../../src/data/lessons'
import { useProgress } from '../../src/store/progress-context'
import { useTranslations } from 'next-intl'

export default function LearnPage() {
  const t = useTranslations('pages.learn')
  const { progress } = useProgress()
  const [activeCourseId, setActiveCourseId] = useState(courses[0].id)

  const completed = progress.completedLessons ?? []

  useEffect(() => {
    const handleScroll = () => {
      // Find which course section is currently near the top of the viewport
      for (const course of [...courses].reverse()) {
        const el = document.getElementById(`course-${course.id}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          // 150px threshold from the top
          if (rect.top <= 200) {
            setActiveCourseId(course.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once to set initial state correctly if scrolled on load
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function unitProgress(unitId: string) {
    const ls = getLessonsByUnit(unitId)
    return { done: ls.filter((l) => completed.includes(l.id)).length, total: ls.length, lessons: ls }
  }

  function isUnitUnlocked(courseIdx: number, unitIdx: number): boolean {
    if (courseIdx === 0 && unitIdx === 0) return true
    const allUnits = courses.flatMap((c) => units.filter((u) => u.courseId === c.id))
    const flatIdx = courses.slice(0, courseIdx).reduce((acc, c) => acc + units.filter((u) => u.courseId === c.id).length, 0) + unitIdx
    if (flatIdx === 0) return true
    const prevUnit = allUnits[flatIdx - 1]
    const prevLessons = getLessonsByUnit(prevUnit.id)
    return prevLessons.every((l) => completed.includes(l.id))
  }

  return (
    <div className="flex min-h-screen">
      <LearnSidebar />

      {/* Center — skill path */}
      <main className="mb-24 flex flex-1 justify-center bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.08),_transparent_34rem)] px-4 py-8 md:mb-0 md:ml-64 lg:mr-[352px] sm:px-6">
        <div className="relative w-full max-w-2xl">

          {/* SINGLE DYNAMIC STICKY HEADER */}
          <div className="sticky top-4 z-30 mb-7 w-full">
            {(() => {
              const activeC = courses.find((c) => c.id === activeCourseId) || courses[0]
              return (
                <div className={`relative mx-auto max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br ${activeC.color} p-[1px] shadow-[0_18px_42px_rgba(15,23,42,0.16)] transition-all duration-300`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.32),transparent_13rem)]" />
                  <div className="absolute -right-10 -top-14 h-32 w-32 rounded-full bg-white/15" />
                  <div className="relative flex min-h-[104px] items-center justify-between gap-4 rounded-[1.45rem] px-4 py-4 text-white sm:px-6">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="hidden h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/25 bg-white/15 shadow-inner sm:block">
                        <img
                          src={activeC.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h2 className="line-clamp-1 text-2xl font-black leading-tight">{activeC.title}</h2>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-white/90">{activeC.description}</p>
                      </div>
                    </div>
                    <Link
                      href={`/learn/${activeC.id}`}
                      className="group flex shrink-0 items-center gap-2 rounded-2xl border border-white/35 bg-white/18 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur transition hover:bg-white/28 focus:outline-none focus:ring-2 focus:ring-white/70"
                    >
                      {t('unitsButton')}
                    </Link>
                  </div>
                </div>
              )
            })()}
          </div>

          {courses.map((course, courseIdx) => {
            const courseUnits = units
              .filter((u) => u.courseId === course.id)
              .sort((a, b) => a.order - b.order)

            return (
              <div key={course.id} id={`course-${course.id}`} className="mb-4 scroll-mt-40">
                {/* Elegant separator instead of bulky cards */}
                {courseIdx > 0 && (
                  <div className="my-12 flex w-full items-center gap-5 px-4 text-slate-400 dark:text-slate-500">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
                    <span className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-black uppercase tracking-[0.2em] shadow-sm dark:border-slate-800 dark:bg-slate-950">{course.title}</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
                  </div>
                )}

                {/* Vertical node path */}
                <div className="relative flex flex-col items-center pb-8">
                  <div className="absolute bottom-16 left-1/2 top-8 hidden w-1 -translate-x-1/2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 sm:block" />
                  {courseUnits.map((unit, unitIdx) => {
                    const { done, total, lessons } = unitProgress(unit.id)
                    const allDone = done === total
                    const unlocked = isUnitUnlocked(courseIdx, unitIdx)
                    const nextLesson = lessons[done] ?? lessons[0]

                    // Alternate sides like Duolingo
                    const side = unitIdx % 4  // 0=center, 1=right, 2=center, 3=left

                    const offsetClass =
                      side === 1 ? 'sm:translate-x-28' :
                      side === 3 ? 'sm:-translate-x-28' : ''

                    return (
                      <div key={unit.id} className="relative flex w-full flex-col items-center">
                        {/* Connector */}
                        {unitIdx > 0 && (
                          <div className={`h-10 w-1 rounded-full ${unlocked ? 'bg-teal-300 dark:bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'} ${offsetClass}`} />
                        )}

                        {/* Node */}
                        <div className={`group relative flex w-36 transform flex-col items-center ${offsetClass}`}>
                          {/* START label for first unlocked uncompleted */}
                          {unlocked && !allDone && done === 0 && unitIdx === courseUnits.findIndex((u) => {
                            const p = unitProgress(u.id)
                            return !p.lessons.every((l) => completed.includes(l.id))
                          }) && (
                            <div className="mb-2 rounded-full bg-teal-500 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-teal-500/25">
                              {t('startBadge')}
                            </div>
                          )}

                          <Link
                            href={unlocked && nextLesson ? `/study/${nextLesson.id}` : '#'}
                            className={`relative flex h-[76px] w-[76px] items-center justify-center rounded-[1.65rem] border text-3xl shadow-xl transition-all ${
                              allDone
                                ? 'border-teal-600 bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-teal-700/20 hover:-translate-y-1 hover:brightness-110'
                                : unlocked
                                ? 'border-teal-600 bg-gradient-to-br from-white to-teal-50 text-teal-700 shadow-teal-700/15 ring-4 ring-teal-100 hover:-translate-y-1 hover:ring-teal-200 dark:from-slate-900 dark:to-teal-950 dark:text-teal-200 dark:ring-teal-900/40'
                                : 'cursor-not-allowed border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 shadow-slate-500/10 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:text-slate-500'
                            }`}
                            aria-disabled={!unlocked}
                          >
                            {allDone ? '⭐' : unlocked ? unit.emoji : '🔒'}
                          </Link>

                          {/* Unit label */}
                          <p className={`mt-3 max-w-36 text-center text-sm font-black leading-tight ${unlocked ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600'}`}>
                            {unit.title}
                          </p>

                          {/* Mini progress dots */}
                          <div className="mt-2 flex h-2 gap-1">
                            {Array.from({ length: Math.min(total, 5) }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full ${i < done ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      </main>

      {/* Right panel */}
      <div className="fixed right-4 top-0 hidden h-screen w-80 flex-shrink-0 pt-4 lg:block">
        <LearnRightPanel />
      </div>
    </div>
  )
}
