'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function CtaSection() {
  const t = useTranslations('landing.cta')
  return (
    <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-blue-900 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          {t('headline')}
        </h2>
        <p className="text-teal-50/85 text-lg max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <Link
          href="/get-started"
          className="inline-block px-12 py-5 bg-white text-teal-700 text-xl font-extrabold rounded-2xl hover:bg-teal-50 shadow-2xl shadow-teal-950/30 transition-all transform hover:scale-105 uppercase tracking-wide"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  )
}
