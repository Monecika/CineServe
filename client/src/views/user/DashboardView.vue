<script setup>
import {computed, ref} from 'vue'
import {RouterLink} from 'vue-router'
import InfoTile from "@/components/InfoTile.vue"
import SearchBar from "@/components/SearchBar.vue"
import {useAuth} from "@/composables/useAuth.js"
import {useReservations} from "@/composables/useReservations.js"
import ScreeningReservation from "@/components/reservations/ScreeningReservation.vue"
import * as reservationService from "@/services/reservationService.js"

const {user, getToken} = useAuth()
const {reservations, filterByStatus, countByStatus} = useReservations()

const firstName = computed(() => user.value?.firstName)
const searchQuery = ref('')

const upcomingReservations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return filterByStatus('upcoming').filter((reservation) =>
    reservation.movie.title.toLowerCase().includes(query)
  )
})

const cancelReservation = async (reservation) => {
  await reservationService.cancelReservation(getToken(), reservation.id)
  reservation.status = 'cancelled'
}
</script>

<template>
  <section class="flex flex-col gap-10">
    <div>
      <h1 class="text-5xl font-bold text-primary">
        Welcome back, {{ firstName }}
      </h1>

      <p class="text-xl text-muted mt-3">
        Here's an overview of your cinema activity.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <InfoTile :value="countByStatus('upcoming')" label="Upcoming"/>
      <InfoTile :value="countByStatus('completed')" label="Completed"/>
      <InfoTile :value="countByStatus('cancelled')" label="Cancelled"/>
      <InfoTile :value="reservations.length" label="Total reservations"/>
    </div>

    <SearchBar
      v-model="searchQuery"
      class="mt-5 mb-5"
      placeholder="Search reservations by movie title"
    />

    <div class="bg-navy-elevated border border-steel rounded-2xl py-5 *:px-6">
      <div class="flex justify-between">
        <h3 class="text-primary font-semibold text-lg">
          Upcoming Reservations
        </h3>

        <RouterLink
          class="text-muted transition hover:text-primary"
          to="/screenings"
        >
          View All
        </RouterLink>
      </div>

      <ScreeningReservation
        :reservations="upcomingReservations"
        @cancel="cancelReservation"
      />
    </div>
  </section>
</template>
