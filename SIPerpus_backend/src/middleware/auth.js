// backend/src/middleware/auth.js

const jwt = require('jsonwebtoken')
const pool = require('../config/database')
const { createError } = require('./errorHandler')

// Middleware: verifikasi JWT token dari header Authorization
async function protect(req, res, next) {
  try {
    // Ambil token dari header:
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ')
    ) {
      throw createError(
        401,
        'Akses ditolak: token tidak ditemukan'
      )
    }

    const token = authHeader.split(' ')[1]

    // Verifikasi dan decode token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // Ambil data user terbaru dari database
    const [rows] = await pool.execute(
      `
        SELECT
          id,
          nama,
          email,
          role,
          aktif
        FROM users
        WHERE id = ?
      `,
      [decoded.id]
    )

    if (rows.length === 0 || !rows[0].aktif) {
      throw createError(
        401,
        'User tidak ditemukan atau tidak aktif'
      )
    }

    // Tambahkan data user ke object request
    // Bisa diakses di controller: req.user
    req.user = rows[0]

    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(
        createError(401, 'Token tidak valid')
      )
    }

    if (err.name === 'TokenExpiredError') {
      return next(
        createError(
          401,
          'Token sudah kedaluwarsa, silakan login ulang'
        )
      )
    }

    next(err)
  }
}

// Middleware: cek role pustakawan
function requirePustakawan(req, res, next) {
  if (req.user?.role !== 'pustakawan') {
    return next(
      createError(
        403,
        'Akses ditolak: hanya untuk pustakawan'
      )
    )
  }

  next()
}

module.exports = {
  protect,
  requirePustakawan,
}