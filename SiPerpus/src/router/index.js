// src/router/index.js — konfigurasi lengkap SiPerpus
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = createRouter({
 // createWebHistory: URL bersih tanpa '#' (butuh server config saat deploy)
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
 // ── HALAMAN PUBLIK ──────────────────────────────────────
 {
 path: '/',
 name: 'home',
 // Lazy loading: komponen dimuat hanya saat halaman dikunjungi(optimasi!)
 component: () => import('@/views/HomeView.vue'),
 meta: { title: 'Beranda' }
 },
 {
 path: '/katalog',
 name: 'katalog',
 component: () => import('@/views/KatalogView.vue'),
 meta: { title: 'Katalog Buku' }
 },
 {
 // Route DINAMIS: :id adalah parameter yang bisa berubah
 // /katalog/1 -> params.id = '1'
 // /katalog/42 -> params.id = '42'
 path: '/katalog/:id',
 name: 'detail-buku',
 component: () => import('@/views/DetailBukuView.vue'),
 meta: { title: 'Detail Buku' }
 },
 {
 path: '/login',
 name: 'login',
 component: () => import('@/views/LoginView.vue'),
 meta: { title: 'Login', requiresGuest: true }
 },
 // ── DASHBOARD (NESTED ROUTES) ───────────────────────────
 {
 path: '/dashboard',
 // Layout komponen: merender <RouterView /> di dalamnya
 component: () => import('@/layouts/DashboardLayout.vue'),
 meta: { requiresAuth: true, role: 'pustakawan' },
 children: [
 {
 path: '', // /dashboard (tanpa trailing slash)
 name: 'dashboard',
 component: () => import('@/views/dashboard/DashboardHomeView.vue'),
 meta: { title: 'Dashboard' }
 },
 {
 path: 'buku', // /dashboard/buku
 name: 'kelola-buku',
 component: () => import('@/views/dashboard/KelolaBukuView.vue'),
 meta: { title: 'Kelola Buku' }
 },
 {
 path: 'buku/tambah',
 name: 'tambah-buku',
 component: () => import('@/views/dashboard/TambahBukuView.vue'),
 meta: { title: 'Tambah Buku' }
 },
 {
 path: 'buku/:id/edit',
 name: 'edit-buku',
 component: () => import('@/views/dashboard/EditBukuView.vue'),
 meta: { title: 'Edit Buku' }
 },
 {
 path: 'anggota',
 name: 'kelola-anggota',
 component: () => import('@/views/dashboard/KelolaAnggotaView.vue'),
 meta: { title: 'Kelola Anggota' }
 },
 {
 path: 'peminjaman',
 name: 'peminjaman',
 component: () => import('@/views/dashboard/PeminjamanView.vue'),
 meta: { title: 'Peminjaman' }
 },
 {
 path: 'laporan',
 name: 'laporan',
 component: () => import('@/views/dashboard/LaporanView.vue'),
 meta: { title: 'Laporan' }
 },
 ]
 },
 // ── PROFIL ANGGOTA ──────────────────────────────────────
 {
  path: '/profil',
 name: 'profil',
 component: () => import('@/views/ProfilView.vue'),
 meta: { title: 'Profil Saya', requiresAuth: true }
 },
 // ── CATCH-ALL 404 ───────────────────────────────────────
 {
 path: '/:pathMatch(.*)*',
 name: 'not-found',
 component: () => import('@/views/NotFoundView.vue'),
 meta: { title: 'Halaman Tidak Ditemukan' }
 },
 ],
 // Scroll ke atas setiap navigasi halaman
 scrollBehavior(to, from, savedPosition) {
 if (savedPosition) return savedPosition
 return { top: 0, behavior: 'smooth' }
 },
})
export default router
