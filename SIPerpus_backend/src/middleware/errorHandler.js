// backend/src/middleware/errorHandler.js

// Middleware error harus memiliki 4 parameter:
// (err, req, res, next)
function errorHandler(err, req, res, next) {
  // Log error ke konsol
  // (di production, kirim ke logging service)
  console.error(
    `[ERROR] ${req.method} ${req.path}:`,
    err.message
  )

  // Tentukan status code
  const statusCode =
    err.statusCode || err.status || 500

  // Format response error yang konsisten
  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      'Terjadi kesalahan pada server',

    // Hanya tampilkan detail error di development
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  })
}

// ── Helper untuk membuat error dengan status code ──
// Gunakan di controller:
// throw createError(404, 'Buku tidak ditemukan')

function createError(statusCode, message) {
  const err = new Error(message)

  err.statusCode = statusCode

  return err
}

module.exports = errorHandler
module.exports.createError = createError