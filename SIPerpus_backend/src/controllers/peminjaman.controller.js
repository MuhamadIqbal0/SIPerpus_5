// backend/src/controllers/peminjaman.controller.js

const pool = require('../config/database')

const { createError } = require('../middleware/errorHandler')

// POST /api/peminjaman
// Buat peminjaman baru
async function pinjamBuku(req, res, next) {
  const conn = await pool.getConnection()

  await conn.beginTransaction()

  try {
    const { buku_id } = req.body

    // dari JWT payload
    const anggota_id = req.user.anggotaId

    // 1. Cek buku tersedia
    const [[buku]] = await conn.execute(
      `
        SELECT
          id,
          judul,
          tersedia
        FROM buku
        WHERE id = ?
        FOR UPDATE
      `,
      [buku_id]
    )

    if (!buku) {
      throw createError(
        404,
        'Buku tidak ditemukan'
      )
    }

    if (buku.tersedia <= 0) {
      throw createError(
        400,
        'Buku tidak tersedia'
      )
    }

    // 2. Cek anggota tidak punya peminjaman aktif
    // untuk buku yang sama
    const [[existing]] = await conn.execute(
      `
        SELECT id
        FROM peminjaman
        WHERE anggota_id = ?
        AND buku_id = ?
        AND status = 'aktif'
      `,
      [anggota_id, buku_id]
    )

    if (existing) {
      throw createError(
        400,
        'Anda sudah meminjam buku ini'
      )
    }

    // 3. Hitung tanggal kembali
    // (14 hari dari sekarang)
    const tanggalKembali = new Date()

    tanggalKembali.setDate(
      tanggalKembali.getDate() + 14
    )

    // 4. Insert peminjaman
    const [result] = await conn.execute(
      `
        INSERT INTO peminjaman (
          anggota_id,
          buku_id,
          tanggal_kembali
        )
        VALUES (?, ?, ?)
      `,
      [
        anggota_id,
        buku_id,
        tanggalKembali
          .toISOString()
          .split('T')[0],
      ]
    )

    // 5. Kurangi stok tersedia buku
    await conn.execute(
      `
        UPDATE buku
        SET tersedia = tersedia - 1
        WHERE id = ?
      `,
      [buku_id]
    )

    await conn.commit()

    conn.release()

    res.status(201).json({
      success: true,
      message: `Buku '${buku.judul}' berhasil dipinjam`,

      data: {
        peminjamanId: result.insertId,
        tanggalKembali,
      },
    })
  } catch (err) {
    await conn.rollback()

    conn.release()

    next(err)
  }
}

// PATCH /api/peminjaman/:id/kembalikan
async function kembalikanBuku(
  req,
  res,
  next
) {
  const conn = await pool.getConnection()

  await conn.beginTransaction()

  try {
    const [[peminjaman]] = await conn.execute(
      `
        SELECT
          p.*,
          b.judul
        FROM peminjaman p
        JOIN buku b
          ON p.buku_id = b.id
        WHERE p.id = ?
        AND p.status = 'aktif'
      `,
      [req.params.id]
    )

    if (!peminjaman) {
      throw createError(
        404,
        'Data peminjaman tidak ditemukan'
      )
    }

    // Hitung denda jika terlambat
    // Rp 1.000 / hari
    const today = new Date()

    const batas = new Date(
      peminjaman.tanggal_kembali
    )

    const terlambat = Math.max(
      0,
      Math.ceil(
        (today - batas) /
          (1000 * 60 * 60 * 24)
      )
    )

    const denda = terlambat * 1000

    // Update status peminjaman
    await conn.execute(
      `
        UPDATE peminjaman
        SET
          status = 'selesai',
          tanggal_dikembalikan = CURDATE(),
          denda = ?
        WHERE id = ?
      `,
      [denda, req.params.id]
    )

    // Tambah kembali stok tersedia
    await conn.execute(
      `
        UPDATE buku
        SET tersedia = tersedia + 1
        WHERE id = ?
      `,
      [peminjaman.buku_id]
    )

    await conn.commit()

    conn.release()

    res.json({
      success: true,
      message: 'Buku berhasil dikembalikan',

      data: {
        terlambatHari: terlambat,
        denda,
      },
    })
  } catch (err) {
    await conn.rollback()

    conn.release()

    next(err)
  }
}

module.exports = {
  pinjamBuku,
  kembalikanBuku,

  // ...getAll, getRiwayat
}