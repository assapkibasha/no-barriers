'use client'

import { useTranslations } from 'next-intl'
import { Phone, Mail } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('landing.footer')
  return (
    <footer className="bg-ink text-white/60 py-16">
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
              <span className="text-xl font-extrabold text-brand-aqua">NoBarriers</span>
            </div>
            <p className="text-sm">{t('tagline')}</p>
            <div className="pt-2 flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-brand-aqua" />
                <a href="tel:0794008384" className="hover:text-brand-aqua transition-colors">
                  0794 008 384
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-aqua" />
                <a href="mailto:notabarrier@yahoo.com" className="hover:text-brand-aqua transition-colors">
                  notabarrier@yahoo.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('productHeader')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('courses')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('pricing')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('forSchools')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('forBusiness')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('companyHeader')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('aboutUs')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('careers')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('blog')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('press')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('supportHeader')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('helpCenter')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('contactUs')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-brand-aqua transition-colors text-white/60">{t('termsOfService')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          <p>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}
