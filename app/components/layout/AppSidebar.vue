<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()

// State untuk toggle accordion/dropdown sub-menu
const openMenus = ref<Record<string, boolean>>({
  portfolio: true, // default open sesuai screenshot
  partnership: false,
  administration: false
})

const toggleMenu = (key: string) => {
  openMenus.value[key] = !openMenus.value[key]
}

// Struktur navigasi utama (siap ditambah property role nantinya)
const mainNavigation = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard'
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    icon: 'i-lucide-briefcase',
    children: [
      { label: 'Portfolio Directory', to: '/portfolio' },
      { label: 'My Projects', to: '/portfolio/my-projects' }
    ]
  },
  {
    key: 'partnership',
    label: 'Partnership',
    icon: 'i-lucide-handshake',
    children: [
      { label: 'Partner Directory', to: '/partnership' },
      { label: 'Verification', to: '/partnership/verification' },
      { label: 'Evaluation', to: '/partnership/evaluation' }
    ]
  },
  {
    label: 'Analytics',
    icon: 'i-lucide-line-chart',
    to: '/analytics'
  },
  {
    label: 'Notifications',
    icon: 'i-lucide-bell',
    to: '/notifications',
    badge: '3' // dummy badge sesuai screenshot
  }
]

// Navigasi grup Administration
const adminNavigation = [
  {
    label: 'Content Management',
    icon: 'i-lucide-file-text',
    to: '/admin/content'
  },
  {
    label: 'User Management',
    icon: 'i-lucide-users',
    to: '/admin/users'
  },
  {
    label: 'Audit Log',
    icon: 'i-lucide-history',
    to: '/admin/audit-log'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/admin/settings'
  }
]

// Helper untuk mengecek apakah link sedang aktif
const isRouteActive = (path?: string) => {
  if (!path) return false
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <aside
    class="flex h-screen w-64 flex-col border-r border-slate-800 bg-[#0B132B] text-slate-300 select-none"
  >
    <!-- Header / Brand Logo -->
    <div class="flex h-16 items-center gap-3 px-6 border-b border-slate-800/80">
      <div
        class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30"
      >
        <UIcon name="i-lucide-box" class="h-5 w-5" />
      </div>
      <span class="text-base font-semibold text-white tracking-wide">Company</span>
    </div>

    <!-- Navigation List (Scrollable Area) -->
    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
      <!-- Main Navigation Group -->
      <nav class="space-y-1">
        <template v-for="item in mainNavigation" :key="item.label">
          <!-- Item dengan Dropdown (Portfolio & Partnership) -->
          <div v-if="item.children" class="space-y-1">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer hover:bg-slate-800/60 hover:text-white"
              :class="[
                openMenus[item.key]
                  ? 'bg-blue-600/10 text-blue-400 font-semibold'
                  : 'text-slate-400'
              ]"
              @click="toggleMenu(item.key)"
            >
              <div class="flex items-center gap-3">
                <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
                <span>{{ item.label }}</span>
              </div>
              <UIcon
                name="i-lucide-chevron-down"
                class="h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': openMenus[item.key] }"
              />
            </button>

            <!-- Dropdown Sub-menu Items -->
            <div
              v-show="openMenus[item.key]"
              class="pl-9 pr-1 py-1 space-y-1 border-l border-slate-800 ml-5"
            >
              <NuxtLink
                v-for="sub in item.children"
                :key="sub.to"
                :to="sub.to"
                class="flex items-center rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer hover:bg-slate-800/80 hover:text-white"
                :class="[
                  isRouteActive(sub.to)
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400'
                ]"
              >
                {{ sub.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Single Link Item -->
          <NuxtLink
            v-else
            :to="item.to"
            class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer hover:bg-slate-800/60 hover:text-white"
            :class="[
              isRouteActive(item.to)
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400'
            ]"
          >
            <div class="flex items-center gap-3">
              <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
              <span>{{ item.label }}</span>
            </div>

            <!-- Badge (misal untuk Notifications) -->
            <span
              v-if="item.badge"
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
            >
              {{ item.badge }}
            </span>
          </NuxtLink>
        </template>
      </nav>

      <!-- Administration Group -->
      <div class="space-y-2">
        <p class="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Administration
        </p>
        <nav class="space-y-1">
          <NuxtLink
            v-for="admin in adminNavigation"
            :key="admin.to"
            :to="admin.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 cursor-pointer hover:bg-slate-800/60 hover:text-white"
            :class="[
              isRouteActive(admin.to)
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400'
            ]"
          >
            <UIcon :name="admin.icon" class="h-5 w-5 shrink-0" />
            <span>{{ admin.label }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
</style>
