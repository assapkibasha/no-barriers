'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('landing.hero')
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="font-accent text-6xl font-bold leading-[1.05] text-ink sm:text-7xl lg:text-8xl">
              {t('headline')}{' '}
              <span className="marker-highlight whitespace-nowrap">{t('headlineHighlight')}</span>
            </h1>
            <p className="mx-auto max-w-md text-lg text-ink-soft lg:mx-0">
              {t('subtitle')}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/get-started"
                className="rounded-full bg-brand px-10 py-4 text-center text-lg font-extrabold uppercase tracking-wide text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover"
              >
                {t('getStarted')}
              </Link>
              <Link
                href="/login"
                className="rounded-full border-2 border-ink bg-transparent px-10 py-4 text-center text-lg font-extrabold uppercase tracking-wide text-ink transition-all hover:bg-ink hover:text-white"
              >
                {t('alreadyHaveAccount')}
              </Link>
            </div>
          </div>
          <div className="relative flex flex-1 justify-center" aria-hidden="false">
            <div className="absolute -left-4 top-8 hidden h-64 w-64 bg-brand/15 [border-radius:45%_55%_60%_40%/50%_45%_55%_50%] lg:block" />
            <div className="absolute -right-2 bottom-4 hidden h-40 w-40 bg-reward/20 [border-radius:55%_45%_40%_60%/45%_50%_50%_55%] lg:block" />
            <img
              src="/images/images/child and grama.png"
              alt="Grandmother and grandson learning sign language together"
              className="relative aspect-square w-full max-w-lg rounded-[2rem] border-4 border-white object-cover shadow-xl"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png'
              }}
            />
            <span className="absolute right-6 top-0 text-4xl text-reward" aria-hidden="true">✳</span>
          </div>
        </div>
      </div>
    </section>
  )
}
