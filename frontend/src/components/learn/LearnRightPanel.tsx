'use client'

import Link from 'next/link'
import { useProgress, getLevel } from '../../store/progress-context'

export default function LearnRightPanel() {
  const { progress, user } = useProgress()

  const { xp, streak, hearts, completedLessons, weakSigns } = progress
  const level = getLevel(xp)
  const dailyXP = Math.min(50, xp % 50)
  const dailyPct = Math.round((dailyXP / 50) * 100)
  const reviewCount = weakSigns?.length ?? 0

  return (
    <aside className="flex w-80 flex-shrink-0 flex-col gap-4">

      {/* User Profile Banner */}
      {user && (
        <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-xl font-extrabold text-white shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-base font-extrabold text-gray-800 dark:text-gray-100">{user.name}</p>
            <p className="text-xs font-semibold text-teal-600">Student</p>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="flex items-center justify-around px-2 py-2 mb-2">
        <div className="flex items-center gap-2 font-bold text-orange-500">
          🔥 <span className="text-gray-700 dark:text-gray-300">{streak}</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-teal-500">
          💎 <span className="text-gray-700 dark:text-gray-300">{xp}</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-red-500">
          ❤️ <span className="text-gray-700 dark:text-gray-300">{hearts}</span>
        </div>
      </div>

      {/* Daily Quest */}
      <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-800 dark:text-gray-100">Daily Quest</h3>
          <span className="rounded-full bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 text-xs font-bold text-teal-700 dark:text-teal-400">+50 XP</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Earn 50 XP today</p>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all" style={{ width: `${dailyPct}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{dailyXP} / 50 XP</p>
          </div>
        </div>
      </div>

      {/* Level */}
      <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-800 dark:text-gray-100">Your Level</h3>
          <span className="rounded-full bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 text-xs font-bold text-teal-700 dark:text-teal-400">{level.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${Math.min(100, Math.round((xp / level.next) * 100))}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{xp} / {level.next} XP</p>
          </div>
        </div>
      </div>

      {/* Hearts warning */}
      {hearts <= 2 && (
        <div className={`rounded-2xl border-2 p-4 ${hearts === 0 ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-transparent' : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-transparent'}`}>
          <p className={`text-sm font-bold ${hearts === 0 ? 'text-red-700 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'}`}>
            {hearts === 0 ? '💔 No hearts left! Come back tomorrow.' : `❤️ Only ${hearts} heart${hearts === 1 ? '' : 's'} remaining!`}
          </p>
          {hearts === 0 && (
            <Link href="/review" className="mt-2 block w-full rounded-xl bg-purple-600 py-2 text-center text-xs font-extrabold uppercase text-white hover:bg-purple-700 transition">
              Practice instead →
            </Link>
          )}
        </div>
      )}

      {/* Review weak signs */}
      {reviewCount > 0 && (
        <div className="rounded-2xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-transparent p-5">
          <h3 className="font-extrabold text-purple-800 dark:text-purple-300 mb-1">Signs to Review</h3>
          <p className="text-xs text-purple-500 dark:text-purple-400 mb-3">{reviewCount} sign{reviewCount !== 1 ? 's' : ''} need practice</p>
          <Link href="/review" className="block w-full rounded-xl bg-purple-600 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-white hover:bg-purple-700 transition">
            🔁 Start Review
          </Link>
        </div>
      )}

      {/* Footer Links */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 px-2 text-[10px] sm:text-xs font-bold uppercase text-gray-400 dark:text-gray-500">
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">About</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Blog</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Store</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Efficacy</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Careers</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Investors</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Terms</Link>
        <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">Privacy</Link>
      </div>
      <div className="h-4" /> {/* Bottom pad padding */}

    </aside>
  )
}
