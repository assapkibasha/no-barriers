'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const locales = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'rw', label: 'RW', flag: '🇷🇼' },
]

export function LocaleSwitcher() {
  const router = useRouter()
  const currentLocale = useLocale()

  const switchLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`rounded-lg px-2 py-1 text-xs font-extrabold uppercase tracking-wide transition-all ${
            currentLocale === code
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
          }`}
          title={`${flag} ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
