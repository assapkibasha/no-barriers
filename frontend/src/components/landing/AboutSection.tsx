import { stats } from './data'
import { getTranslations } from 'next-intl/server'

export default async function AboutSection() {
  const t = await getTranslations('landing.about')
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          {t('title')} <span className="text-yellow-500">{t('brand')}</span>
        </h2>
        <p className="text-lg text-gray-500">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {stats.map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="text-4xl sm:text-5xl font-extrabold text-yellow-500">{stat.number}</div>
            <div className="text-gray-500 font-semibold uppercase tracking-wider text-sm">{t(statKeys[i])}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
