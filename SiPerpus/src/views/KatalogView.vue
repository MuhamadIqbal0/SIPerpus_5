```vue
<!-- src/views/KatalogView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
    <div class="container mx-auto px-4 py-8 max-w-7xl">

      <!-- HEADER -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-2">
          <Badge variant="outline" class="gap-1.5">
            <BookOpen class="h-3 w-3" />
            Katalog Buku
          </Badge>
        </div>

        <h1 class="text-4xl font-extrabold tracking-tight mb-2">
          Jelajahi Koleksi Buku
        </h1>

        <p class="text-muted-foreground">{{ infoHasil }}</p>
      </div>

      <!-- TOOLBAR -->
      <div class="bg-card border rounded-xl p-4 mb-8 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">

          <!-- SEARCH -->
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                
            <Input
              v-model.trim="filter.search"
              v-focus
              placeholder="Cari judul atau penulis..."
              class="pl-10"
            />

            <button
              v-if="filter.search"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              @click="filter.search = ''"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- KATEGORI -->
          <select
            v-model="filter.kategori"
            class="w-full lg:w-[220px] border rounded px-3 py-2"
          >
            <option value="">Semua Kategori</option>
            <option
              v-for="kat in daftarKategori"
              :key="kat"
              :value="kat"
            >
              {{ kat }}
            </option>
          </select>

          <!-- STATUS -->
          <div class="inline-flex items-center gap-1 bg-muted p-1 rounded-lg">
            <button
              v-for="s in statusOptions"
              :key="s.value"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-md',
                filter.status === s.value
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
              @click="filter.status = s.value"
            >
              {{ s.label }}
            </button>
          </div>

          <!-- ADVANCED FILTER -->
          <Button
            variant="outline"
            size="sm"
            class="gap-2"
            @click="showAdvanced = !showAdvanced"
          >
            <SlidersHorizontal class="h-4 w-4" />
            {{ showAdvanced ? 'Sembunyikan' : 'Filter' }}
          </Button>
        </div>

        <!-- ADVANCED PANEL -->
        <div
          v-show="showAdvanced"
          class="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label class="text-sm">Tahun dari</label>
            <Input v-model.number="filter.tahunDari" type="number" />
          </div>

          <div>
            <label class="text-sm">Tahun sampai</label>
            <Input v-model.number="filter.tahunSampai" type="number" />
          </div>
        </div>
      </div>

      <!-- LIST -->
      <DataList
        :items="bukuTerfilter"
        :is-loading="isLoading"
        grid-class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template #default="{ item: buku }">
          <KartuBuku
            :buku="buku"
            @lihat-detail="goToDetail"
            @pinjam="handlePinjam"
          />
        </template>

        <template #empty>
          <div class="col-span-full text-center py-16">
            <BookX class="h-16 w-16 mx-auto mb-4" />
            <p class="text-lg font-medium">Tidak ada buku ditemukan</p>
            <p class="text-muted-foreground mb-4">
              Coba ubah filter
            </p>

            <Button variant="outline" @click="resetFilter">
              <RotateCcw class="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </template>
      </DataList>

<DataList :items="bukuTerfilter" :is-loading="isLoading">
 <template #default="{ item: buku }">
 <KartuBuku
 :buku="buku"
 :show-actions="isLoggedIn"
 @lihat-detail="goToDetail"
 @pinjam="handlePinjam"
 @tambah-wishlist="handleWishlist"
 />
 </template>
 </DataList>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBukuStore } from '@/stores/buku'
import { vFocus } from '@/directives/vFocus'

import DataList from '@/components/ui/DataList.vue'
import KartuBuku from '@/components/buku/KartuBuku.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  BookOpen,
  BookX,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
} from 'lucide-vue-next'

const router = useRouter()
const bukuStore = useBukuStore()

// STATE DARI STORE
const {
  bukuTerfilter,
  daftarKategori,
  isLoading,
  filter,
} = storeToRefs(bukuStore)

const {
  ambilSemuaBuku,
  pinjamBuku,
  resetFilter,
} = bukuStore

// UI STATE
const showAdvanced = ref(false)

const statusOptions = [
  { label: 'Semua', value: 'semua' },
  { label: 'Tersedia', value: 'tersedia' },
  { label: 'Dipinjam', value: 'dipinjam' },
]

// INFO
const infoHasil = computed(() => {
  const total = bukuStore.daftarBuku.length
  const terfilter = bukuTerfilter.value.length

  if (filter.value.search || filter.value.kategori || filter.value.status !== 'semua') {
    return `Menampilkan ${terfilter} dari ${total} buku`
  }
  return `Total ${total} buku`
})

// ACTION
function goToDetail(buku) {
  router.push({ name: 'detail-buku', params: { id: buku.id } })
}

function handlePinjam(id) {
  pinjamBuku(id)
}

// INIT
onMounted(() => {
  if (bukuStore.daftarBuku.length === 0) {
    ambilSemuaBuku()
  }
})
</script>
```
