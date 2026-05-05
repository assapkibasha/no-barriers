'use client'

import { stats } from './data'
import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('landing.about')
  const statKeys = ['statLanguages', 'statLearners', 'statLessons', 'statAppRating']
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="No Barriers logo"
            className="h-[160px] w-[160px] object-contain invert"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://placehold.co/80x80/png'
            }}
          />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t('title')} <span className="text-teal-600">{t('brand')}</span>
        </h2>
        <p className="text-lg text-slate-600">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {stats.map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="text-4xl sm:text-5xl font-extrabold text-teal-600">{stat.number}</div>
            <div className="text-slate-500 font-semibold uppercase tracking-wider text-sm">{t(statKeys[i])}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
