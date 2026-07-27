'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function CtaSection() {
  const t = useTranslations('landing.cta')
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto max-w-4xl space-y-8 px-4 text-center">
        <h2 className="font-accent text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          {t('headline')}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-white/75">
          {t('subtitle')}
        </p>
        <Link
          href="/get-started"
          className="inline-block rounded-full bg-white px-12 py-5 text-xl font-extrabold uppercase tracking-wide text-ink shadow-lg transition-all hover:bg-brand-aqua"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  )
}
