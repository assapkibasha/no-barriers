'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ForgotPasswordPage() {
  const t = useTranslations('pages.forgotPassword')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO(backend phase): POST to /api/auth/forgot-password once the email
    // service exists. Until then we only show the confirmation state.
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    setSent(true)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper p-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-10 shadow-sm">
        <div className="mb-8 flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="NoBarriers"
            className="h-9 w-9 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <span className="font-display text-xl font-extrabold tracking-tight text-brand">NoBarriers</span>
        </div>

        {sent ? (
          <div role="status">
            <h1 className="text-2xl font-extrabold text-ink">{t('checkInbox')}</h1>
            <p className="mt-3 text-sm text-ink-soft">{t('sentMessage', { email })}</p>
            <Link
              href="/login"
              className="mt-8 block w-full rounded-full bg-brand py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-brand-hover"
            >
              {t('backToLogin')}
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-ink">{t('title')}</h1>
            <p className="mt-1.5 text-sm text-ink-soft">{t('subtitle')}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                  {t('email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-brand-hover active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? t('sending') : t('sendReset')}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-ink-soft">
              <Link href="/login" className="font-bold text-brand hover:underline">
                {t('backToLogin')}
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  )
}
