'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { ThemeToggle } from '../ThemeToggle'
import { LocaleSwitcher } from '../LocaleSwitcher'

export default function LearnSidebar() {
  const path = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const t = useTranslations('learn.sidebar')

  const navItems = [
    { href: '/learn',    labelKey: 'learn',    icon: '📖' },
    { href: '/profile',  labelKey: 'profile',  icon: '👤' },
    { href: '/review',   labelKey: 'practice', icon: '🔁' },
    { href: '/guide',    labelKey: 'guide',    icon: 'ℹ️' },
  ]

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <aside className="fixed bottom-0 left-0 z-40 flex h-20 w-full flex-row items-center justify-around border-t-2 border-gray-200 bg-white px-2 py-0 transition-colors dark:border-gray-800 dark:bg-gray-950 md:top-0 md:h-screen md:w-64 md:flex-col md:justify-start md:border-r-2 md:border-t-0 md:px-4 md:py-6">
      {/* Logo - Hidden on mobile */}
      <Link href="/" className="mb-10 hidden items-center gap-3 px-4 md:flex">
        <img src="/images/logo.png" alt="NoBarriers" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-black leading-none tracking-tight text-teal-600 dark:text-teal-400">No<br/>Barriers</span>
      </Link>

      {/* Nav items */}
      <nav className="flex w-full flex-row justify-around gap-2 md:flex-col">
        {navItems.map((item) => {
          const active = path === item.href || path.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center gap-4 rounded-2xl border-2 p-3 text-sm font-extrabold uppercase tracking-widest transition-all md:w-full md:justify-start md:px-4 ${
                active
                  ? 'border-teal-300 bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-2xl drop-shadow-sm">{item.icon}</span>
              <span className="hidden md:inline">{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="hidden flex-1 md:block" />

      {/* Locale Switcher - Hidden on mobile */}
      <div className="hidden md:block mb-2">
        <LocaleSwitcher />
      </div>

      {/* Theme Toggle - Hidden on mobile */}
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      {/* Logout - Hidden on mobile */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="hidden w-full items-center gap-4 rounded-2xl border-2 border-transparent px-4 py-3 text-sm font-extrabold uppercase tracking-widest text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:text-gray-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 md:flex"
      >
        <span className="text-2xl grayscale opacity-70">🚪</span>
        <span>{loggingOut ? t('loggingOut') : t('logOut')}</span>
      </button>
    </aside>
  )
}
