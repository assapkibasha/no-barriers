'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const locales = [
  { code: 'en', label: 'English',    flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'fr', label: 'Français',   flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'rw', label: 'Kinyarwanda',flag: 'https://flagcdn.com/w40/rw.png' },
  { code: 'pt', label: 'Português',  flag: 'https://flagcdn.com/w40/br.png' },
  { code: 'es', label: 'Español',    flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'it', label: 'Italiano',   flag: 'https://flagcdn.com/w40/it.png' },
  { code: 'de', label: 'Deutsch',    flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'ja', label: '日本語',      flag: 'https://flagcdn.com/w40/jp.png' },
  { code: 'ko', label: '한국어',      flag: 'https://flagcdn.com/w40/kr.png' },
  { code: 'zh', label: '中文',        flag: 'https://flagcdn.com/w40/cn.png' },
  { code: 'ar', label: 'العربية',    flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'sw', label: 'Kiswahili',  flag: 'https://flagcdn.com/w40/ke.png' },
]

export function LocaleSwitcher() {
  const router = useRouter()
  const currentLocale = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = locales.find((l) => l.code === currentLocale) ?? locales[0]

  const switchLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
    setOpen(false)
    router.refresh()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-all text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <img src={current.flag} alt={current.label} className="h-3.5 w-5 rounded-sm object-cover" />
        <span>{current.code.toUpperCase()}</span>
        <span className="text-[10px] opacity-60">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
          {locales.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                currentLocale === code
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <img src={flag} alt={label} className="h-3.5 w-5 rounded-sm object-cover" />
              <span>{label}</span>
              {currentLocale === code && <span className="ml-auto text-teal-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
