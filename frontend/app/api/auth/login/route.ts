import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool, { initDB } from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password)
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

    await initDB()

    const [rows]: any = await pool.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?',
      [email.trim()]
    )
    const user = rows[0]

    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })

    const token = await signToken({ userId: user.id, email: user.email, name: user.name })

    const res = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } })
    res.cookies.set('nb_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch (err: any) {
    console.error('[login]', err)
    const unavailable = ['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET', 'PROTOCOL_CONNECTION_LOST'].includes(err?.code)
    return NextResponse.json({
      error: unavailable
        ? 'Sign-in is temporarily unavailable because we cannot connect to the database. Please try again later.'
        : 'Unable to sign in right now. Please try again later.',
    }, { status: unavailable ? 503 : 500 })
  }
}
