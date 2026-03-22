export const locales = ['en', 'fr', 'rw', 'pt', 'es', 'it', 'de', 'ja', 'ko', 'zh', 'ar', 'sw'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const cookieName = 'NEXT_LOCALE'
