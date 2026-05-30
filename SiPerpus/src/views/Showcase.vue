<script setup>
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Card from '@/components/ui/card/Card.vue'
import DataList from '@/components/ui/DataList.vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Showcase Komponen</h1>

    <!-- Button -->
    <div>
      <h2 class="font-semibold">Button</h2>
      <Button>Default</Button>
    </div>

    <!-- Input -->
    <div>
      <h2 class="font-semibold">Input</h2>
      <Input placeholder="Masukkan teks..." />
    </div>

    <!-- Card -->
    <div>
      <h2 class="font-semibold">Card</h2>
      <Card>
        <p>Contoh isi card</p>
      </Card>
    </div>

    <!-- Theme Switcher -->
    <div>
      <h2 class="font-semibold">Theme</h2>
      <ThemeSwitcher />
    </div>

    <!-- Data List -->
    <div>
      <h2 class="font-semibold">Data List</h2>
      <DataList />
    </div>
  </div>
</template>
