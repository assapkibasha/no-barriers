'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('landing.hero')
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 flex justify-center">
          <img
            src="/images/images/child and grama.png"
            alt="grand ma and son learning together"
            className="rounded-3xl shadow-2xl w-full max-w-lg object-cover aspect-square"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png'
            }}
          />
        </div>
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            {t('headline')} <span className="text-yellow-500">{t('headlineHighlight')}</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto lg:mx-0">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/get-started"
              className="px-10 py-4 bg-yellow-500 text-white text-lg font-extrabold rounded-2xl hover:bg-yellow-600 shadow-xl shadow-yellow-500/30 transition-all transform hover:scale-105 uppercase tracking-wide text-center"
            >
              {t('getStarted')}
            </Link>
            <button className="px-10 py-4 border-2 border-gray-300 text-yellow-500 text-lg font-extrabold rounded-2xl hover:border-yellow-500 hover:bg-yellow-50 transition-all uppercase tracking-wide">
              {t('alreadyHaveAccount')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
