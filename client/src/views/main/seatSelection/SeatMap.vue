<script setup>
import { computed } from 'vue'
import {MAX_SEATS_PER_RESERVATION} from '@/constants/reservation.js'

const props = defineProps({
  screening: {
    type: Object,
    required: true
  },
})

const selected = defineModel('selected', { default: () => [] })
const occupiedSeats = computed(() => props.screening.occupiedSeats ?? [])

function getSeatId(rowIndex, seatNumber) {
  return `${String.fromCharCode(64 + rowIndex)}${seatNumber}`
}

function getSeatStyle(seat) {
  if (occupiedSeats.value.includes(seat)) {
    return 'border-red bg-red/20 text-muted cursor-not-allowed'
  }

  if (selected.value.includes(seat)) {
    return 'border-amber bg-amber text-navy'
  }

  return 'border-steel bg-navy-card text-primary hover:bg-amber/10 hover:border-amber'
}

function toggleSeat(seat) {
  if (selected.value.includes(seat)) {
    selected.value = selected.value.filter(item => item !== seat)
  } else if (selected.value.length < MAX_SEATS_PER_RESERVATION) {
    selected.value = [...selected.value, seat]
  }
}
</script>

<template>
  <div class="overflow-x-auto rounded-3xl border border-steel bg-navy-elevated p-5">
    <p class="text-muted mb-5 text-center text-xl font-semibold">Screen</p>

    <div
      v-for="rowIndex in screening.hall.rows"
      :key="rowIndex"
      class="mt-2 flex items-center gap-2"
    >
      <span class="w-6 text-center text-muted">
        {{ getSeatId(rowIndex, 0).slice(0, 1) }}
      </span>

      <button
        v-for="seatNumber in screening.hall.seatsPerRow"
        :key="seatNumber"
        type="button"
        :disabled="occupiedSeats.includes(getSeatId(rowIndex, seatNumber))"
        :class="['size-13 shrink-0 rounded-md border', getSeatStyle(getSeatId(rowIndex, seatNumber))]"
        @click="toggleSeat(getSeatId(rowIndex, seatNumber))"
      >
        {{ getSeatId(rowIndex, seatNumber) }}
      </button>

      <span class="w-6 text-center text-muted">
        {{ getSeatId(rowIndex, 0).slice(0, 1) }}
      </span>
    </div>
  </div>
</template>
