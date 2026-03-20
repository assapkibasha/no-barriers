'use client'

import Link from 'next/link'
import LearnSidebar from '../../../src/components/learn/LearnSidebar'
import LearnRightPanel from '../../../src/components/learn/LearnRightPanel'
import { courses } from '../../../src/data/courses'
import { units } from '../../../src/data/units'
import { getLessonsByUnit } from '../../../src/data/lessons'
import { useProgress } from '../../../src/store/progress-context'

export default function CourseSkillTree({ params }: { params: { courseId: string } }) {
  const { progress } = useProgress()

  const course = courses.find((c) => c.id === params.courseId)
  if (!course) return <div className="p-10 text-center text-gray-500">Course not found.</div>

  const courseUnits = units
    .filter((u) => u.courseId === params.courseId)
    .sort((a, b) => a.order - b.order)

  const completed = progress.completedLessons ?? []

  function isUnitUnlocked(idx: number): boolean {
    if (idx === 0) return true
    const prevUnit = courseUnits[idx - 1]
    const prevLessons = getLessonsByUnit(prevUnit.id)
    return prevLessons.every((l) => completed.includes(l.id))
  }

  function unitProgress(unitId: string) {
    const ls = getLessonsByUnit(unitId)
    return { done: ls.filter((l) => completed.includes(l.id)).length, total: ls.length }
  }

  return (
    <div className="flex min-h-screen">
      <LearnSidebar />

      {/* Center */}
      <main className="ml-64 flex flex-1 justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          {/* Course banner */}
          <div className={`sticky top-4 z-20 mb-6 flex items-center justify-between rounded-2xl bg-gradient-to-r ${course.color} px-6 py-4 text-white shadow-md backdrop-blur-md`}>
            <div>
              <Link href="/learn" className="text-xs font-bold uppercase tracking-widest opacity-70 hover:opacity-100">
                ← All Courses
              </Link>
              <h1 className="mt-0.5 text-2xl font-extrabold">{course.title}</h1>
              <p className="text-sm opacity-80">{course.description}</p>
            </div>
          </div>

          {/* Vertical node path */}
          <div className="relative flex flex-col items-center gap-0">
            {courseUnits.map((unit, idx) => {
              const unlocked = isUnitUnlocked(idx)
              const { done, total } = unitProgress(unit.id)
              const allDone = done === total
              const firstLesson = getLessonsByUnit(unit.id)[done] ?? getLessonsByUnit(unit.id)[0]
              const pct = total > 0 ? Math.round((done / total) * 100) : 0

              // Zigzag offset
              const offsetClass =
                idx % 4 === 1 ? 'translate-x-16' :
                idx % 4 === 3 ? '-translate-x-16' : ''

              return (
                <div key={unit.id} className="flex w-full flex-col items-center">
                  {/* Connector */}
                  {idx > 0 && (
                    <div className={`h-8 w-1 rounded-full transition-colors ${allDone ? 'bg-teal-400' : 'bg-gray-300 dark:bg-gray-700'} ${offsetClass}`} />
                  )}

                  {/* Node + label */}
                  <div className={`flex flex-col items-center transform ${offsetClass}`}>
                    {/* START badge */}
                    {unlocked && !allDone && done === 0 && (
                      <div className="mb-1 rounded-full bg-teal-500 px-3 py-0.5 text-xs font-extrabold uppercase text-white shadow animate-bounce">
                        START
                      </div>
                    )}
                    {unlocked && done > 0 && !allDone && (
                      <div className="mb-1 rounded-full bg-yellow-400 px-3 py-0.5 text-xs font-extrabold uppercase text-yellow-900 shadow">
                        CONTINUE
                      </div>
                    )}

                    {/* Circle node */}
                    <Link
                      href={unlocked && firstLesson ? `/study/${firstLesson.id}` : '#'}
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-b-[5px] text-2xl shadow-lg transition-all ${
                        allDone
                          ? 'border-teal-700 bg-teal-500 text-white hover:brightness-110'
                          : unlocked
                          ? 'border-teal-700 bg-teal-500 text-white hover:scale-110'
                          : 'border-gray-400 bg-gray-300 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {allDone ? '⭐' : unlocked ? unit.emoji : '🔒'}
                    </Link>

                    <p className={`mt-1.5 text-xs font-bold ${unlocked ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'}`}>
                      {unit.title}
                    </p>

                    {/* Progress dots */}
                    {unlocked && (
                      <div className="mt-1 flex gap-1">
                        {Array.from({ length: Math.min(total, 5) }).map((_, i) => (
                          <div key={i} className={`h-1.5 w-1.5 rounded-full ${i < done ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-700'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Right panel */}
      <div className="sticky top-0 mr-4 hidden h-screen w-80 flex-shrink-0 overflow-y-auto py-8 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:block">
        <LearnRightPanel />
      </div>
    </div>
  )
}
