import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool, { initDB } from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    await initDB()
    const { email, password } = await req.json()

    if (!email || !password)
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

    const [rows]: any = await pool.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?',
      [email]
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
    return NextResponse.json({ error: err.message || 'Server error.' }, { status: 500 })
  }
}
