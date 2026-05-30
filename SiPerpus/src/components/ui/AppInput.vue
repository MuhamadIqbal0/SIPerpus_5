<template>
 <div class="space-y-1.5">
 <label v-if="label" :for="inputId"
 class="text-sm font-medium text-foreground">
 {{ label }}
 <span v-if="required" class="text-destructive ml-0.5">*</span>
 </label>
 <div class="relative">
 <!-- Icon kiri (opsional) -->
 <component
 v-if="iconLeft"
 :is="iconLeft"
 class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
 text-muted-foreground"
 />
 <Input
 :id="inputId"
 :value="modelValue"
 :type="type"
 :placeholder="placeholder"
 :disabled="disabled"
 :class="[iconLeft ? 'pl-9' : '', errorMessage ? 'border-destructive'
: '']"
 @input="$emit('update:modelValue', $event.target.value)"
 />
 </div>
 <!-- Pesan error atau helper -->
 <p v-if="errorMessage" class="text-sm text-destructive">
 {{ errorMessage }}
 </p>
 <p v-else-if="helperText" class="text-sm text-muted-foreground">
 {{ helperText }}
 </p>
 </div>
</template>
<script setup>
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
const props = defineProps({
 modelValue: { type: String, default: '' }, // v-model target
 label: String,
 placeholder: String,
 type: { type: String, default: 'text' },
 required: { type: Boolean, default: false },
 disabled: { type: Boolean, default: false },
 errorMessage: String,
 helperText: String,
 iconLeft: Object, // Lucide icon component
})
// Emit 'update:modelValue' — ini yang membuat v-model bekerja
defineEmits(['update:modelValue'])
const inputId = computed(() =>
 props.label
 ? props.label.toLowerCase().replace(/\s+/g, '-')
 : `input-${Math.random().toString(36).slice(2, 8)}`
)
</script>
<!-- PENGGUNAAN: sintaks v-model persis seperti input biasa! -->
<!-- <AppInput v-model="form.judul" label="Judul Buku" :required="true" -->
<!-- :error-message="errors.judul" /> -->

