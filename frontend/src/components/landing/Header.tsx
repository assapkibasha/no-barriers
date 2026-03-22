'use client'

import { useState, useEffect } from 'react'
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

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

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

  const sidebarBg = isTeal
    ? 'bg-teal-950'
    : 'bg-yellow-950'

  const sidebarNavLink = isTeal
    ? 'text-teal-100 hover:bg-teal-800/60'
    : 'text-yellow-100 hover:bg-yellow-800/60'

  const mobileLoginBtn = isTeal
    ? 'border-teal-700 text-teal-100 hover:bg-teal-800/40'
    : 'border-yellow-700 text-yellow-100 hover:bg-yellow-800/40'

  const mobileCtaBtn = isTeal
    ? 'border-teal-300/80 bg-teal-200 text-teal-950 hover:bg-teal-100'
    : 'border-yellow-300/80 bg-yellow-200 text-yellow-950 hover:bg-yellow-100'

  return (
    <>
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
            <Link href="/login" className={`rounded-xl px-4 py-2 font-semibold transition-colors ${loginBtn}`}>
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
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide-in sidebar */}
      <aside
        className={`fixed top-0 right-0 z-[70] flex h-full w-72 flex-col ${sidebarBg} shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/images/logo.png"
              alt="No Barriers logo"
              className="h-8 w-8 object-contain invert"
              onError={(e) => { ;(e.target as HTMLImageElement).src = 'https://placehold.co/32x32/png' }}
            />
            <span className="text-lg font-extrabold text-white">NoBarriers</span>
          </Link>
          <button
            className={`rounded-lg p-1.5 transition-colors ${mobileToggle}`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors ${sidebarNavLink}`}
          >
            {t('features')}
          </Link>
          <Link
            href="/#languages"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors ${sidebarNavLink}`}
          >
            {t('languages')}
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors ${sidebarNavLink}`}
          >
            {t('about')}
          </Link>
        </nav>

        {/* Bottom section: language switcher + auth buttons */}
        <div className="px-4 py-5 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Language</span>
            <LocaleSwitcher />
          </div>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full rounded-xl border py-2.5 text-center font-semibold transition-colors ${mobileLoginBtn}`}
          >
            {t('logIn')}
          </Link>
          <Link
            href={isTeal ? '/register' : '/get-started'}
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full rounded-2xl border py-2.5 text-center font-semibold transition-colors ${mobileCtaBtn}`}
          >
            {isTeal ? t('register') : t('getStarted')}
          </Link>
        </div>
      </aside>
    </>
  )
}
