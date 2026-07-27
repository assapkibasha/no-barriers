'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'

const items = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const

export default function FaqSection() {
  const t = useTranslations('landing.faq')
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-center font-accent text-5xl font-bold text-ink sm:text-6xl">
        <span className="marker-underline">{t('title')}</span>
      </h2>
      <div className="mt-12 flex flex-col gap-4">
        {items.map((q) => (
          <details
            key={q}
            className="group rounded-2xl border border-line bg-white px-6 py-5 shadow-sm open:border-brand/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-extrabold text-ink [&::-webkit-details-marker]:hidden">
              {t(`${q}.question`)}
              <ChevronDown
                size={20}
                className="shrink-0 text-brand transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t(`${q}.answer`)}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
