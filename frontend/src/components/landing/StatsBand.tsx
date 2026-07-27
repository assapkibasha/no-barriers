'use client'

import { stats } from './data'
import { useTranslations } from 'next-intl'

const statKeys = ['statLanguages', 'statLearners', 'statLessons', 'statAppRating']

export default function StatsBand() {
  const t = useTranslations('landing.about')
  return (
    <section className="bg-ink py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand-aqua">
              ↑ {t(statKeys[i])}
            </p>
            <p className="mt-2 text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl [font-variant-numeric:tabular-nums]">
              {stat.number}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
