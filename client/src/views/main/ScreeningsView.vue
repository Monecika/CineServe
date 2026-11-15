<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import SearchBar from "@/components/SearchBar.vue"
import BaseSelect from "@/components/primitives/BaseSelect.vue"
import BaseButton from "@/components/primitives/BaseButton.vue"
import ScreeningFilters from "@/components/screening/ScreeningFilters.vue"
import ScreeningListItem from "@/components/screening/ScreeningListItem.vue"
import BasePagination from "@/components/primitives/BasePagination.vue"
import * as movieService from "@/services/movieService.js"
import ChevronArrow from "@/components/ChevronArrow.vue"
import {visibleItems} from "@/utils/pagination.js";

const screenings = ref([]);

onMounted(async () => {
  try {
    screenings.value = await movieService.getAllMovies();
  } catch (error) {
    console.log(error)
  }
});

const route = useRoute()
const router = useRouter()

const query = ref(route.query.search ?? '')
const filters = reactive({
  genre: route.query.genre ?? '',
  language: route.query.language ?? '',
  ageRating: route.query.ageRating ?? '',
  date: route.query.date ?? '',
})
const sort = ref(route.query.sort ?? 'date-asc')
const page = ref(Math.max(1, Number(route.query.page) || 1))
const showFilters = ref(false)

const sortOptions = [
  {value: 'date-asc', label: 'Date: earliest first'},
  {value: 'date-desc', label: 'Date: latest first'},
  {value: 'title', label: 'Title: A–Z'},
  {value: 'seats', label: 'Most seats available'},
]

const genres = computed(() => [
  ...new Set(screenings.value.flatMap(screening => screening.genres ?? []))
])

const languages = computed(() => [
  ...new Set(screenings.value.map(screening => screening.language))
])

const ratings = computed(() => [
  ...new Set(screenings.value.map(screening => screening.ageRating))
])

const filtered = computed(() => {
  const term = query.value.trim().toLowerCase()

  return screenings.value
    .filter(screening => !term || screening.title.toLowerCase().includes(term))
    .filter(screening => !filters.genre || screening.genres?.includes(filters.genre))
    .filter(screening => !filters.language || screening.language === filters.language)
    .filter(screening => !filters.ageRating || screening.ageRating === filters.ageRating)
    .filter(screening => !filters.date || new Date(screening.startsAt).toDateString() === new Date(filters.date).toDateString())
    .sort((a, b) => {
      switch (sort.value) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'seats':
          return b.availableSeats - a.availableSeats
        case 'date-desc':
          return new Date(b.startsAt) - new Date(a.startsAt)
        default:
          return new Date(a.startsAt) - new Date(b.startsAt)
      }
    })
});

const visible = computed(() => visibleItems(filtered.value, page.value));

watch(
  [query, sort, filters],
  {deep: true}
)

watch(
  [query, sort, page, filters],
  () => {
    const queryParams = {}

    if (query.value.trim()) queryParams.search = query.value.trim()
    if (filters.genre) queryParams.genre = filters.genre
    if (filters.language) queryParams.language = filters.language
    if (filters.ageRating) queryParams.ageRating = filters.ageRating
    if (filters.date) queryParams.date = filters.date
    if (sort.value !== 'date-asc') queryParams.sort = sort.value
    if (page.value > 1) queryParams.page = String(page.value)

    router.replace({query: queryParams})
  },
  {deep: true}
)

function reset() {
  query.value = ''
  filters.genre = ''
  filters.language = ''
  filters.ageRating = ''
  filters.date = ''
}
</script>

<template>
  <section>
    <h1 class="text-5xl font-bold text-primary">Browse Screenings</h1>
    <p class="mt-3 text-xl text-muted">{{ screenings.length }} screenings available</p>
    <div class="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center">
      <SearchBar
        v-model="query"
        class="w-full lg:flex-1"
        placeholder="Search Screenings"
      />

      <div class="flex flex-col w-full gap-3 md:items-center md:flex-row lg:w-auto">
        <BaseButton
          class="w-full md:flex-1 lg:w-auto lg:flex-none"
          size="lg"
          @click="showFilters = !showFilters"
        >
          <ChevronArrow :facing="!showFilters ? 'down' : 'up'"/>
          Filters
        </BaseButton>

        <BaseSelect
          v-model="sort"
          :options="sortOptions"
          class="w-full md:flex-1 lg:w-64"
        />
      </div>
    </div>

    <ScreeningFilters
      v-if="showFilters"
      v-model:age-rating="filters.ageRating"
      v-model:date="filters.date"
      v-model:genre="filters.genre"
      v-model:language="filters.language"
      :genres="genres"
      :languages="languages"
      :ratings="ratings"
      class="mt-6"
      @reset="reset"
    />

    <ul v-if="visible.length" class="mt-8">
      <li v-for="screening in visible" :key="screening.slug">
        <ScreeningListItem :screening="screening" class="mt-3"/>
      </li>
    </ul>

    <div
      v-else
      class="mt-8 rounded-3xl border border-steel bg-navy-card px-6 py-16 text-center"
    >
      <p class="text-2xl font-semibold text-primary">No screenings found</p>
      <p class="mt-2 text-lg text-muted">
        Try adjusting your search or filters.
      </p>
    </div>

    <BasePagination
      v-if="filtered.length"
      v-model="page"
      :total="filtered.length"
      class="mt-8"
    />
  </section>
</template>
