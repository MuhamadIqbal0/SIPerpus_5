<template>
  <DropdownMenu>

    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">

        <!-- Icon Light -->
        <Sun
          class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />

        <!-- Icon Dark -->
        <Moon
          class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />

        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Theme</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem
        v-for="theme in themes"
        :key="theme.value"
        @click="setTheme(theme.value)"
        :class="currentTheme === theme.value ? 'bg-accent' : ''"
      >
        <component :is="theme.icon" class="mr-2 h-4 w-4" />
        {{ theme.label }}
      </DropdownMenuItem>

    </DropdownMenuContent>

  </DropdownMenu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sun, Moon, Monitor } from 'lucide-vue-next'

const currentTheme = ref('light')

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

function setTheme(theme) {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)

  document.documentElement.classList.remove('dark')

  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    currentTheme.value = savedTheme

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      }
    }
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      currentTheme.value = 'system'
      document.documentElement.classList.add('dark')
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (currentTheme.value === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    })
})
</script>
