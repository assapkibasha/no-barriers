'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import { ThemeToggle } from '../../src/components/ThemeToggle'
import { LocaleSwitcher } from '../../src/components/LocaleSwitcher'
import LearnSidebar from '../../src/components/learn/LearnSidebar'
import LearnRightPanel from '../../src/components/learn/LearnRightPanel'
import { useProgress, getLevel, BADGES } from '../../src/store/progress-context'
import { lessons } from '../../src/data/lessons'
import { units } from '../../src/data/units'
import { useTranslations } from 'next-intl'

export default function ProfilePage() {
  const t = useTranslations('pages.profile')
  const tLevels = useTranslations('levels')
  const tBadges = useTranslations('badges')
  const { progress, loading } = useProgress()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-400 font-semibold">{t('loadingProfile')}</p>
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

      <main className="mb-24 flex flex-1 flex-col items-center px-4 py-8 md:mb-0 md:ml-64 sm:px-6">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">{t('myProfile')}</h1>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: '🔥', label: t('streak'), value: `${progress.streak} ${t('days')}` },
              { emoji: '⚡', label: t('totalXp'), value: progress.xp },
              { emoji: '📚', label: t('lessonsDone'), value: progress.completedLessons.length },
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
              <span className="font-extrabold text-gray-800 dark:text-gray-100">{tLevels(level.labelKey)}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">{progress.xp} / {level.next} XP</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-teal-100 dark:bg-teal-900/40">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-extrabold text-gray-800 dark:text-gray-100">{t('badges')}</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {BADGES.map((badge) => {
                const earned = badge.check(progress)
                return (
                  <div key={badge.id} title={tBadges(`${badge.id}.description`)}
                    className={`flex flex-col items-center rounded-2xl p-3 text-center transition ${
                      earned ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 opacity-60 grayscale'
                    }`}
                  >
                    <span className="text-3xl">{badge.emoji}</span>
                    <span className="mt-1 text-[10px] font-bold text-gray-600 dark:text-gray-400">{tBadges(`${badge.id}.label`)}</span>
                  </div>
                )
              })}
            </div>
            {earnedBadges.length === 0 && (
              <p className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">{t('noBadges')}</p>
            )}
          </div>

          {/* Progress chart */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-extrabold text-gray-800 dark:text-gray-100">{t('progressByUnit')}</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="30%">
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} axisLine={{ stroke: '#555' }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#888' }} axisLine={{ stroke: '#555' }} tickLine={false} />
                <Tooltip formatter={(val: number, name: string) => [val, name === 'done' ? t('completed') : t('total')]} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="total" fill="#14b8a6" fillOpacity={0.2} radius={[6, 6, 0, 0]} />
                <Bar dataKey="done" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Mobile Settings */}
          <div className="mt-8 flex flex-col gap-4 md:hidden">
            <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-100">{t('appSettings')}</h2>
            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <span className="font-bold text-gray-700 dark:text-gray-300">Language</span>
              <LocaleSwitcher />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <span className="font-bold text-gray-700 dark:text-gray-300">{t('theme')}</span>
              <ThemeToggle />
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-100 bg-red-50 p-4 font-extrabold uppercase tracking-widest text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 disabled:opacity-50"
            >
              🚪 {loggingOut ? t('loggingOut') : t('logOut')}
            </button>
          </div>
        </div>
      </main>

      <div className="sticky top-0 mr-4 hidden h-screen w-80 flex-shrink-0 overflow-y-auto py-8 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:block">
        <LearnRightPanel />
      </div>
    </div>
  )
}
