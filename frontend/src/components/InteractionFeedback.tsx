'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useProgress } from '../store/progress-context'
import { Spinner } from './LoadingIndicator'

export default function InteractionFeedback() {
  const pathname = usePathname()
  const t = useTranslations('feedback')
  const [destination, setDestination] = useState<string | null>(null)
  const [slow, setSlow] = useState(false)
  const { loading, saving, saveError, loadError, retrySave, refetch } = useProgress()
  const learnerPage = /^\/(learn|lesson|study|review|profile)(\/|$)/.test(pathname)

  useEffect(() => { setDestination(null); setSlow(false) }, [pathname])
  useEffect(() => {
    function clicked(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element)?.closest('a[href]') as HTMLAnchorElement | null
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.getAttribute('aria-disabled') === 'true') return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      setSlow(false)
      setDestination(url.pathname)
    }
    document.addEventListener('click', clicked, true)
    return () => document.removeEventListener('click', clicked, true)
  }, [])
  useEffect(() => {
    if (!destination) return
    const timer = window.setTimeout(() => setSlow(true), 15000)
    return () => window.clearTimeout(timer)
  }, [destination])

  return <>
    {destination && <div role="status" className="fixed inset-x-0 top-0 z-[100] flex min-h-11 items-center justify-center gap-3 bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm">
      <Spinner />{slow ? t('takingLonger') : t('opening')}
      {slow && <a href={destination} className="rounded px-3 py-1 underline focus-visible:outline focus-visible:outline-2">{t('retry')}</a>}
    </div>}
    {learnerPage && loading && <div role="status" className="fixed inset-0 z-[90] flex items-center justify-center gap-3 bg-paper font-semibold text-brand"><Spinner />{t('loadingProgress')}</div>}
    {learnerPage && !loading && (saving || saveError || loadError) && <div role={saveError || loadError ? 'alert' : 'status'} className="fixed bottom-24 left-1/2 z-[80] flex max-w-[calc(100%_-_2rem)] -translate-x-1/2 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm md:bottom-5">
      {saving ? <><Spinner />{t('saving')}</> : <>{t(loadError ? 'loadFailed' : 'saveFailed')}<button type="button" onClick={() => { if (loadError) void refetch(); else void retrySave() }} className="min-h-11 shrink-0 rounded-lg px-3 text-brand underline focus-visible:outline focus-visible:outline-2">{t('retry')}</button></>}
    </div>}
  </>
}
