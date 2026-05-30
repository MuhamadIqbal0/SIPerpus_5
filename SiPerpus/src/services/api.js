// frontend/src/services/api.js
// Axios instance terkonfigurasi

import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

// Buat Axios instance dengan konfigurasi dasar
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── REQUEST INTERCEPTOR ──────────────────────────────────
// Dijalankan sebelum setiap request dikirim
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()

    // Lampirkan JWT token ke setiap request jika tersedia
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ── RESPONSE INTERCEPTOR ─────────────────────────────────
// Dijalankan setelah setiap response diterima
api.interceptors.response.use(
  // Response sukses: langsung kembalikan
  (response) => response,

  // Response error: tangani secara terpusat
  (error) => {
    const { response } = error

    if (response?.status === 401) {
      // Token tidak valid atau kedaluwarsa
      // Logout dan redirect ke login
      const authStore = useAuthStore()

      authStore.logout()

      router.push({ name: 'login' })
    }

    if (response?.status === 403) {
      // Tidak punya izin akses
      router.push({ name: 'home' })
    }

    if (!response) {
      // Network error (server tidak bisa dijangkau)
      error.message =
        'Tidak dapat terhubung ke server. Periksa koneksi internet.'
    }

    return Promise.reject(error)
  }
)

export default api
