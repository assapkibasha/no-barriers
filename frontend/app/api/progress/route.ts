import { NextResponse, type NextRequest } from 'next/server'
import pool, { initDB } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('nb_token')?.value
  if (!token) return null
  return await verifyToken(token)
}

function safeParse(val: any): any[] {
  if (!val) return []
  if (typeof val === 'string') {
    try { return JSON.parse(val) } catch { return [] }
  }
  if (Array.isArray(val)) return val
  return []
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await initDB()
    const [rows]: any = await pool.execute(
      'SELECT * FROM user_progress WHERE user_id = ?',
      [user.userId]
    )
    const row = rows[0]
    if (!row) return NextResponse.json({ error: 'No progress found' }, { status: 404 })

    // Format dates to YYYY-MM-DD so frontend comparisons (=== today()) work
    const formatDate = (d: any) => {
      if (!d) return null
      try {
        const date = new Date(d)
        // ensure we grab the local YYYY-MM-DD, or ISO YYYY-MM-DD
        return date.toISOString().split('T')[0]
      } catch {
        return null
      }
    }

    return NextResponse.json({
      user: { id: user.userId, name: user.name, email: user.email },
      xp: row.xp,
      streak: row.streak,
      hearts: row.hearts,
      lastActivity: formatDate(row.last_activity),
      heartsLastRefill: formatDate(row.hearts_last_refill),
      completedLessons: safeParse(row.completed_lessons),
      perfectLessons: safeParse(row.perfect_lessons),
      badges: safeParse(row.badges),
      weakSigns: safeParse(row.weak_signs),
    })
  } catch (error: any) {
    console.error('Progress GET error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await initDB()
    const body = await req.json()

    await pool.execute(
      `UPDATE user_progress SET
        xp = ?,
        streak = ?,
        last_activity = ?,
        hearts = ?,
        hearts_last_refill = ?,
        completed_lessons = ?,
        perfect_lessons = ?,
        badges = ?,
        weak_signs = ?
      WHERE user_id = ?`,
      [
        body.xp ?? 0,
        body.streak ?? 0,
        body.lastActivity ?? null,
        body.hearts ?? 5,
        body.heartsLastRefill ?? null,
        JSON.stringify(body.completedLessons ?? []),
        JSON.stringify(body.perfectLessons ?? []),
        JSON.stringify(body.badges ?? []),
        JSON.stringify(body.weakSigns ?? []),
        user.userId,
      ]
    )

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Progress POST error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

