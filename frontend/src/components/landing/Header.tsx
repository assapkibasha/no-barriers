'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LocaleSwitcher } from '../LocaleSwitcher'

type HeaderVariant = 'yellow' | 'teal'

interface HeaderProps {
  variant?: HeaderVariant
}

export default function Header({ variant = 'yellow' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('landing.header')

  const isTeal = variant === 'teal'

  const bar = isTeal
    ? 'border-teal-600/70 bg-teal-700/95'
    : 'border-yellow-700/70 bg-yellow-700/95'

  const navLink = isTeal
    ? 'text-teal-100/90 hover:text-white'
    : 'text-yellow-100/90 hover:text-white'

  const loginBtn = isTeal
    ? 'text-teal-100 hover:text-white'
    : 'text-yellow-100 hover:text-white'

  const ctaBtn = isTeal
    ? 'border-teal-200/80 bg-teal-300 text-teal-950 hover:bg-teal-200'
    : 'border-yellow-300/80 bg-yellow-400 text-yellow-950 hover:bg-yellow-300'

  const mobileToggle = isTeal
    ? 'text-teal-100 hover:bg-teal-900/80'
    : 'text-yellow-100 hover:bg-yellow-900/80'

  const mobilePanel = isTeal
    ? 'border-teal-600/70 bg-teal-950/95'
    : 'border-yellow-700/70 bg-yellow-950/95'

  const mobileLoginBtn = isTeal
    ? 'border-teal-700 text-teal-100'
    : 'border-yellow-700 text-yellow-100'

  const mobileCtaBtn = isTeal
    ? 'border-teal-300/80 bg-teal-200 text-teal-950'
    : 'border-yellow-300/80 bg-yellow-200 text-yellow-950'

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 sm:px-4 lg:px-6">
      <div className={`mx-auto flex h-14 w-full max-w-7xl items-center justify-between rounded-2xl border px-3 shadow-[0_20px_45px_rgba(3,34,24,0.45)] backdrop-blur md:px-4 ${bar}`}>
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="No Barriers logo"
            className="h-10 w-10 object-contain invert"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://placehold.co/40x40/png'
            }}
          />
          <span className="text-2xl font-extrabold tracking-tight text-white">NoBarriers</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <Link href="/#features" className={`text-lg font-medium transition-colors ${navLink}`}>
            {t('features')}
          </Link>
          <Link href="/#languages" className={`text-lg font-medium transition-colors ${navLink}`}>
            {t('languages')}
          </Link>
          <Link href="/#about" className={`text-lg font-medium transition-colors ${navLink}`}>
            {t('about')}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <Link href={isTeal ? '/login' : '/login'} className={`rounded-xl px-4 py-2 font-semibold transition-colors ${loginBtn}`}>
            {t('logIn')}
          </Link>
          <Link
            href={isTeal ? '/register' : '/get-started'}
            className={`rounded-2xl border px-5 py-2 font-semibold transition-all ${ctaBtn}`}
          >
            {isTeal ? t('register') : t('getStarted')}
          </Link>
        </div>

        <button
          className={`rounded-lg p-2 transition-colors md:hidden ${mobileToggle}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={`mx-auto mt-2 w-full max-w-7xl rounded-2xl border px-4 py-4 shadow-[0_20px_45px_rgba(3,34,24,0.45)] md:hidden ${mobilePanel}`}>
          <Link href="/#features" className={`block py-2 font-medium transition-colors ${navLink}`}>
            {t('features')}
          </Link>
          <Link href="/#languages" className={`block py-2 font-medium transition-colors ${navLink}`}>
            {t('languages')}
          </Link>
          <Link href="/#about" className={`block py-2 font-medium transition-colors ${navLink}`}>
            {t('about')}
          </Link>
          <div className="mt-3 space-y-2">
            <button className={`w-full rounded-xl border py-2.5 font-semibold ${mobileLoginBtn}`}>{t('logIn')}</button>
            <Link
              href="/get-started"
              className={`block w-full rounded-2xl border py-2.5 text-center font-semibold ${mobileCtaBtn}`}
            >
              {t('getStarted')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
