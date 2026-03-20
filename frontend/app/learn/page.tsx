'use client'

import Link from 'next/link'
import LearnSidebar from '../../src/components/learn/LearnSidebar'
import LearnRightPanel from '../../src/components/learn/LearnRightPanel'
import { courses } from '../../src/data/courses'
import { units } from '../../src/data/units'
import { getLessonsByUnit } from '../../src/data/lessons'
import { useProgress } from '../../src/store/progress-context'

export default function LearnPage() {
  const { progress } = useProgress()

  const completed = progress.completedLessons ?? []

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
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <LearnSidebar />

      {/* Center — skill path */}
      <main className="ml-52 flex flex-1 justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          {courses.map((course, courseIdx) => {
            const courseUnits = units
              .filter((u) => u.courseId === course.id)
              .sort((a, b) => a.order - b.order)

            return (
              <div key={course.id} className="mb-2">
                {/* Course banner — matches Duolingo's section header */}
                <div className={`sticky top-4 z-20 mb-6 flex items-center justify-between rounded-2xl bg-gradient-to-r ${course.color} px-6 py-4 text-white shadow-md backdrop-blur-md`}>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Course {courseIdx + 1}</p>
                    <h2 className="text-xl font-extrabold">{course.title}</h2>
                    <p className="text-sm opacity-80">{course.description}</p>
                  </div>
                  <Link
                    href={`/learn/${course.id}`}
                    className="flex items-center gap-1.5 rounded-xl border-2 border-white/40 bg-white/20 px-4 py-2 text-xs font-extrabold uppercase tracking-wide backdrop-blur hover:bg-white/30 transition"
                  >
                    📋 Units
                  </Link>
                </div>

                {/* Vertical node path */}
                <div className="relative flex flex-col items-center gap-0 pb-4">
                  {courseUnits.map((unit, unitIdx) => {
                    const { done, total, lessons } = unitProgress(unit.id)
                    const allDone = done === total
                    const unlocked = isUnitUnlocked(courseIdx, unitIdx)
                    const nextLesson = lessons[done] ?? lessons[0]

                    // Alternate sides like Duolingo
                    const side = unitIdx % 4  // 0=center, 1=right, 2=center, 3=left

                    const offsetClass =
                      side === 1 ? 'translate-x-16' :
                      side === 3 ? '-translate-x-16' : ''

                    return (
                      <div key={unit.id} className="flex w-full flex-col items-center">
                        {/* Connector */}
                        {unitIdx > 0 && (
                          <div className={`h-8 w-1 rounded-full ${allDone ? 'bg-teal-400' : 'bg-gray-300'} ${offsetClass}`} />
                        )}

                        {/* Node */}
                        <div className={`flex flex-col items-center transform ${offsetClass}`}>
                          {/* START label for first unlocked uncompleted */}
                          {unlocked && !allDone && done === 0 && unitIdx === courseUnits.findIndex((u) => {
                            const p = unitProgress(u.id)
                            return !p.lessons.every((l) => completed.includes(l.id))
                          }) && (
                            <div className="mb-1 rounded-full bg-teal-500 px-3 py-0.5 text-xs font-extrabold uppercase text-white shadow">
                              START
                            </div>
                          )}

                          <Link
                            href={unlocked && nextLesson ? `/study/${nextLesson.id}` : '#'}
                            className={`flex h-16 w-16 items-center justify-center rounded-full border-b-[5px] text-2xl shadow-lg transition-all ${
                              allDone
                                ? 'border-teal-700 bg-teal-500 text-white hover:brightness-110'
                                : unlocked
                                ? 'border-teal-700 bg-teal-500 text-white hover:scale-105 animate-pulse'
                                : 'border-gray-400 bg-gray-300 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {allDone ? '⭐' : unlocked ? unit.emoji : '🔒'}
                          </Link>

                          {/* Unit label */}
                          <p className={`mt-1.5 text-xs font-bold ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                            {unit.title}
                          </p>

                          {/* Mini progress dots */}
                          <div className="mt-1 flex gap-1">
                            {Array.from({ length: Math.min(total, 5) }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full ${i < done ? 'bg-teal-500' : 'bg-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Section divider */}
                {courseIdx < courses.length - 1 && (
                  <div className="my-6 flex items-center gap-3 text-gray-400">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-xs font-bold uppercase tracking-widest">Next Course</span>
                    <div className="h-px flex-1 bg-gray-300" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>

      {/* Right panel */}
      <div className="sticky top-0 mr-4 h-screen w-80 flex-shrink-0 overflow-y-auto py-8 pr-2">
        <LearnRightPanel />
      </div>
    </div>
  )
}
