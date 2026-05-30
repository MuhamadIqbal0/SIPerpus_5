// backend/src/config/database.js

const mysql = require('mysql2/promise')

// Connection pool: lebih efisien dari koneksi tunggal
// Pool mengelola sekumpulan koneksi yang bisa dipakai ulang
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'siperpus',

  waitForConnections: true,
  connectionLimit: 10, // Maksimal 10 koneksi bersamaan
  queueLimit: 0, // Antrian tidak terbatas
  timezone: '+07:00', // WIB
})

// Test koneksi saat aplikasi pertama berjalan
pool
  .getConnection()
  .then((conn) => {
    console.log('✅ Terhubung ke database MariaDB')

    // Kembalikan koneksi ke pool
    conn.release()
  })
  .catch((err) => {
    console.error(
      '❌ Gagal terhubung ke database:',
      err.message
    )

    // Hentikan server jika DB tidak tersedia
    process.exit(1)
  })

module.exports = pool