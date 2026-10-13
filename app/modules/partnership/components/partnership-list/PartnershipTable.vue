<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Partner, PartnerRowAction } from './partnership.types'
import PartnershipStatusBadge from './PartnershipStatusBadge.vue'

interface Props {
  partners: Partner[]
  selectedIds: string[]
  allPageSelected: boolean
  somePageSelected: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-row', id: string): void
  (e: 'toggle-all'): void
  (e: 'action', payload: { action: PartnerRowAction, partner: Partner }): void
}>()

const headerCheckbox = ref<HTMLInputElement | null>(null)

watchEffect(() => {
  if (headerCheckbox.value) {
    headerCheckbox.value.indeterminate = props.somePageSelected && !props.allPageSelected
  }
})

const avatarPalette = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700'
]

const avatarClass = (name: string) => {
  const hash = [...name].reduce((total, char) => total + char.charCodeAt(0), 0)
  return avatarPalette[hash % avatarPalette.length]
}

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })

const formatDateTime = (value: string) => {
  const date = new Date(value.endsWith('Z') ? value : `${value}Z`)
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
  const timePart = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  })
  return { datePart, timePart }
}

const rowMenuItems = (partner: Partner) => [
  [
    {
      label: 'View Details',
      icon: 'i-lucide-eye',
      onSelect: () => emit('action', { action: 'view', partner })
    },
    {
      label: 'Edit Partner',
      icon: 'i-lucide-pencil',
      onSelect: () => emit('action', { action: 'edit', partner })
    },
    {
      label: 'Renew Contract',
      icon: 'i-lucide-calendar-plus',
      onSelect: () => emit('action', { action: 'renew', partner })
    }
  ],
  [
    {
      label: 'Delete Partner',
      icon: 'i-lucide-trash-2',
      color: 'error' as const,
      onSelect: () => emit('action', { action: 'delete', partner })
    }
  ]
]
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1280px] border-collapse text-left text-sm">
        <thead class="border-b border-slate-100 bg-slate-50/75">
          <tr class="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            <th
              scope="col"
              class="w-12 py-2 pr-2 pl-6"
            >
              <input
                ref="headerCheckbox"
                type="checkbox"
                class="h-4 w-4 cursor-pointer accent-blue-600"
                :checked="allPageSelected"
                aria-label="Select all rows on this page"
                @change="emit('toggle-all')"
              >
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Partner ID
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Partner Name
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Partnership Category
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Industry
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Expertise
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Location
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Partnership Status
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Contract Status
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Contract End
            </th>
            <th
              scope="col"
              class="px-3 py-2 whitespace-nowrap"
            >
              Last Updated
            </th>
            <th
              scope="col"
              class="w-14 py-2 pr-6 pl-3 text-right"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="partner in partners"
            :key="partner.id"
            class="transition-colors hover:bg-slate-50/70"
          >
            <td class="py-2 pr-2 pl-6">
              <input
                type="checkbox"
                class="h-4 w-4 cursor-pointer accent-blue-600"
                :checked="selectedIds.includes(partner.id)"
                :aria-label="`Select ${partner.name}`"
                @change="emit('toggle-row', partner.id)"
              >
            </td>

            <td class="px-3 py-2 whitespace-nowrap font-mono text-xs font-medium text-slate-500">
              {{ partner.id }}
            </td>

            <td class="px-3 py-2">
              <div class="flex items-center gap-2.5">
                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  :class="avatarClass(partner.name)"
                >
                  {{ initials(partner.name) }}
                </span>
                <span class="font-medium text-slate-900">{{ partner.name }}</span>
              </div>
            </td>

            <td class="px-3 py-2 whitespace-nowrap">
              <PartnershipStatusBadge
                variant="category"
                :status="partner.category"
              />
            </td>

            <td class="px-3 py-2 whitespace-nowrap">
              <span class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {{ partner.industry }}
              </span>
            </td>

            <td class="px-3 py-2 whitespace-nowrap text-xs font-medium text-slate-600">
              {{ partner.expertise }}
            </td>

            <td class="px-3 py-2 whitespace-nowrap text-xs font-medium text-slate-600">
              {{ partner.location }}
            </td>

            <td class="px-3 py-2 whitespace-nowrap">
              <PartnershipStatusBadge
                variant="partner"
                :status="partner.status"
              />
            </td>

            <td class="px-3 py-2 whitespace-nowrap">
              <PartnershipStatusBadge
                variant="contract"
                :status="partner.contractStatus"
              />
            </td>

            <td class="px-3 py-2 whitespace-nowrap text-xs font-medium text-slate-600">
              {{ formatDate(partner.contractEndDate) }}
            </td>

            <td class="px-3 py-2 whitespace-nowrap">
              <div class="flex flex-col leading-tight">
                <span class="text-xs font-medium text-slate-600">
                  {{ formatDateTime(partner.lastUpdated).datePart }}
                </span>
                <span class="text-[11px] text-slate-400">
                  {{ formatDateTime(partner.lastUpdated).timePart }}
                </span>
              </div>
            </td>

            <td class="py-2 pr-6 pl-3 text-right">
              <UDropdownMenu
                :items="rowMenuItems(partner)"
                :content="{ align: 'end' }"
              >
                <button
                  type="button"
                  class="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                  aria-label="Partner actions"
                >
                  <UIcon
                    name="i-lucide-ellipsis-vertical"
                    class="h-4 w-4"
                  />
                </button>
              </UDropdownMenu>
            </td>
          </tr>

          <tr v-if="partners.length === 0">
            <td
              :colspan="12"
              class="px-6 py-10 text-center"
            >
              <div class="flex flex-col items-center gap-2">
                <UIcon
                  name="i-lucide-search-x"
                  class="h-8 w-8 text-slate-300"
                />
                <p class="text-sm font-semibold text-slate-600">
                  No partners found
                </p>
                <p class="text-xs text-slate-400">
                  Try adjusting your search or filters.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
