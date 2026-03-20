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
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <LearnSidebar />

      <main className="ml-52 flex flex-1 justify-center px-6 py-8">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-2xl font-extrabold text-gray-800">My Profile</h1>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: '🔥', label: 'Streak', value: `${progress.streak} days` },
              { emoji: '⚡', label: 'Total XP', value: progress.xp },
              { emoji: '📚', label: 'Lessons Done', value: progress.completedLessons.length },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-1 text-2xl font-extrabold text-gray-800">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Level bar */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-extrabold text-gray-800">{level.label}</span>
              <span className="text-sm text-gray-400">{progress.xp} / {level.next} XP</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-teal-100">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-extrabold text-gray-800">Badges</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {BADGES.map((badge) => {
                const earned = badge.check(progress)
                return (
                  <div key={badge.id} title={badge.description}
                    className={`flex flex-col items-center rounded-2xl p-3 text-center transition ${
                      earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-100 opacity-40 grayscale'
                    }`}
                  >
                    <span className="text-3xl">{badge.emoji}</span>
                    <span className="mt-1 text-[10px] font-bold text-gray-600">{badge.label}</span>
                  </div>
                )
              })}
            </div>
            {earnedBadges.length === 0 && (
              <p className="mt-4 text-center text-sm text-gray-400">Complete lessons to earn badges!</p>
            )}
          </div>

          {/* Progress chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-extrabold text-gray-800">Progress by Unit</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="30%">
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val, name) => [val, name === 'done' ? 'Completed' : 'Total']} />
                <Bar dataKey="total" fill="#ccfbf1" radius={[6, 6, 0, 0]} />
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
