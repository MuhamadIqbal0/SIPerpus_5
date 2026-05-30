```vue
<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2.5">
        <BookOpenCheck class="h-6 w-6 text-primary" />
        <span class="font-bold text-lg">SiPerpus</span>
      </RouterLink>

      <!-- NAV -->
      <nav class="hidden md:flex items-center gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          custom
          v-slot="{ navigate, isActive }"
        >
          <Button
            :variant="isActive ? 'secondary' : 'ghost'"
            size="sm"
            @click="navigate"
          >
            <component :is="item.icon" class="mr-1.5 h-4 w-4" />
            {{ item.label }}
          </Button>
        </RouterLink>
      </nav>

      <!-- RIGHT -->
      <div class="flex items-center gap-2">

        <!-- SEARCH -->
        <div class="relative hidden sm:block">
          <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            v-model="kataCariHeader"
            placeholder="Cari buku..."
            class="w-48 pl-8 h-8 text-sm"
            @keyup.enter="cariDariHeader"
          />
        </div>

        <!-- LOGIN / USER -->
        <Button v-if="!isLoggedIn" variant="outline" size="sm" as-child>
          <RouterLink to="/login">Masuk</RouterLink>
        </Button>

        <DropdownMenu v-else>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar class="h-8 w-8">
                <AvatarFallback class="bg-primary text-primary-foreground text-sm">
                  {{ inisialUser }}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>{{ namaUser }}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User class="mr-2 h-4 w-4" />
              Profil Saya
            </DropdownMenuItem>

            <DropdownMenuItem v-if="isPustakawan">
              <LayoutDashboard class="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              class="text-destructive cursor-pointer"
              @select="handleLogout"
            >
              <LogOut class="mr-2 h-4 w-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  BookOpenCheck,
  Search,
  User,
  LayoutDashboard,
  LogOut,
  BookOpen,
  Home
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

// ambil dari store (single source of truth)
const { isLoggedIn, isPustakawan, namaUser, inisialUser } =
  storeToRefs(authStore)

const kataCariHeader = ref('')

const navItems = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/katalog', label: 'Katalog', icon: BookOpen },
  { to: '/FormBuku', label: 'Pengisian Buku', icon: BookOpenCheck }
]

// search → redirect ke katalog
function cariDariHeader() {
  if (!kataCariHeader.value.trim()) return

  router.push({
    name: 'katalog',
    query: { q: kataCariHeader.value }
  })

  kataCariHeader.value = ''
}

// logout
function handleLogout() {
  authStore.logout()
  router.push({ name: 'home' })
}
</script>
```
