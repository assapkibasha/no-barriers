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
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-xl font-extrabold text-white shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-base font-extrabold text-gray-800">{user.name}</p>
            <p className="text-xs font-semibold text-teal-600">Student</p>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="flex items-center justify-around rounded-2xl border border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-1.5 font-bold text-orange-500">
          🔥 <span>{streak}</span>
        </div>
        <div className="h-5 w-px bg-gray-200" />
        <div className="flex items-center gap-1.5 font-bold text-yellow-500">
          ⚡ <span>{xp}</span>
        </div>
        <div className="h-5 w-px bg-gray-200" />
        <div className="flex items-center gap-1.5 font-bold text-red-400">
          <span>❤️</span> <span>{hearts}</span>
        </div>
      </div>

      {/* Daily Quest */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-800">Daily Quest</h3>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">+50 XP</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700">Earn 50 XP today</p>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all" style={{ width: `${dailyPct}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-400">{dailyXP} / 50 XP</p>
          </div>
        </div>
      </div>

      {/* Level */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-800">Your Level</h3>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">{level.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${Math.min(100, Math.round((xp / level.next) * 100))}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-400">{xp} / {level.next} XP</p>
          </div>
        </div>
      </div>

      {/* Hearts warning */}
      {hearts <= 2 && (
        <div className={`rounded-2xl border-2 p-4 ${hearts === 0 ? 'border-red-300 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
          <p className={`text-sm font-bold ${hearts === 0 ? 'text-red-700' : 'text-orange-700'}`}>
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
        <div className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-5">
          <h3 className="font-extrabold text-purple-800 mb-1">Signs to Review</h3>
          <p className="text-xs text-purple-500 mb-3">{reviewCount} sign{reviewCount !== 1 ? 's' : ''} need practice</p>
          <Link href="/review" className="block w-full rounded-xl bg-purple-600 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-white hover:bg-purple-700 transition">
            🔁 Start Review
          </Link>
        </div>
      )}

      {/* Profile CTA if new */}
      {xp === 0 && completedLessons.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="font-extrabold text-gray-800 mb-1">Save your progress!</h3>
          <p className="text-xs text-gray-500 mb-3">Create an account to sync across devices.</p>
          <Link href="/register" className="block w-full rounded-xl bg-teal-600 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-white hover:bg-teal-700 transition mb-2">
            CREATE ACCOUNT
          </Link>
          <Link href="/login" className="block w-full rounded-xl border-2 border-teal-200 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-teal-600 hover:bg-teal-50 transition">
            SIGN IN
          </Link>
        </div>
      )}

    </aside>
  )
}
