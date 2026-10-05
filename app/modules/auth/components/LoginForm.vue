<template>
  <main class="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
    <aside
      class="relative isolate hidden overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-blue-700 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          class="absolute -top-32 -left-28 size-[28rem] rounded-full bg-blue-500/25 blur-[110px]"
        />
        <div
          class="absolute -right-24 bottom-[-12rem] size-[30rem] rounded-full bg-sky-400/20 blur-[120px]"
        />
        <svg
          viewBox="0 0 400 400"
          fill="none"
          class="absolute -right-40 -bottom-52 size-[34rem] text-white/8"
        >
          <circle
            cx="200"
            cy="200"
            r="196"
            stroke="currentColor"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            stroke="currentColor"
          />
          <circle
            cx="200"
            cy="200"
            r="104"
            stroke="currentColor"
          />
          <circle
            cx="200"
            cy="200"
            r="58"
            stroke="currentColor"
          />
        </svg>
      </div>

      <div class="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          class="size-2 rounded-full bg-blue-300"
        />
        <span class="text-sm font-semibold tracking-tight">Your Workspace</span>
      </div>

      <div class="max-w-sm">
        <p class="text-xs font-semibold tracking-[0.18em] text-blue-200 uppercase">
          Single sign-on
        </p>
        <p
          class="mt-4 text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-white xl:text-[2.5rem]"
        >
          One secure sign-on for your whole workspace.
        </p>
        <p class="mt-5 max-w-xs text-[15px] leading-relaxed text-blue-100/70">
          Reach every internal tool with the Google account your organization already trusts.
        </p>
      </div>

      <p class="text-xs text-blue-200/60">
        Authorized access only
      </p>
    </aside>

    <section
      aria-labelledby="login-title"
      class="relative isolate flex items-center justify-center overflow-hidden bg-linear-to-b from-blue-900 via-blue-800 to-blue-600 px-5 py-12 sm:px-8 lg:from-blue-50 lg:via-white lg:to-white lg:px-10 xl:px-14"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      >
        <div
          class="absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-[100px]"
        />
      </div>

      <div class="w-full max-w-sm">
        <div class="mb-6 flex items-center justify-center gap-2.5 lg:hidden">
          <span
            aria-hidden="true"
            class="size-2 rounded-full bg-blue-200"
          />
          <span class="text-sm font-semibold tracking-tight text-white">Your Workspace</span>
        </div>

        <div
          class="rounded-2xl bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 sm:p-8"
        >
          <h1
            id="login-title"
            class="text-[26px] leading-tight font-semibold tracking-[-0.02em] text-blue-950"
          >
            Welcome back
          </h1>
          <p class="mt-2 text-[15px] leading-relaxed text-slate-500">
            Sign in to continue to your workspace.
          </p>

          <button
            type="button"
            :disabled="loading || disabled"
            :aria-busy="loading"
            class="relative mt-7 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-12 text-[15px] font-medium whitespace-nowrap text-blue-950 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-blue-300 hover:bg-blue-50 hover:shadow-[0_10px_24px_-12px_rgba(29,78,216,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400 disabled:shadow-none"
          >
            <UIcon
              v-if="loading"
              name="i-lucide-loader-circle"
              aria-hidden="true"
              class="absolute left-4 size-5 animate-spin text-blue-600"
            />
            <UIcon
              v-else
              name="i-simple-icons-google"
              aria-hidden="true"
              class="absolute left-4 size-5 text-[#4285F4]"
            />
            Continue with Google
          </button>

          <p class="mt-6 text-center text-xs leading-relaxed text-slate-400">
            Sign in securely with your organization's Google account.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { loading = false, disabled = false } = defineProps<{
  loading?: boolean
  disabled?: boolean
}>()
</script>
