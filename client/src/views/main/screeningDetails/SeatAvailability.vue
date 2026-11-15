<script setup>
import {computed} from "vue";

const props = defineProps({
  screening: {type: Object, required: true},
})

const totalSeats = computed(
  () => props.screening?.hall?.totalSeats ?? 0
);

const availableSeats = computed(
  () => props.screening?.hall?.availableSeats ?? 0
);

const width = availableSeats.value / totalSeats.value * 100;
</script>

<template>
  <section class="ronuded-3xl border border-steel bg-navy-card p-7">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-2xl font-semibold text-primary">
        Seat Availability
      </h2>
      <p class="text-xl font-semibold text-emerald">
        {{ availableSeats }} seats available
      </p>
    </div>

    <div class="mt-5 h-2 overflow-hidden rounded-full bg-navy-elevated">
      <div :style="{width: width+'%'}" class="bg-emerald h-full"/>
    </div>

    <div class="mt-4 flex items-center justify-between text-muted">
      <span>{{ totalSeats - availableSeats }} reserved</span>
      <span>{{ totalSeats }} total</span>
    </div>
  </section>
</template>
