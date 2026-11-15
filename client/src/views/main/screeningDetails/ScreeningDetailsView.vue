<script setup>
import {computed, onMounted, ref} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import * as movieService from "@/services/movieService.js";
import {dateFormater, timeFormater} from "@/utils/timeFormater.js";
import InfoTile from "@/components/InfoTile.vue";
import BaseButton from "@/components/primitives/BaseButton.vue";
import SeatAvailability from "@/views/main/screeningDetails/SeatAvailability.vue";
import {useAuth} from "@/composables/useAuth.js";

const router = useRouter()
const route = useRoute()

const screening = ref({})

onMounted(async () => {
  try {
    screening.value = await movieService.getMovie(route.path.split("/").pop())
  } catch (error) {
    console.error(error)
  }
})

const tiles = computed(() => {
  const s = screening.value

  return [
    {label: 'Duration', value: `${s.duration} minutes`},
    {label: 'Language', value: s.language},
    {label: 'Age rating', value: s.ageRating},
    {label: 'Date', value: dateFormater(s.startsAt)},
    {label: 'Showtime', value: `${timeFormater(s.startsAt)} – ${timeFormater(s.endsAt)}`},
    {label: 'Hall', value: s.hall?.name},
  ]
})

const {isLoggedIn} = useAuth()

function chooseSeats() {
  router.push(`/screenings/${screening.value.slug}/seats`)
}
</script>

<template>
  <section class="flex flex-col justify-between gap-5 md:flex-row">
    <div class="overflow-hidden rounded-3xl bg-navy-elevated w-full md:w-1/2">
      <img
        v-if="screening.poster"
        :alt="`Poster of ${screening.title}`"
        :src="screening.poster"
        class="size-full object-cover"
      />
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="genre in screening.genres"
          :key="genre"
          class="rounded-full border border-steel bg-navy-elevated px-4 py-1 text-secondary">
          {{ genre }}
        </span>
      </div>
      <h1 class="text-5xl font-bold text-primary">
        {{ screening.title }}
      </h1>
      <p class="text-xl text-secondary">
        {{ screening.description }}
      </p>

      <dl class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <InfoTile v-for="tile in tiles" :key="tile.label" :label="tile.label"
                  :value="tile.value"/>
      </dl>

      <SeatAvailability :screening="screening" class="mt-8"/>

      <BaseButton class="w-full" size="lg" @click="chooseSeats">
        Choose seats
      </BaseButton>

      <p v-if="!isLoggedIn" class="text-center text-lg text-muted">
        You need to
        <RouterLink class="text-amber transition hover:text-amber-light" to="/login">
          sign in
        </RouterLink>
        or
        <RouterLink class="text-amber transition hover:text-amber-light" to="/register">
          register
        </RouterLink>
        to make a reservation.
      </p>
    </div>
  </section>
</template>
