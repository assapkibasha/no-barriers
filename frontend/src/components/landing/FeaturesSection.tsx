'use client'

import { Globe, BookOpen, Trophy, Brain, Sparkles, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function FeaturesSection() {
  const t = useTranslations('landing.features')
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            {t('f1Title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            {t('f1Body')}
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <Sparkles className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-yellow-700">{t('f1Badge1')}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
              <Trophy className="text-blue-500" size={20} />
              <span className="text-sm font-semibold text-blue-700">{t('f1Badge2')}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl transform rotate-3" />
            <img
              src="/images/images/funny.png"
              alt="Students collaborating on language learning"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            {t('f2Title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            {t('f2Body')}
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
              <Brain className="text-purple-500" size={20} />
              <span className="text-sm font-semibold text-purple-700">{t('f2Badge1')}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
              <BookOpen className="text-orange-500" size={20} />
              <span className="text-sm font-semibold text-orange-700">{t('f2Badge2')}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-3" />
            <img
              src="/images/images/verified platform.png"
              alt="Scientific approach to language education"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            {t('f3Title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            {t('f3Body')}
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <Trophy className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-yellow-700">{t('f3Badge1')}</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl">
              <Users className="text-red-500" size={20} />
              <span className="text-sm font-semibold text-red-700">{t('f3Badge2')}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl transform rotate-2" />
            <img
              src="/images/images/motivation.jpg"
              alt="Motivated learners celebrating achievements"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-500 leading-tight">
            {t('f4Title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-md">
            {t('f4Body')}
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-xl">
              <Brain className="text-cyan-500" size={20} />
              <span className="text-sm font-semibold text-cyan-700">{t('f4Badge1')}</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <Globe className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-yellow-700">{t('f4Badge2')}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl transform -rotate-2" />
            <img
              src="/images/images/personalized.png"
              alt="Personalized language learning experience"
              className="relative rounded-3xl shadow-xl w-full max-w-md object-cover aspect-video"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}