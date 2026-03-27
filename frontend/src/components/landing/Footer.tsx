'use client'

import { useTranslations } from 'next-intl'
import { Phone } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('landing.footer')
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="No Barriers logo"
                className="h-8 w-8 object-contain brightness-200"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = 'https://placehold.co/32x32/png'
                }}
              />
              <span className="text-xl font-extrabold text-yellow-400">NoBarriers</span>
            </div>
            <p className="text-sm">{t('tagline')}</p>
            <div className="pt-2 flex items-center gap-2 text-sm">
              <Phone size={16} className="text-yellow-400" />
              <a href="tel:0794008384" className="hover:text-yellow-400 transition-colors">
                0794 008 384
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('productHeader')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('courses')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('pricing')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('forSchools')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('forBusiness')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('companyHeader')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('aboutUs')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('careers')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('blog')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('press')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('supportHeader')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('helpCenter')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('contactUs')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">{t('termsOfService')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}