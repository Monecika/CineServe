<script setup>
import BaseButton from '@/components/primitives/BaseButton.vue'
import {dateFormater, timeFormater} from "@/utils/timeFormater.js";

const props = defineProps({
  screening: {type: {Object}, required: true},
})

const screening = props.screening

const width = screening.hall.availableSeats / screening.hall.totalSeats * 100;
</script>

<template>
  <RouterLink :to="`/screenings/${screening.slug}`"
              class="flex flex-col rounded-2xl overflow-hidden border border-steel bg-navy-card transition hover:border-amber/40"
  >
    <div class="relative h-72 bg-navy-elevated">
      <img :alt="screening.title" :src="screening.poster" class="h-full w-full object-cover"/>

      <div class="absolute top-4 px-4 w-full flex justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <span v-for="genre in screening.genres" :key="genre"
                class="rounded-full border border-steel bg-navy-elevated/90 px-3 py-1 text-sm text-secondary backdrop-blur">
            {{ genre }}
          </span>
        </div>

        <span
          class="rounded-full border border-amber/30 bg-navy-card/80 px-3 py-1 text-sm text-amber backdrop-blur">
            {{ screening.ageRating }} +
          </span>
      </div>
    </div>
    <div class="flex flex-col gap-1 p-5">
      <h3 class="text-xl font-semibold text-primary">{{ screening.title }}</h3>

      <ul class="text-muted flex gap-4">
        <li>{{ screening.duration }} min</li>
        -
        <li>{{ screening.language }}</li>
        -
        <li>{{ screening.hall.name }}</li>
      </ul>

      <div class="mt-5 flex justify-between text-muted">
        <p>{{ dateFormater(screening.startsAt) }}</p>
        <p>Available</p>
      </div>

      <div class="flex justify-between">
        <p class="text-lg text-primary">{{ timeFormater(screening.startsAt) }} -
          {{ timeFormater(screening.endsAt) }}</p>
        <p class="text-emerald">{{ screening.hall.totalSeats }} seats</p>
      </div>

      <div class="mt-1 h-2 w-full bg-navy-elevated rounded-full overflow-hidden">
        <div :style="{ width: `${width}%` }" class="h-full bg-emerald"/>
      </div>

      <BaseButton class="mt-5 w-full" variant="secondary">
        View seats
      </BaseButton>
    </div>
  </RouterLink>
</template>
