<script setup>
import {computed, ref} from 'vue'
import BaseButton from "@/components/primitives/BaseButton.vue"
import SearchBar from "@/components/SearchBar.vue"
import {useReservations} from "@/composables/useReservations.js"
import ScreeningReservation from "@/components/reservations/ScreeningReservation.vue"
import {useAuth} from "@/composables/useAuth.js"
import * as reservationService from "@/services/reservationService.js"

const {getToken} = useAuth()
const {reservations, countByStatus} = useReservations()

const activeTab = ref('all')
const searchQuery = ref('')

const tabs = computed(() => [
  {key: 'all', label: 'All', count: reservations.value.length},
  {key: 'upcoming', label: 'Upcoming', count: countByStatus('upcoming')},
  {key: 'completed', label: 'Completed', count: countByStatus('completed')},
  {key: 'cancelled', label: 'Cancelled', count: countByStatus('cancelled')},
])

const visibleReservations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return reservations.value.filter((reservation) => {
    const matchesTab =
      activeTab.value === 'all' ||
      reservation.status === activeTab.value

    const matchesSearch =
      (reservation.movie?.title ?? '').toLowerCase().includes(query)

    return matchesTab && matchesSearch
  })
})

const cancelReservation = async (reservation) => {
  await reservationService.cancelReservation(getToken(), reservation.id)
  reservation.status = 'cancelled'
}
</script>

<template>
  <section class="flex flex-col gap-8">
    <div class="flex flex-col items-start justify-between gap-4 md:flex-row">
      <div>
        <h1 class="text-5xl font-bold text-primary">My Reservations</h1>
        <p class="text-xl text-muted mt-3">
          {{ reservations.length }} total reservations
        </p>
      </div>

      <BaseButton to="/screenings">+ New reservation</BaseButton>
    </div>

    <SearchBar
      v-model="searchQuery"
      placeholder="Search reservations by movie title"
    />

    <div class="flex w-fit flex-wrap gap-2 rounded-full border border-steel p-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="activeTab === tab.key
          ? 'bg-navy-elevated text-primary'
          : 'text-muted hover:text-primary'"
        class="cursor-pointer rounded-xl px-5 py-2.5 transition"
        type="button"
        @click="activeTab = tab.key"
      >
        {{ tab.label }} ({{ tab.count }})
      </button>
    </div>

    <div class="bg-navy-elevated border border-steel rounded-2xl pb-5 *:px-6">
      <ScreeningReservation
        :reservations="visibleReservations"
        @cancel="cancelReservation"
      />
    </div>
  </section>
</template>
