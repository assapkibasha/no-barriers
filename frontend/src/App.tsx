'use client'

import { useEffect, useState } from 'react'

// Update this one date when the real launch date is confirmed.
const LAUNCH_DATE = new Date('2026-10-15T00:00:00+02:00')

type RemainingTime = { days: number; hours: number; minutes: number; seconds: number }

function getRemainingTime(): RemainingTime {
  const difference = Math.max(0, LAUNCH_DATE.getTime() - Date.now())
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function formatNumber(value: number) {
  return value.toString().padStart(2, '0')
}

export default function App() {
  const [remaining, setRemaining] = useState<RemainingTime>({ days: 14, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => setRemaining(getRemainingTime())
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const countdownItems = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ]

  return (
    <main className="launch-page">
      <div className="launch-glow launch-glow-one" aria-hidden="true" />
      <div className="launch-glow launch-glow-two" aria-hidden="true" />
      <div className="launch-grid" aria-hidden="true" />

      <header className="launch-header">
        <a className="brand-lockup" href="/" aria-label="NoBarriers home">
          <img src="/images/logo.png" alt="" className="brand-mark" />
          <span>NoBarriers</span>
        </a>
        <span className="header-status"><i aria-hidden="true" /> New chapter loading</span>
      </header>

      <section className="launch-content" aria-labelledby="launch-title">
        <p className="launch-eyebrow">We are making room for what is next</p>
        <h1 id="launch-title">Good things take time to <em>grow.</em></h1>
        <p className="launch-message">
          We are taking a short pause to make NoBarriers even better. We will be back soon with something worth the wait.
        </p>

        <div className="countdown" role="timer" aria-live="polite" aria-label="Time remaining until launch">
          {countdownItems.map((item) => (
            <div className="countdown-unit" key={item.label}>
              <span className="countdown-value">{formatNumber(item.value)}</span>
              <span className="countdown-label">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="launch-date">We launch <span>15 October 2026</span></p>
      </section>

      <footer className="launch-footer">
        <span>Keep learning. Keep becoming.</span>
        <span className="footer-rule" aria-hidden="true" />
        <span>See you on the other side.</span>
      </footer>
    </main>
  )
}
