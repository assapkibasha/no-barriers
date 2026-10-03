'use client'

import { useTranslations } from 'next-intl'

export function Spinner() {
  return <span aria-hidden="true" className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
}

export default function LoadingIndicator() {
  const t = useTranslations('feedback')
  return <div role="status" className="flex min-h-[60vh] items-center justify-center gap-3 bg-paper p-6 font-semibold text-brand"><Spinner />{t('loading')}</div>
}
