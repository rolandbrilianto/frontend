<script setup lang="ts">
import { computed } from 'vue'
import type { PartnershipFilterState } from './partnership.types'
import {
  contractStatuses,
  expertises,
  industries,
  locations,
  partnershipCategories,
  partnershipStatuses
} from './partnership.data'
import PartnershipFilterSelect from './PartnershipFilterSelect.vue'

interface Props {
  modelValue: PartnershipFilterState
  advancedActiveCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  advancedActiveCount: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: PartnershipFilterState): void
  (e: 'toggle-more' | 'reset'): void
}>()

const update = (patch: Partial<PartnershipFilterState>) => {
  emit('update:modelValue', { ...props.modelValue, ...patch })
}

const activeFilterCount = computed(() => {
  const { search, ...arrays } = props.modelValue
  const arrayCount = Object.values(arrays).reduce((total, value) => total + value.length, 0)
  return arrayCount + (search ? 1 : 0)
})
</script>

<template>
  <section class="rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
    <div class="flex flex-col gap-2.5 lg:flex-row lg:items-center">
      <div class="relative flex-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <UIcon
            name="i-lucide-search"
            class="h-4 w-4"
          />
        </div>
        <input
          :value="modelValue.search"
          type="text"
          placeholder="Search partner name, ID, or keyword..."
          class="h-8.5 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-9 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          @input="update({ search: ($event.target as HTMLInputElement).value })"
        >
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          :disabled="activeFilterCount === 0"
          @click="emit('reset')"
        >
          <UIcon
            name="i-lucide-rotate-ccw"
            class="h-3.5 w-3.5 text-slate-500"
          />
          <span>Reset filters</span>
        </button>

        <button
          type="button"
          class="inline-flex h-8.5 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors cursor-pointer"
          :class="
            advancedActiveCount > 0
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          "
          @click="emit('toggle-more')"
        >
          <UIcon
            name="i-lucide-sliders-horizontal"
            class="h-3.5 w-3.5"
          />
          <span>More Filters</span>
          <span
            v-if="advancedActiveCount > 0"
            class="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white"
          >
            {{ advancedActiveCount }}
          </span>
        </button>
      </div>
    </div>

    <div class="mt-2.5 grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="flex min-w-0 flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">
          Partnership Category
        </label>
        <PartnershipFilterSelect
          :model-value="modelValue.categories"
          label="All Categories"
          :options="partnershipCategories"
          search-placeholder="Search category..."
          @update:model-value="(value) => update({ categories: value })"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">
          Partnership Status
        </label>
        <PartnershipFilterSelect
          :model-value="modelValue.statuses"
          label="All Status"
          :options="partnershipStatuses"
          search-placeholder="Search status..."
          @update:model-value="(value) => update({ statuses: value })"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">
          Contract Status
        </label>
        <PartnershipFilterSelect
          :model-value="modelValue.contractStatuses"
          label="All Contract Status"
          :options="contractStatuses"
          search-placeholder="Search contract status..."
          @update:model-value="(value) => update({ contractStatuses: value })"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">
          Industry
        </label>
        <PartnershipFilterSelect
          :model-value="modelValue.industries"
          label="All Industries"
          :options="industries"
          search-placeholder="Search industry..."
          @update:model-value="(value) => update({ industries: value })"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">
          Expertise
        </label>
        <PartnershipFilterSelect
          :model-value="modelValue.expertises"
          label="All Expertise"
          :options="expertises"
          search-placeholder="Search expertise..."
          @update:model-value="(value) => update({ expertises: value })"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">
          Location
        </label>
        <PartnershipFilterSelect
          :model-value="modelValue.locations"
          label="All Locations"
          :options="locations"
          search-placeholder="Search location..."
          @update:model-value="(value) => update({ locations: value })"
        />
      </div>
    </div>
  </section>
</template>
