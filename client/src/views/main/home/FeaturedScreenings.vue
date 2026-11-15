<script setup>
import ScreeningCard from '@/components/screening/ScreeningCard.vue'
import {onMounted, ref} from "vue";
import * as movieService from "@/services/movieService.js";

const screenings = ref({});

onMounted(async () => {
  try {
    screenings.value = await movieService.getAllMovies();
  } catch (error) {
    console.error(error);
  }
})
</script>

<template>
  <section>
    <div class="flex items-end justify-between gap-4">
      <div>
        <p class="text-base font-medium tracking-wide text-amber uppercase">This week</p>
        <h2 class="mt-1 font-display text-4xl font-bold text-text">Featured Screenings</h2>
      </div>

      <RouterLink
        class="inline-flex items-center gap-2 text-lg text-secondary transition hover:text-primary"
        to="/screenings"
      >
        View all
        <svg
          aria-hidden="true"
          class="size-5"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </RouterLink>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ScreeningCard v-for="screening in screenings" :key="screening.slug" :screening="screening"/>
    </div>
  </section>
</template>
