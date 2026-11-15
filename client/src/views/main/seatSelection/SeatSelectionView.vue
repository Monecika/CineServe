<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import * as movieService from "@/services/movieService.js"
import * as reservationService from "@/services/reservationService.js"
import { dateFormater, timeFormater } from "@/utils/timeFormater.js"
import SeatMap from "@/views/main/seatSelection/SeatMap.vue"
import ReservationSummary from "@/views/main/seatSelection/ReservationSummary.vue"
import {useAuth} from '@/composables/useAuth.js'

const route = useRoute()
const router = useRouter()
const {getToken} = useAuth()

const screening = ref(null)
const selected = ref([])
const error = ref("")

const slug = route.path.split("/").at(-2)

onMounted(async () => {
  try {
    screening.value = await movieService.getMovie(slug)
  } catch (err) {
    error.value = err.message || "Failed to load the screening."
  }
})

async function submitReservation() {
  error.value = ""

  try {
    await reservationService.createReservation(getToken(), {
      movieSlug: screening.value.slug,
      seats: selected.value,
    })

    router.push('/reservations')
  } catch (err) {
    error.value = err.message || "Failed to create reservation. Please try again."
  }
}
</script>

<template>
  <section v-if="screening">
    <div>
      <h1 class="text-primary text-4xl font-bold">
        Choose Your Seats
      </h1>

      <p class="text-lg text-muted">
        {{ screening.slug }}
        - {{ dateFormater(screening.startsAt) }}
        - {{ timeFormater(screening.startsAt) }}
        - {{ screening.hall.name }}
      </p>
    </div>

    <p
      v-if="error"
      class="mt-4 rounded-lg border border-red bg-red/10 p-3 text-red"
    >
      {{ error }}
    </p>

    <div class="mt-5 flex flex-col gap-15 lg:flex-row">
      <SeatMap
        class="flex-2"
        :screening="screening"
        v-model:selected="selected"
      />

      <ReservationSummary
        class="flex-1"
        :screening="screening"
        :selected="selected"
        @submit="submitReservation"
      />
    </div>
  </section>

  <p v-else-if="error" class="mt-4 text-red">
    {{ error }}
  </p>
</template>
