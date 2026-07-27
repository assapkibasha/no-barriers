'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { BookOpen, Compass, LogOut, RotateCcw, UserRound } from 'lucide-react'

import { ThemeToggle } from '../ThemeToggle'
import { LocaleSwitcher } from '../LocaleSwitcher'

export default function LearnSidebar() {
  const path = usePathname()
  const [loggingOut, setLoggingOut] = useState(false)
  const t = useTranslations('learn.sidebar')

  const navItems = [
    { href: '/learn', labelKey: 'learn', icon: BookOpen },
    { href: '/profile', labelKey: 'profile', icon: UserRound },
    { href: '/review', labelKey: 'practice', icon: RotateCcw },
    { href: '/guide', labelKey: 'guide', icon: Compass },
  ]

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <aside className="fixed bottom-0 left-0 z-40 flex h-20 w-full flex-row items-center justify-around border-t border-line bg-white/95 px-2 shadow-[0_-8px_24px_rgba(18,43,48,0.06)] backdrop-blur transition-colors dark:border-gray-800 dark:bg-gray-950/95 md:top-0 md:h-screen md:w-64 md:flex-col md:justify-start md:border-r md:border-t-0 md:px-4 md:py-6 md:shadow-[8px_0_24px_rgba(18,43,48,0.06)]">
      <Link href="/" className="mb-8 hidden w-full items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-brand-soft/50 dark:hover:bg-gray-900 md:flex">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink p-1.5 shadow-sm">
          <img src="/images/logo.png" alt="NoBarriers" className="h-full w-full object-contain" />
        </span>
        <span className="font-display text-xl font-extrabold leading-none tracking-normal text-ink dark:text-white">
          No<span className="block text-brand">Barriers</span>
        </span>
      </Link>

      <nav className="flex w-full flex-row justify-around gap-1 md:flex-col md:gap-1.5">
        {navItems.map((item) => {
          const active = path === item.href || path.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`group flex h-14 min-w-14 items-center justify-center gap-3 rounded-xl px-3 text-sm font-bold transition-all md:w-full md:justify-start ${
                active
                  ? 'bg-brand text-white shadow-sm shadow-brand/20'
                  : 'text-ink-soft hover:bg-brand-soft/60 hover:text-ink dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-ink-soft/70 group-hover:text-brand'}`} strokeWidth={2.25} />
              <span className="hidden truncate md:inline">{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </nav>

      <div className="hidden flex-1 md:block" />

      <div className="mb-2 hidden w-full md:block">
        <LocaleSwitcher />
      </div>

      <div className="hidden w-full md:block">
        <ThemeToggle />
      </div>

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="hidden h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold text-ink-soft transition-all hover:bg-heart-soft hover:text-heart disabled:opacity-50 dark:text-gray-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 md:flex"
      >
        <LogOut className="h-5 w-5 shrink-0" strokeWidth={2.25} />
        <span className="truncate">{loggingOut ? t('loggingOut') : t('logOut')}</span>
      </button>
    </aside>
  )
}
