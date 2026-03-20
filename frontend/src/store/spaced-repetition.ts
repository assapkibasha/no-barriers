'use client'

import { useEffect, useState } from 'react'

// Track which sign IDs were answered wrong, with a count
const WEAK_KEY = 'nb_weak_signs'

export interface WeakSign {
  signId: string
  unitId: string
  wrongCount: number
  lastWrong: number // timestamp
}

export function recordWrongAnswer(signId: string, unitId: string): void {
  if (typeof window === 'undefined') return
  const data = getWeakSigns()
  const existing = data.find((w) => w.signId === signId)
  if (existing) {
    existing.wrongCount += 1
    existing.lastWrong = Date.now()
  } else {
    data.push({ signId, unitId, wrongCount: 1, lastWrong: Date.now() })
  }
  localStorage.setItem(WEAK_KEY, JSON.stringify(data))
}

export function getWeakSigns(): WeakSign[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(WEAK_KEY) ?? '[]')
  } catch {
    return []
  }
}

// Returns the top N sign IDs most worth reviewing
export function getReviewSignIds(n = 8): string[] {
  return getWeakSigns()
    .sort((a, b) => b.wrongCount - a.wrongCount || b.lastWrong - a.lastWrong)
    .slice(0, n)
    .map((w) => w.signId)
}

export function clearWeakSign(signId: string): void {
  if (typeof window === 'undefined') return
  const data = getWeakSigns().filter((w) => w.signId !== signId)
  localStorage.setItem(WEAK_KEY, JSON.stringify(data))
}
