<template>
  <div class="data-list">
    <!-- Loading -->
    <div v-if="isLoading" class="grid gap-4" :class="gridClass">
      <Skeleton
        v-for="n in skeletonCount"
        :key="n"
        class="h-48 rounded-lg"
      />
    </div>

    <!-- Empty -->
    <div v-else-if="items.length === 0" class="text-center py-16">
      <slot name="empty">
        <p class="text-muted-foreground">Belum ada data.</p>
      </slot>
    </div>

    <!-- Data -->
    <div v-else class="grid gap-4" :class="gridClass">
      <div v-for="(item, index) in items" :key="item[keyField]">
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Skeleton } from '@/components/ui/skeleton'

defineProps({
  items: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
  keyField: { type: String, default: 'id' },
  gridClass: {
    type: String,
    default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
  skeletonCount: { type: Number, default: 8 },
})
</script>
