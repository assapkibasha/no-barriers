'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { ThemeToggle } from '../ThemeToggle'

const navItems = [
  { href: '/learn',    label: 'LEARN',    icon: '📖' },
  { href: '/profile',  label: 'PROFILE',  icon: '👤' },
  { href: '/review',   label: 'PRACTICE', icon: '🔁' },
]

export default function LearnSidebar() {
  const path = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-6 transition-colors">
      {/* Logo */}
      <Link href="/" className="mb-10 flex items-center gap-3 px-4">
        <img src="/images/logo.png" alt="NoBarriers" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-black tracking-tight text-teal-600 dark:text-teal-400 leading-none">No<br/>Barriers</span>
      </Link>

      {/* Nav items */}
      <nav className="flex w-full flex-col gap-2">
        {navItems.map((item) => {
          const active = path === item.href || path.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3 text-sm font-extrabold tracking-widest uppercase transition-all ${
                active
                  ? 'border-teal-300 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-2xl drop-shadow-sm">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex w-full items-center gap-4 rounded-2xl border-2 border-transparent px-4 py-3 text-sm font-extrabold tracking-widest uppercase text-gray-400 dark:text-gray-500 transition-all hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-50"
      >
        <span className="text-2xl grayscale opacity-70">🚪</span>
        {loggingOut ? 'LOGGING OUT…' : 'LOG OUT'}
      </button>
    </aside>
  )
}
