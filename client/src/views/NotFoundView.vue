<script setup>
</script>

<template>
  <div class="w-full max-w-md text-center">
    <p class="text-7xl font-bold tracking-tight text-slate-300 sm:text-8xl">404</p>

    <h1 class="mt-4 text-2xl font-semibold text-slate-900">
      Page not found
    </h1>

    <p class="mt-3 text-slate-600">
      We couldn't find the page you were requesting on this server.
    </p>

    <div class="mt-8 flex items-center justify-center gap-3">
      <RouterLink
        to="/"
        class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Back to home
      </RouterLink>
    </div>
  </div>
</template>
