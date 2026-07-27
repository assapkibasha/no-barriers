'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Activity, ClipboardCheck, Flame, Gem, Heart, LineChart, RotateCcw, Zap } from 'lucide-react'
import { useProgress, getLevel } from '../../store/progress-context'

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

export default function LearnRightPanel() {
  const { progress, user } = useProgress()
  const t = useTranslations('learn.rightPanel')
  const tLevels = useTranslations('levels')

  const { xp, streak, hearts, weakSigns } = progress
  const level = getLevel(xp)
  // XP earned today, tracked by the store; a stale date means nothing earned yet today.
  const dailyXP = progress.xpTodayDate === todayStr() ? Math.min(50, progress.xpToday) : 0
  const questDone = dailyXP >= 50
  const dailyPct = Math.round((dailyXP / 50) * 100)
  const levelPct = Math.min(100, Math.round((xp / level.next) * 100))
  const reviewCount = weakSigns?.length ?? 0

  const stats = [
    { label: 'Streak', value: streak, icon: Flame, className: 'text-reward' },
    { label: 'XP', value: xp, icon: Gem, className: 'text-brand' },
    { label: 'Hearts', value: hearts, icon: Heart, className: 'text-heart' },
  ]

  return (
    <aside className="flex w-80 flex-shrink-0 flex-col gap-4">
      {user && (
        <section className="rounded-2xl border border-line bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand font-display text-lg font-extrabold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-base font-extrabold text-ink dark:text-white">{user.name}</p>
              <p className="text-sm font-semibold text-brand">{t('student')}</p>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-3 gap-2">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white px-3 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <Icon className={`mb-2 h-5 w-5 ${stat.className}`} strokeWidth={2.4} />
              <p className="truncate text-lg font-extrabold text-ink [font-variant-numeric:tabular-nums] dark:text-white">{stat.value}</p>
            </div>
          )
        })}
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-extrabold text-ink dark:text-white">{t('dailyQuest')}</h3>
            <p className="mt-1 text-sm font-semibold text-ink-soft dark:text-gray-400">{t('earnXpToday')}</p>
          </div>
          <span className="shrink-0 rounded-full bg-reward-soft px-2.5 py-1 text-xs font-extrabold text-reward">
            {questDone ? '✓' : t('xpBonus')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-reward-soft text-reward">
            <Zap className="h-5 w-5" fill="currentColor" strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-line/60 dark:bg-gray-800">
              <div className="h-full rounded-full bg-reward transition-all" style={{ width: `${dailyPct}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-ink-soft [font-variant-numeric:tabular-nums] dark:text-gray-400">{dailyXP} / 50 XP</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-brand" strokeWidth={2.25} />
            <h3 className="font-display text-base font-extrabold text-ink dark:text-white">{t('yourLevel')}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-extrabold text-brand">
            {tLevels(level.labelKey)}
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-line/60 dark:bg-gray-800">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${levelPct}%` }} />
        </div>
        <p className="mt-2 text-xs font-semibold text-ink-soft [font-variant-numeric:tabular-nums] dark:text-gray-400">
          {xp} / {level.next} XP
        </p>
      </section>

      {hearts <= 2 && (
        <section className="rounded-2xl border border-heart/25 bg-heart-soft p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Activity className="mt-0.5 h-5 w-5 text-heart" />
            <p className="text-sm font-bold text-heart">
              {hearts === 0 ? t('noHearts') : t('heartsRemaining', { count: hearts, s: hearts === 1 ? '' : 's' })}
            </p>
          </div>
          {hearts === 0 && (
            <Link href="/review" className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white transition hover:bg-brand-hover">
              {t('practiceInstead')}
            </Link>
          )}
        </section>
      )}

      {reviewCount > 0 && (
        <section className="rounded-2xl border border-unit/25 bg-unit-soft p-5 shadow-sm">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-unit text-white">
              <ClipboardCheck className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-base font-extrabold text-ink">{t('signsToReview')}</h3>
              <p className="mt-1 text-sm font-semibold text-unit">
                {t('needPractice', { count: reviewCount, sign: reviewCount !== 1 ? t('signs') : t('sign') })}
              </p>
            </div>
          </div>
          <Link href="/review" className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-extrabold text-white transition hover:bg-brand-hover">
            <RotateCcw className="h-4 w-4" strokeWidth={2.5} />
            {t('startReview')}
          </Link>
        </section>
      )}

    </aside>
  )
}
