<script setup>

import BaseButton from "@/components/primitives/BaseButton.vue";
import {dateFormater, timeFormater} from "@/utils/timeFormater.js";

const props = defineProps({
  screening: {type: Object, required: true},
})

const screening = props.screening;

const width = screening.hall.availableSeats / screening.hall.totalSeats * 100
</script>

<template>
  <RouterLink
    :to="`/screenings/${screening.slug}`"
    class="flex flex-col gap-6 rounded-3xl border border-steel bg-navy-card p-5 transition hover:border-amber/40 sm:flex-row sm:p-8"
  >
    <div class="h-56 rounded-2xl bg-navy-elevated sm:w-40">
      <img
        :alt="`Poster of ${screening.title}`"
        :src="screening.poster"
        class="size-full object-cover"
      />
    </div>

    <div class="flex flex-1 flex-col">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-2xl font-semibold text-primary">{{ screening.title }}</h3>
        <span
          class="rounded-full border border-amber/30 bg-amber-dim px-3 py-1 text-sm text-amber"
        >
          {{ screening.ageRating }} +
        </span>
      </div>

      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="genre in screening.genres"
          :key="genre"
          class="rounded-full border border-steel bg-navy-elevated px-4 py-1 text-secondary"
        >
          {{ genre }}
        </span>
      </div>

      <ul class="mt-5 grid gap-x-8 gap-y-2 text-lg text-muted sm:grid-cols-2">
        <li><span>🕐</span> {{ screening.duration }} min</li>
        <li><span>🌐</span> {{ screening.language }}</li>
        <li><span>📅</span> {{ dateFormater(screening.startsAt) }}</li>
        <li><span>🎬</span> {{ screening.hall.name }}</li>
        <li>
          <span>⏰</span> {{ timeFormater(screening.startsAt) }} – {{
            timeFormater(screening.endsAt)
          }}
        </li>
        <li>
          <span>🪑</span>
          {{ screening.hall.availableSeats }} / {{ screening.hall.totalSeats }} seats
        </li>
      </ul>

      <div class="mt-6 flex items-center gap-6">
        <div class="h-2 flex-1 overflow-hidden rounded-full bg-navy-elevated">
          <div :style="{ width: `${width}%` }"
               class="bg-emerald h-full rounded-full transition-all"/>
        </div>
        <BaseButton variant="secondary">Reserve</BaseButton>
      </div>
    </div>
  </RouterLink>
</template>
