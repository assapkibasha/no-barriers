'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

function RegisterForm() {
  const t = useTranslations('pages.register')
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError(t('passwordsNoMatch')); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Registration failed.'); return }
      window.location.href = '/learn'
    } catch {
      setError(t('networkError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-sm">

        {/* ── Left: Form ── */}
        <div className="flex w-full flex-col justify-center px-10 py-12 md:w-1/2">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="NoBarriers"
              className="h-9 w-9 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span className="font-display text-xl font-extrabold tracking-tight text-brand">NoBarriers</span>
          </div>

          <h1 className="text-3xl font-extrabold text-ink">{t('createAccount')}</h1>
          <p className="mt-1.5 text-sm text-ink-soft">{t('subtitle')}</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
                {t('fullName')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                {t('emailAddress')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 pr-11 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft/70 hover:text-brand"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-sm font-semibold text-ink">
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 pr-11 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft/70 hover:text-brand"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-heart/25 bg-heart-soft px-4 py-2.5 text-sm font-semibold text-heart">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-brand py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-brand-hover active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? t('creatingAccount') : t('createAccountBtn')}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-ink-soft">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="font-bold text-brand hover:underline">
              {t('logInHere')}
            </Link>
          </p>
        </div>

        {/* ── Right: Image panel ── */}
        <div className="hidden flex-col items-center justify-center bg-brand-soft px-10 py-14 md:flex md:w-1/2">
          <img
            src="/images/images/login and register image.png"
            alt="Learning illustration"
            className="w-full max-w-sm object-contain drop-shadow-xl"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
          />
          <h2 className="mt-8 text-center text-2xl font-extrabold text-ink">
            {t('panelHeadline').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="mt-3 max-w-xs text-center text-sm text-ink-soft">
            {t('panelSubtitle')}
          </p>
        </div>

      </div>
    </main>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center p-8 text-gray-400">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}
