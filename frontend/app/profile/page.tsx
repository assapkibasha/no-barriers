'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import LearnSidebar from '../../src/components/learn/LearnSidebar'
import LearnRightPanel from '../../src/components/learn/LearnRightPanel'
import { useProgress, getLevel, BADGES } from '../../src/store/progress-context'
import { lessons } from '../../src/data/lessons'
import { units } from '../../src/data/units'

export default function ProfilePage() {
  const { progress, loading } = useProgress()

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-400 font-semibold">Loading your profile…</p>
    </div>
  )

  const level = getLevel(progress.xp)
  const xpPct = Math.min(100, Math.round((progress.xp / level.next) * 100))
  const earnedBadges = BADGES.filter((b) => b.check(progress))

  const chartData = units.map((u) => {
    const unitLessons = lessons.filter((l) => l.unitId === u.id)
    const done = unitLessons.filter((l) => progress.completedLessons.includes(l.id)).length
    return { name: u.title.split(' ')[0], done, total: unitLessons.length }
  })

  return (
    <div className="flex min-h-screen">
      <LearnSidebar />

      <main className="ml-64 flex flex-1 flex-col items-center px-6 py-8">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">My Profile</h1>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: '🔥', label: 'Streak', value: `${progress.streak} days` },
              { emoji: '⚡', label: 'Total XP', value: progress.xp },
              { emoji: '📚', label: 'Lessons Done', value: progress.completedLessons.length },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 text-center shadow-sm">
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-1 text-2xl font-extrabold text-gray-800 dark:text-gray-100">{s.value}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Level bar */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-extrabold text-gray-800 dark:text-gray-100">{level.label}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">{progress.xp} / {level.next} XP</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-teal-100 dark:bg-teal-900/40">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-extrabold text-gray-800 dark:text-gray-100">Badges</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {BADGES.map((badge) => {
                const earned = badge.check(progress)
                return (
                  <div key={badge.id} title={badge.description}
                    className={`flex flex-col items-center rounded-2xl p-3 text-center transition ${
                      earned ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 opacity-60 grayscale'
                    }`}
                  >
                    <span className="text-3xl">{badge.emoji}</span>
                    <span className="mt-1 text-[10px] font-bold text-gray-600 dark:text-gray-400">{badge.label}</span>
                  </div>
                )
              })}
            </div>
            {earnedBadges.length === 0 && (
              <p className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">Complete lessons to earn badges!</p>
            )}
          </div>

          {/* Progress chart */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-extrabold text-gray-800 dark:text-gray-100">Progress by Unit</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="30%">
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} axisLine={{ stroke: '#555' }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#888' }} axisLine={{ stroke: '#555' }} tickLine={false} />
                <Tooltip formatter={(val: number, name: string) => [val, name === 'done' ? 'Completed' : 'Total']} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="total" fill="#14b8a6" fillOpacity={0.2} radius={[6, 6, 0, 0]} />
                <Bar dataKey="done" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <div className="sticky top-0 mr-4 h-screen w-80 flex-shrink-0 overflow-y-auto py-8 pr-2">
        <LearnRightPanel />
      </div>
    </div>
  )
}
