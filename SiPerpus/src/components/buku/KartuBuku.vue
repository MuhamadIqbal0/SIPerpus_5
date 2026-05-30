<template>
  <Card class="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">

    <!-- HEADER -->
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between gap-2">
        <CardTitle class="text-base leading-snug line-clamp-2">
          {{ buku.judul }}
        </CardTitle>

        <Badge
          :variant="buku.tersedia ? 'default' : 'destructive'"
          class="text-xs"
        >
          {{ buku.tersedia ? 'Tersedia' : 'Dipinjam' }}
        </Badge>
      </div>

      <CardDescription>{{ buku.penulis }}</CardDescription>
    </CardHeader>

    <!-- CONTENT -->
    <CardContent class="flex-1 pb-3">
      <div class="flex flex-wrap gap-1.5 mb-3">
        <Badge variant="secondary" class="text-xs">
          {{ buku.kategori }}
        </Badge>

        <Badge variant="outline" class="text-xs">
          {{ buku.tahun }}
        </Badge>
      </div>

      <p v-if="buku.sinopsis" class="text-sm text-muted-foreground line-clamp-3">
        {{ buku.sinopsis }}
      </p>

      <slot />
    </CardContent>

    <!-- FOOTER -->
    <CardFooter class="pt-3 gap-2">
      <slot name="footer">

        <!-- ✅ Pakai inject, bukan props -->
        <template v-if="isLoggedIn">

          <!-- DETAIL -->
          <Button
            variant="outline"
            size="sm"
            class="flex-1"
            @click="handleKlikDetail"
          >
            <BookOpen class="mr-1.5 h-3.5 w-3.5" />
            Detail
          </Button>

          <!-- PINJAM -->
          <Button
            size="sm"
            class="flex-1"
            :disabled="!buku.tersedia"
            @click="handleKlikPinjam"
          >
            <BookMarked class="mr-1.5 h-3.5 w-3.5" />
            {{ buku.tersedia ? 'Pinjam' : 'Dipinjam' }}
          </Button>

          <!-- WISHLIST -->
          <Button
            variant="secondary"
            size="sm"
            class="flex-1"
            @click="handleKlikWishlist"
          >
            ❤️ Wishlist
          </Button>

        </template>

      </slot>
    </CardFooter>
  </Card>
</template>

<script setup>
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, BookMarked } from 'lucide-vue-next'
import { inject } from 'vue'

// PROPS (❌ showActions dihapus)
const props = defineProps({
  buku: { type: Object, required: true },
})

// INJECT dari App.vue
const currentUser = inject('currentUser', null)
const isLoggedIn = inject('isLoggedIn', false)

// EMITS
const emit = defineEmits({
  'lihat-detail': (buku) => !!buku?.id,
  'pinjam': (id) => typeof id === 'number',
  'tambah-wishlist': (id) => typeof id === 'number',
})

// ACTIONS
function handleKlikPinjam() {
  if (!props.buku.tersedia) return
  emit('pinjam', props.buku.id)
}

function handleKlikDetail() {
  emit('lihat-detail', props.buku)
}

function handleKlikWishlist() {
  emit('tambah-wishlist', props.buku.id)
}
</script>
