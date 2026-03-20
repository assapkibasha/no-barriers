import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool, { initDB } from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    await initDB()
    const { name, email, password } = await req.json()

    if (!name || !email || !password)
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    if (password.length < 6)
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })

    const passwordHash = await bcrypt.hash(password, 12)

    // Insert user
    const [result]: any = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    )
    const userId = result.insertId

    // Create blank progress row
    await pool.execute(
      `INSERT INTO user_progress (user_id, completed_lessons, perfect_lessons, badges, weak_signs)
       VALUES (?, '[]', '[]', '[]', '[]')`,
      [userId]
    )

    const token = await signToken({ userId, email, name })

    const res = NextResponse.json({ ok: true, user: { id: userId, name, email } })
    res.cookies.set('nb_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY')
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
    console.error('[register]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
