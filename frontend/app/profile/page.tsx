'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import { BookOpenCheck, Flame, Gem } from 'lucide-react'
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
      <p className="text-ink-soft font-semibold">{t('loadingProfile')}</p>
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

      <main className="mb-24 flex flex-1 flex-col items-center px-4 py-7 md:mb-0 md:ml-64 sm:px-6">
        <div className="w-full max-w-3xl space-y-5">
          <h1 className="font-display text-2xl font-extrabold text-ink dark:text-gray-100">{t('myProfile')}</h1>

          {/* Stats row */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { emoji: '🔥', label: t('streak'), value: `${progress.streak} ${t('days')}` },
              { emoji: '⚡', label: t('totalXp'), value: progress.xp },
              { emoji: '📚', label: t('lessonsDone'), value: progress.completedLessons.length },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-paper text-2xl dark:bg-teal-950/60">
                  {s.label === t('streak') ? (
                    <Flame className="h-6 w-6 text-reward" strokeWidth={2.4} />
                  ) : s.label === t('totalXp') ? (
                    <Gem className="h-6 w-6 text-brand" strokeWidth={2.4} />
                  ) : s.label === t('lessonsDone') ? (
                    <BookOpenCheck className="h-6 w-6 text-unit" strokeWidth={2.4} />
                  ) : (
                    s.emoji
                  )}
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-2xl font-extrabold leading-none text-ink [font-variant-numeric:tabular-nums] dark:text-gray-100">{s.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-gray-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Level bar */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="font-display text-lg font-extrabold text-ink dark:text-gray-100">{tLevels(level.labelKey)}</span>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand [font-variant-numeric:tabular-nums]">{progress.xp} / {level.next} XP</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-line/60 dark:bg-teal-950/70">
              <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="mb-4 font-display text-lg font-extrabold text-ink dark:text-gray-100">{t('badges')}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {BADGES.map((badge) => {
                const earned = badge.check(progress)
                return (
                  <div key={badge.id} title={tBadges(`${badge.id}.description`)}
                    className={`flex min-h-[88px] flex-col items-center justify-center rounded-2xl border p-3 text-center transition ${
                      earned ? 'border-reward/40 bg-reward-soft shadow-sm dark:border-amber-500/60 dark:bg-amber-500/10' : 'border-line bg-paper text-ink-soft opacity-60 grayscale dark:border-slate-800 dark:bg-slate-800/55 dark:text-gray-500'
                    }`}
                  >
                    <span className="text-3xl leading-none">{badge.emoji}</span>
                    <span className={`mt-2 text-[11px] font-extrabold leading-tight ${earned ? 'text-ink dark:text-gray-200' : 'text-ink-soft dark:text-gray-500'}`}>{tBadges(`${badge.id}.label`)}</span>
                  </div>
                )
              })}
            </div>
            {earnedBadges.length === 0 && (
              <p className="mt-4 text-center text-sm text-ink-soft dark:text-gray-500">{t('noBadges')}</p>
            )}
          </div>

          {/* Progress chart */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="mb-4 font-display text-lg font-extrabold text-ink dark:text-gray-100">{t('progressByUnit')}</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barCategoryGap="18%" barGap={1} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7A76' }} axisLine={{ stroke: '#E4DFD3' }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7A76' }} axisLine={{ stroke: '#E4DFD3' }} tickLine={false} />
                <Tooltip formatter={(val: number, name: string) => [val, name === 'done' ? t('completed') : t('total')]} contentStyle={{ backgroundColor: '#122B30', borderColor: '#122B30', color: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="total" fill="#0F766E" fillOpacity={0.18} radius={[3, 3, 0, 0]} />
                <Bar dataKey="done" fill="#0F766E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Mobile Settings */}
          <div className="mt-8 flex flex-col gap-4 md:hidden">
            <h2 className="font-display text-lg font-extrabold text-ink dark:text-gray-100">{t('appSettings')}</h2>
            <div className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <span className="font-bold text-ink dark:text-gray-300">Language</span>
              <LocaleSwitcher />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <span className="font-bold text-ink dark:text-gray-300">{t('theme')}</span>
              <ThemeToggle />
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-heart/20 bg-heart-soft p-4 font-extrabold uppercase tracking-widest text-heart transition hover:brightness-95 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 disabled:opacity-50"
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
