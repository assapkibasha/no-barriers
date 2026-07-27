'use client'

import { Globe, BookOpen, Trophy, Brain, Sparkles, Users, Flame } from 'lucide-react'
import { useTranslations } from 'next-intl'

const badgeStyles = {
  brand: 'bg-brand-soft text-brand',
  unit: 'bg-unit-soft text-unit',
  reward: 'bg-reward-soft text-reward',
} as const

type BadgeTone = keyof typeof badgeStyles

interface Feature {
  key: string
  image: string
  alt: string
  reverse: boolean
  badges: { tKey: string; tone: BadgeTone; Icon: typeof Sparkles }[]
}

const features: Feature[] = [
  {
    key: 'f1',
    image: '/images/images/funny.png',
    alt: 'Students collaborating on language learning',
    reverse: false,
    badges: [
      { tKey: 'f1Badge1', tone: 'brand', Icon: Sparkles },
      { tKey: 'f1Badge2', tone: 'unit', Icon: Trophy },
    ],
  },
  {
    key: 'f2',
    image: '/images/images/verified platform.png',
    alt: 'Scientific approach to language education',
    reverse: true,
    badges: [
      { tKey: 'f2Badge1', tone: 'unit', Icon: Brain },
      { tKey: 'f2Badge2', tone: 'brand', Icon: BookOpen },
    ],
  },
  {
    key: 'f3',
    image: '/images/images/motivation.jpg',
    alt: 'Motivated learners celebrating achievements',
    reverse: false,
    badges: [
      { tKey: 'f3Badge1', tone: 'reward', Icon: Flame },
      { tKey: 'f3Badge2', tone: 'unit', Icon: Users },
    ],
  },
  {
    key: 'f4',
    image: '/images/images/personalized.png',
    alt: 'Personalized language learning experience',
    reverse: true,
    badges: [
      { tKey: 'f4Badge1', tone: 'brand', Icon: Brain },
      { tKey: 'f4Badge2', tone: 'unit', Icon: Globe },
    ],
  },
]

export default function FeaturesSection() {
  const t = useTranslations('landing.features')
  return (
    <section id="features" className="mx-auto max-w-7xl space-y-28 px-4 py-20 sm:px-6 lg:px-8">
      {features.map(({ key, image, alt, reverse, badges }, i) => (
        <div
          key={key}
          className={`flex flex-col items-center gap-12 lg:gap-20 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {t(`${key}Title`)}
            </h2>
            <p className="max-w-md text-lg text-ink-soft">{t(`${key}Body`)}</p>
            <div className="flex flex-wrap gap-4">
              {badges.map(({ tKey, tone, Icon }) => (
                <div key={tKey} className={`flex items-center gap-2 rounded-xl px-4 py-2 ${badgeStyles[tone]}`}>
                  <Icon size={20} />
                  <span className="text-sm font-semibold">{t(tKey)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-3xl ${i % 2 === 0 ? 'rotate-3 bg-brand/10' : '-rotate-3 bg-unit/10'}`}
              />
              <img
                src={image}
                alt={alt}
                className="relative aspect-video w-full max-w-md rounded-3xl border-4 border-white object-cover shadow-lg"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
