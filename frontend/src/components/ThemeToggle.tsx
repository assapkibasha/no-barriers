'use client'

import { Moon, Sun } from 'lucide-react'
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
      <button className="flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold text-gray-500 opacity-50 transition-all">
        <Moon className="h-5 w-5 shrink-0" strokeWidth={2.25} />
        <span>{t('theme')}</span>
      </button>
    )
  }

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      {isDark ? (
        <Sun className="h-5 w-5 shrink-0 text-amber-500" strokeWidth={2.25} />
      ) : (
        <Moon className="h-5 w-5 shrink-0 text-teal-500" strokeWidth={2.25} />
      )}
      <span className="truncate">{isDark ? t('lightMode') : t('darkMode')}</span>
    </button>
  )
}
