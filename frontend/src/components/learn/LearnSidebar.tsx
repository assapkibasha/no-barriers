'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

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
    router.push('/login')
  }

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-52 flex-col border-r border-gray-200 bg-white px-3 py-5">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2 px-3">
        <img src="/images/logo.png" alt="NoBarriers" className="h-9 w-9 object-contain" />
        <span className="text-lg font-extrabold tracking-tight text-teal-700 leading-tight">No<br/>Barriers</span>
      </Link>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = path === item.href || path.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-extrabold text-sm tracking-wide transition-all ${
                active
                  ? 'bg-teal-50 text-teal-700 border-b-[3px] border-teal-400 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold tracking-wide text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
      >
        <span className="text-xl">🚪</span>
        {loggingOut ? 'Logging out…' : 'LOG OUT'}
      </button>
    </aside>
  )
}
