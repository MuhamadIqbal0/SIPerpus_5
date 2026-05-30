// src/stores/buku.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { bukuService } from '@/services/bukuService'

export const useBukuStore = defineStore('buku', () => {
 // ── STATE ────────────────────────────────────────────────
 const daftarBuku = ref([]) // Array semua buku
 const bukuTerpilih = ref(null) // Buku yang sedang dilihat detailnya
 const isLoading = ref(false) // Status loading
 const error = ref(null) // Pesan error
 const filter = ref({ // State filter aktif
 search: '',
 kategori: '',
 status: 'semua', // 'semua' | 'tersedia' | 'dipinjam'
 })
 const pagination = ref({
 page: 1,
 perPage: 12,
 total: 0,
 })
 // ── GETTERS ──────────────────────────────────────────────
 const bukuTersedia = computed(() =>
 daftarBuku.value.filter(b => b.tersedia)
 )
 const bukuDipinjam = computed(() =>
 daftarBuku.value.filter(b => !b.tersedia)
 )
 // Filter gabungan berdasarkan state filter
 const bukuTerfilter = computed(() => {
 let hasil = [...daftarBuku.value]
 // Filter pencarian
 if (filter.value.search) {
 const q = filter.value.search.toLowerCase()
 hasil = hasil.filter(b =>
 b.judul.toLowerCase().includes(q) ||
 b.penulis.toLowerCase().includes(q) ||
 b.isbn?.includes(q)
 )
 }
 // Filter kategori
 if (filter.value.kategori) {
 hasil = hasil.filter(b => b.kategori === filter.value.kategori)
 }
 // Filter status
 if (filter.value.status === 'tersedia') {
 hasil = hasil.filter(b => b.tersedia)
 } else if (filter.value.status === 'dipinjam') {
 hasil = hasil.filter(b => !b.tersedia)
 }
 return hasil
 })
 const statistik = computed(() => ({
 total: daftarBuku.value.length,
 tersedia: bukuTersedia.value.length,
 dipinjam: bukuDipinjam.value.length,
 persen: daftarBuku.value.length > 0
 ? Math.round(bukuTersedia.value.length / daftarBuku.value.length * 100)
 : 0,
 }))
 const daftarKategori = computed(() =>
 [...new Set(daftarBuku.value.map(b => b.kategori))].sort()
 )
 // ── ACTIONS ──────────────────────────────────────────────
  async function ambilSemuaBuku() {
    isLoading.value = true
    error.value = null

    try {
      const result = await bukuService.getAll({
        search: filter.value.search,
        kategori: filter.value.kategori,
        status: filter.value.status === 'semua' ? '' : filter.value.status,
        page: pagination.value.page,
        limit: pagination.value.perPage
      })

      daftarBuku.value = result.data.items
      pagination.value.total = result.data.pagination.total

    } catch (e) {
      error.value =
        e.response?.data?.message ||
        e.message ||
        'Gagal memuat data'
    } finally {
      isLoading.value = false
    }
  }

  // TAMBAH BUKU
  async function tambahBuku(data) {
    const result = await bukuService.create(data)
    daftarBuku.value.unshift(result.data)
    return result.data
  }

  // HAPUS BUKU
  async function hapusBuku(id) {
    await bukuService.remove(id)
    daftarBuku.value = daftarBuku.value.filter(b => b.id !== id)
  }

  return {
    daftarBuku,
    isLoading,
    error,
    filter,
    pagination,
    ambilSemuaBuku,
    tambahBuku,
    hapusBuku
  }
})
