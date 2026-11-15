<script setup>
import {onMounted, ref} from 'vue'

// Everything Vite exposes to the browser starts with VITE_ (see .env).
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const examples = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/examples`)

    // fetch only rejects on network failures, so check the status yourself.
    if (!response.ok) {
      throw new Error(`The server responded with ${response.status}`)
    }

    examples.value = await response.json()
  } catch {
    examples.value = []
  }
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-slate-900">Examples</h1>

    <p class="mt-2 text-slate-600">Fetched from {{ apiBaseUrl }}/examples</p>

    <ul class="mt-6 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
      <li v-for="example in examples" :key="example.id" class="px-4 py-3">
        <span class="mr-2 text-sm text-slate-400">#{{ example.id }}</span>
        {{ example.value }}
      </li>
    </ul>
  </div>
</template>
