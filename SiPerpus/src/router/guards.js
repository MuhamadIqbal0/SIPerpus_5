// src/router/guards.js — pisahkan guards dari konfigurasi route
import { useAuthStore } from '@/stores/auth'
export function setupGuards(router) {
 // beforeEach: dijalankan sebelum SETIAP navigasi
 router.beforeEach((to, from, next) => {
 // Update title tab browser
 document.title = to.meta.title
 ? `${to.meta.title} — SiPerpus`
 : 'SiPerpus'
 const auth = useAuthStore()
 // SKENARIO 1: Halaman butuh autentikasi dan user belum login
 if (to.meta.requiresAuth && !auth.isLoggedIn) {
 // Simpan URL tujuan agar bisa redirect setelah login
 next({
 name: 'login',
 query: { redirect: to.fullPath }
 })
 return
 }
 // SKENARIO 2: Halaman hanya untuk tamu, user sudah login
 if (to.meta.requiresGuest && auth.isLoggedIn) {
 next({ name: 'home' })
 return
 }
 // SKENARIO 3: Halaman butuh role pustakawan
 if (to.meta.role === 'pustakawan' && !auth.isPustakawan) {
 next({ name: 'home' })
 return
 }
 // Lanjutkan navigasi normal
 next()
 })
 // afterEach: dijalankan setelah navigasi selesai
 router.afterEach((to) => {
 // Contoh: tracking analytics
 console.log(`[Router] Navigasi ke: ${to.fullPath}`)
 })
}
// Di src/main.js, tambahkan:
// import { setupGuards } from '@/router/guards'
// const router = createRouter(...)
// setupGuards(router)
// app.use(router)
