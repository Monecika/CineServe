<script setup>
import {dateFormater, timeFormater} from "@/utils/timeFormater.js";
import StatusBadge from "@/components/StatusBadge.vue";
import BaseButton from "@/components/primitives/BaseButton.vue";

defineProps({
  reservations: {type: Array, required: true},
});

const emit = defineEmits(["cancel"]);

const DAY = 24 * 60 * 60 * 1000;

const canCancel = (reservation) =>
  new Date(reservation.movie.startsAt).getTime() - Date.now() > DAY;
</script>

<template>
  <p
    v-if="!reservations.length"
    class="text-muted pt-4 mt-4 border-t border-steel"
  >
    No upcoming reservations.
  </p>

  <article
    v-for="reservation in reservations"
    :key="reservation.id"
    class="flex items-center justify-between gap-6 border-t border-steel pt-4 mt-4"
  >
    <div class="flex items-center gap-5">
      <img
        :alt="reservation.movie.title"
        :src="reservation.movie.poster"
        class="h-16 w-14 shrink-0 rounded-lg object-cover bg-navy-card"
      />

      <div class="flex flex-col">
        <h4 class="text-xl text-primary">
          {{ reservation.movie.title }}
        </h4>

        <p class="text-muted">
          {{ dateFormater(reservation.movie.startsAt) }} -
          {{ timeFormater(reservation.movie.startsAt) }} -
          {{ reservation.hall }}
        </p>

        <p class="text-muted">
          Seats:
          <span class="text-amber">
            {{ reservation.seats.join(', ') }}
          </span>
        </p>
      </div>
    </div>

    <div class="flex flex-col items-end gap-3">
      <StatusBadge :status="reservation.status"/>

      <p class="text-sm text-muted">
        Reserved {{ dateFormater(reservation.createdAt) }}
      </p>

      <div
        v-if="reservation.status === 'upcoming'"
        class="flex items-center gap-3"
      >
        <span
          v-if="!canCancel(reservation)"
          class="text-sm text-muted"
        >
          Less than 24h before showtime
        </span>

        <BaseButton
          :disabled="!canCancel(reservation)"
          variant="danger"
          @click="emit('cancel', reservation)"
        >
          Cancel
        </BaseButton>
      </div>
    </div>
  </article>
</template>
