'use client'

import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('landing.about')
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
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
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
          {t('title')} <span className="text-brand">{t('brand')}</span>
        </h2>
        <p className="text-lg text-ink-soft">
          {t('description')}
        </p>
      </div>
    </section>
  )
}
