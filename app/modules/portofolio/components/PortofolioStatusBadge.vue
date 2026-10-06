<script setup lang="ts">
import type { ProjectStatus } from '../types/types'

interface Props {
  status: ProjectStatus
}

const props = defineProps<Props>()

// Konfigurasi warna badge berdasarkan status
const statusConfig = computed(() => {
  switch (props.status) {
    case 'Completed':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: 'i-lucide-check'
      }
    case 'Active':
      return {
        bg: 'bg-green-50 text-green-700 border-green-200',
        dot: 'bg-green-500',
        icon: 'i-lucide-circle'
      }
    case 'On Going':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        icon: 'i-lucide-clock'
      }
    case 'Planned':
      return {
        bg: 'bg-sky-50 text-sky-700 border-sky-200',
        dot: 'bg-sky-500',
        icon: 'i-lucide-circle'
      }
    case 'Cancelled':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        icon: 'i-lucide-x'
      }
    default:
      return {
        bg: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        icon: 'i-lucide-circle'
      }
  }
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-2xs backdrop-blur-xs"
    :class="statusConfig.bg"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="statusConfig.dot" />
    <span>{{ status }}</span>
  </span>
</template>
