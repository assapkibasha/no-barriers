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
    <main className="launch-page" lang="en">
      <header className="launch-header">
        <a className="brand-lockup" href="/" aria-label="NoBarriers home">
          <span className="brand-badge"><img src="/images/logo.png" alt="" className="brand-mark" /></span>
          <span>NoBarriers</span>
        </a>
        <span className="header-note">A new chapter is taking shape</span>
      </header>

      <a className="launch-old-site-cta" href="/old-website">
        Continue To Our Old Website
        <span aria-hidden="true">↗</span>
      </a>

      <section className="launch-hero" aria-labelledby="launch-title">
        <div className="launch-copy">
          <p className="launch-eyebrow">A more accessible way to learn</p>
          <h1 id="launch-title">Good things take time to <em>grow.</em></h1>
          <p className="launch-message">
            We are rebuilding NoBarriers to make learning Rwandan Sign Language more accessible for everyone.
          </p>
          <p className="launch-date">Returning <strong>15 October 2026</strong></p>
        </div>

        <div className="launch-image-wrap">
          <img
            className="launch-image"
            src="/images/jesus-cutout.png"
            alt="Black and white hands forming a sign language gesture"
          />
        </div>
      </section>

      <section className="countdown-panel" aria-label="Countdown to launch">
        <div className="countdown-intro">
          <span className="countdown-kicker">Until we return</span>
          <span className="countdown-arrow" aria-hidden="true">↘</span>
        </div>
        <div className="countdown" role="timer" aria-live="polite" aria-label="Time remaining until launch">
          {countdownItems.map((item) => (
            <div className="countdown-unit" key={item.label}>
              <span className="countdown-value">{formatNumber(item.value)}</span>
              <span className="countdown-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="launch-footer">
        <a className="launch-guide-link" href="/rwandan-sign-language">Explore Rwandan Sign Language</a>
        <span>See you soon.</span>
      </footer>
    </main>
  )
}
