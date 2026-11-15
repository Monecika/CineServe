<script setup>
import {computed} from 'vue'
import BaseButton from "@/components/primitives/BaseButton.vue";
import StatusBadge from "@/components/reservation/StatusBadge.vue";
import {dateFormater, timeFormater} from "@/utils/timeFormater.js";

const props = defineProps({
  reservation: {type: Object, required: true},
})

const {movie, hall, seats, status, createdAt} = props.reservation

const DAY = 24 * 60 * 60 * 1000

const canCancel = computed(() => new Date(movie.startsAt) - Date.now() > DAY)
</script>

<template>
  <article
    class="flex flex-col gap-6 rounded-3xl border border-steel bg-navy-card p-5 sm:flex-row sm:p-8">
    <div class="h-56 rounded-2xl bg-navy-elevated sm:w-40">
      <img
        :alt="`Poster of ${movie.title}`"
        :src="movie.poster"
        class="size-full rounded-2xl object-cover"
      />
    </div>

    <div class="flex flex-1 flex-col">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-2xl font-semibold text-primary">{{ movie.title }}</h3>

        <StatusBadge :status="status"/>
      </div>

      <ul class="mt-5 grid gap-x-8 gap-y-2 text-lg text-muted sm:grid-cols-2">
        <li><span>📅</span> {{ dateFormater(movie.startsAt) }}</li>
        <li><span>🎬</span> {{ hall }}</li>
        <li>
          <span>⏰</span> {{ timeFormater(movie.startsAt) }} – {{ timeFormater(movie.endsAt) }}
        </li>
        <li><span>🕐</span> Reserved {{ dateFormater(createdAt) }}</li>
        <li><span>🪑</span> {{ seats.join(', ') }}</li>
      </ul>

      <div class="mt-6 flex flex-wrap items-center gap-4">
        <BaseButton :to="`/screenings/${movie.slug}`" variant="secondary">View details</BaseButton>

        <template v-if="status === 'upcoming'">
          <BaseButton :disabled="!canCancel" variant="danger">Cancel</BaseButton>
          <span v-if="!canCancel" class="text-muted">Less than 24h before showtime</span>
        </template>
      </div>
    </div>
  </article>
</template>
