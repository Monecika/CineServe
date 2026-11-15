<script setup>
import BaseButton from "@/components/primitives/BaseButton.vue"
import { dateFormater, timeFormater } from "@/utils/timeFormater.js"
import {MAX_SEATS_PER_RESERVATION} from '@/constants/reservation.js'

defineProps({
  screening: { type: Object, required: true },
  selected: { type: Array, required: true },
})

const emit = defineEmits(['submit'])
</script>

<template>
  <aside class="p-8 border border-steel bg-navy-card rounded-2xl flex flex-col gap-2">
    <h2 class="text-primary text-2xl font-semibold">
      Reservation Summary
    </h2>

    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between gap-4">
        <p class="text-muted">Movie</p>
        <p class="text-right text-primary">{{ screening.title }}</p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <p class="text-muted">Date</p>
        <p class="text-right text-primary">
          {{ dateFormater(screening.startsAt) }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <p class="text-muted">Time</p>
        <p class="text-right text-primary">
          {{ timeFormater(screening.startsAt) }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <p class="text-muted">Hall</p>
        <p class="text-right text-primary">{{ screening.hall?.name }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between text-lg">
      <span class="text-muted">Selected seats</span>
      <span class="font-semibold text-primary">
        {{ selected.length }} / {{ MAX_SEATS_PER_RESERVATION }}
      </span>
    </div>

    <div v-if="selected.length" class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="seat in selected"
        :key="seat"
        class="rounded-lg border border-amber/30 bg-amber-dim px-3 py-1 text-amber"
      >
        {{ seat }}
      </span>
    </div>

    <BaseButton
      :disabled="!selected.length"
      class="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber"
      size="lg"
      @click="emit('submit')"
    >
      Confirm reservation
    </BaseButton>
  </aside>
</template>
