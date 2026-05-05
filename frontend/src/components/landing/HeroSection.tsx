'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('landing.hero')
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_30rem),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.12),_transparent_28rem)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 flex justify-center">
          <img
            src="/images/images/child and grama.png"
            alt="grand ma and son learning together"
            className="rounded-[2rem] border border-white/70 shadow-2xl shadow-teal-900/15 w-full max-w-lg object-cover aspect-square"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png'
            }}
          />
        </div>
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 leading-tight">
            {t('headline')} <span className="text-teal-600">{t('headlineHighlight')}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto lg:mx-0">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/get-started"
              className="px-10 py-4 bg-teal-600 text-white text-lg font-extrabold rounded-2xl hover:bg-teal-700 shadow-xl shadow-teal-600/25 transition-all transform hover:scale-105 uppercase tracking-wide text-center"
            >
              {t('getStarted')}
            </Link>
            <Link href="/login" className="px-10 py-4 border-2 border-teal-200 bg-white/80 text-teal-700 text-lg font-extrabold rounded-2xl hover:border-teal-500 hover:bg-teal-50 transition-all uppercase tracking-wide text-center">
              {t('alreadyHaveAccount')}
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
