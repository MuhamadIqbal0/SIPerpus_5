<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Navbar -->
    <AppHeader />

    <!-- Content -->
    <main>
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { provide, ref, computed, readonly } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from './components/layout/AppHeader.vue'

const authStore = useAuthStore()

// ✅ Provide ke seluruh aplikasi
provide('currentUser', readonly(computed(() => authStore.user)))
provide('isLoggedIn', readonly(computed(() => authStore.isLoggedIn)))

// ✅ Tema
const tema = ref('light')
provide('tema', readonly(tema))
provide('toggleTema', () => {
  tema.value = tema.value === 'light' ? 'dark' : 'light'
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
