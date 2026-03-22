'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const t = useTranslations('theme')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="flex w-full items-center gap-4 rounded-2xl border-2 border-transparent px-4 py-3 text-sm font-extrabold tracking-widest uppercase text-gray-500 transition-all opacity-50">
        <span className="text-2xl drop-shadow-sm">🌙</span>
        <span>{t('theme')}</span>
      </button>
    )
  }

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex w-full items-center gap-4 rounded-2xl border-2 border-transparent px-4 py-3 text-sm font-extrabold tracking-widest uppercase text-gray-500 dark:text-gray-400 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
    >
      <span className="text-2xl drop-shadow-sm">{isDark ? '☀️' : '🌙'}</span>
      <span>{isDark ? t('lightMode') : t('darkMode')}</span>
    </button>
  )
}
