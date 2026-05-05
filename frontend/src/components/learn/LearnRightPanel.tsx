'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Activity, ClipboardCheck, Flame, Gem, Heart, LineChart, RotateCcw, Zap } from 'lucide-react'
import { useProgress, getLevel } from '../../store/progress-context'

export default function LearnRightPanel() {
  const { progress, user } = useProgress()
  const t = useTranslations('learn.rightPanel')
  const tLevels = useTranslations('levels')

  const { xp, streak, hearts, weakSigns } = progress
  const level = getLevel(xp)
  const dailyXP = Math.min(50, xp % 50)
  const dailyPct = Math.round((dailyXP / 50) * 100)
  const levelPct = Math.min(100, Math.round((xp / level.next) * 100))
  const reviewCount = weakSigns?.length ?? 0

  const stats = [
    { label: 'Streak', value: streak, icon: Flame, className: 'text-orange-500' },
    { label: 'XP', value: xp, icon: Gem, className: 'text-sky-500' },
    { label: 'Hearts', value: hearts, icon: Heart, className: 'text-rose-500' },
  ]

  return (
    <aside className="flex w-80 flex-shrink-0 flex-col gap-4">
      {user && (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-lg font-black text-white shadow-sm shadow-teal-500/25">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-black text-gray-950 dark:text-white">{user.name}</p>
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{t('student')}</p>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-3 gap-2">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <Icon className={`mb-2 h-5 w-5 ${stat.className}`} strokeWidth={2.4} />
              <p className="truncate text-lg font-black text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          )
        })}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-gray-950 dark:text-white">{t('dailyQuest')}</h3>
            <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">{t('earnXpToday')}</p>
          </div>
          <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-black text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
            {t('xpBonus')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <Zap className="h-5 w-5" fill="currentColor" strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${dailyPct}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">{dailyXP} / 50 XP</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-teal-500" strokeWidth={2.25} />
            <h3 className="text-base font-black text-gray-950 dark:text-white">{t('yourLevel')}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-black text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
            {tLevels(level.labelKey)}
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${levelPct}%` }} />
        </div>
        <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {xp} / {level.next} XP
        </p>
      </section>

      {hearts <= 2 && (
        <section className={`rounded-xl border p-4 shadow-sm ${
          hearts === 0
            ? 'border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/30'
            : 'border-orange-200 bg-orange-50 dark:border-orange-900/70 dark:bg-orange-950/30'
        }`}
        >
          <div className="flex items-start gap-3">
            <Activity className={`mt-0.5 h-5 w-5 ${hearts === 0 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`} />
            <p className={`text-sm font-bold ${hearts === 0 ? 'text-red-700 dark:text-red-300' : 'text-orange-700 dark:text-orange-300'}`}>
              {hearts === 0 ? t('noHearts') : t('heartsRemaining', { count: hearts, s: hearts === 1 ? '' : 's' })}
            </p>
          </div>
          {hearts === 0 && (
            <Link href="/review" className="mt-3 flex h-10 w-full items-center justify-center rounded-xl bg-purple-600 text-sm font-black text-white transition hover:bg-purple-700">
              {t('practiceInstead')}
            </Link>
          )}
        </section>
      )}

      {reviewCount > 0 && (
        <section className="rounded-xl border border-purple-200 bg-purple-50 p-5 shadow-sm dark:border-purple-900/70 dark:bg-purple-950/25">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm shadow-purple-600/25">
              <ClipboardCheck className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-black text-purple-950 dark:text-purple-200">{t('signsToReview')}</h3>
              <p className="mt-1 text-sm font-semibold text-purple-600 dark:text-purple-300">
                {t('needPractice', { count: reviewCount, sign: reviewCount !== 1 ? t('signs') : t('sign') })}
              </p>
            </div>
          </div>
          <Link href="/review" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 text-sm font-black text-white transition hover:bg-purple-700">
            <RotateCcw className="h-4 w-4" strokeWidth={2.5} />
            {t('startReview')}
          </Link>
        </section>
      )}

    </aside>
  )
}
