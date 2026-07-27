import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false' }
    : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
})

let initialized = false

/** Run once on first request – idempotent. */
export async function initDB() {
  if (initialized) return
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      name          VARCHAR(255) NOT NULL,
      email         VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id                 INT AUTO_INCREMENT PRIMARY KEY,
      user_id            INT NOT NULL UNIQUE,
      xp                 INT DEFAULT 0,
      streak             INT DEFAULT 0,
      last_activity      DATE,
      hearts             INT DEFAULT 5,
      hearts_last_refill DATE,
      xp_today           INT DEFAULT 0,
      xp_today_date      DATE,
      completed_lessons  JSON,
      perfect_lessons    JSON,
      badges             JSON,
      weak_signs         JSON,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)
  // CREATE TABLE IF NOT EXISTS never alters an existing table, so columns
  // added after launch must be backfilled explicitly.
  const [cols]: any = await pool.execute(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'user_progress'
       AND COLUMN_NAME = 'xp_today'`
  )
  if (cols.length === 0) {
    await pool.execute(
      `ALTER TABLE user_progress
       ADD COLUMN xp_today INT DEFAULT 0,
       ADD COLUMN xp_today_date DATE`
    )
  }
  initialized = true
}

export default pool
