'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

export function useLogout() {
  const t = useTranslations('pages.login')
  const [loggingOut, setLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const busy = useRef(false)
  const handleLogout = async () => {
    if (busy.current) return
    busy.current = true
    setLoggingOut(true)
    setLogoutError('')
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST', signal: AbortSignal.timeout(15000) })
      if (!response.ok) throw new Error('Logout failed')
      window.location.href = '/login'
    } catch {
      setLogoutError(t('networkError'))
      setLoggingOut(false)
      busy.current = false
    }
  }
  return { loggingOut, logoutError, handleLogout }
}
