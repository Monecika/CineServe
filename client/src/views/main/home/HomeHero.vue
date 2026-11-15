<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import BaseButton from '@/components/primitives/BaseButton.vue'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()
const input = ref('')

function search() {
  router.push({path: '/screenings', query: input.value ? {search: input.value} : {}})
}
</script>

<template>
  <section class="mt-10 flex flex-col gap-10">
    <h1 class=" text-6xl font-bold sm:text-7xl lg:text-8xl">
      Your cinema.
      <span class="block text-amber">Your seats.</span>
    </h1>

    <p class="text-xl text-text-secondary">
      Browse the latest screenings, pick your perfect seats, and reserve in seconds.
      No queues, no hassle.
    </p>

    <div class="flex max-w-4xl flex-col gap-4 sm:flex-row">
      <div class="flex-1">
        <SearchBar
          v-model="input"
          placeholder="Search movies, genres..."
          @search="search"
        />
      </div>
      <BaseButton size="lg" to="/screenings">Browse screenings</BaseButton>
    </div>
  </section>
</template>
