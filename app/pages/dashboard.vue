<script setup lang="ts">
import { ref } from 'vue'
import type { UserRole } from '../modules/dashboard/types/types'

import ExecutiveDashboard from '../modules/dashboard/components/executive/ExecutiveDashboardView.vue'
import CommercialDashboard from '../modules/dashboard/components/commercial/CommercialDashboardView.vue'
import EngineeringDashboard from '../modules/dashboard/components/engineering/EngineeringDashboardView.vue'

// Role saat ini (default: executive)
const currentRole = ref<UserRole>('executive')

// Pilihan role untuk preview development
const roleOptions: { label: string; value: UserRole }[] = [
  { label: 'Executive View', value: 'executive' },
  { label: 'Commercial View', value: 'commercial' },
  { label: 'Engineering View', value: 'engineering' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Dev Role Switcher Bar (Praktis untuk preview frontend) -->
    <div
      class="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 p-3"
    >
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-900">
        <UIcon name="i-lucide-shield" class="h-4 w-4 text-blue-600" />
        <span>Previewing Role:</span>
      </div>

      <!-- Tab Switcher -->
      <div class="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-2xs">
        <button
          v-for="role in roleOptions"
          :key="role.value"
          type="button"
          class="rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
          :class="[
            currentRole === role.value
              ? 'bg-[#0B132B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          ]"
          @click="currentRole = role.value"
        >
          {{ role.label }}
        </button>
      </div>
    </div>

    <!-- Dynamic Conditional Rendering Dashboard Component -->
    <ExecutiveDashboard v-if="currentRole === 'executive'" />
    <CommercialDashboard v-else-if="currentRole === 'commercial'" />
    <EngineeringDashboard v-else-if="currentRole === 'engineering'" />
  </div>
</template>
