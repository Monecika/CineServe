<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import BaseButton from '@/components/primitives/BaseButton.vue'
import BaseInput from '@/components/primitives/BaseInput.vue'
import BaseSelect from '@/components/primitives/BaseSelect.vue'
import SearchBar from '@/components/SearchBar.vue'
import {useAuth} from '@/composables/useAuth.js'
import * as adminService from '@/services/adminService.js'
import {dateFormater, localDateTimeFormater} from '@/utils/timeFormater.js'
import * as movieService from "@/services/movieService.js";

const {getToken} = useAuth()

const screenings = ref([])
const searchQuery = ref('')
const halls = ref([])
const errorMessage = ref('')
const successMessage = ref('')
const editingSlug = ref('')

const filteredScreenings = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return screenings.value

  return screenings.value.filter((screening) =>
    screening.title.toLowerCase().includes(query)
  )
})

const hallOptions = computed(() =>
  halls.value.map((hall) => ({
    value: hall.id,
    label: hall.name,
  }))
)

const screeningForm = reactive({
  title: '',
  description: '',
  duration: 120,
  genres: '',
  ageRating: '12',
  language: 'English',
  poster: '',
  startsAt: '',
  hallId: '',
})

onMounted(async () => {
  errorMessage.value = ''

  try {
    const token = getToken()

    const loadedScreenings = await movieService.getAllMovies()
    const loadedHalls = await adminService.getHalls(token)

    screenings.value = loadedScreenings
    halls.value = loadedHalls
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load admin data.'
  }
})

function resetScreeningForm() {
  editingSlug.value = ''

  Object.assign(screeningForm, {
    title: '',
    description: '',
    duration: 120,
    genres: '',
    ageRating: '12',
    language: 'English',
    poster: '',
    startsAt: '',
    hallId: '',
  })
}

function editScreening(screening) {
  editingSlug.value = screening.slug

  Object.assign(screeningForm, {
    title: screening.title,
    description: screening.description,
    duration: screening.duration,
    genres: screening.genres.join(', '),
    ageRating: screening.ageRating,
    language: screening.language,
    poster: screening.poster,
    startsAt: localDateTimeFormater(screening.startsAt),
    hallId: screening.hall.id,
  })

  window.scrollTo({top: 0, behavior: 'smooth'})
}

async function saveScreening() {
  errorMessage.value = ''
  successMessage.value = ''

  const genres = screeningForm.genres.split(',').map((genre) => genre.trim())

  if (genres.some((genre) => !genre || genre.length > 40) || genres.length > 10) {
    errorMessage.value = 'Enter 1 to 10 genres (up to 40 characters each), separated by commas.'
    return
  }

  if (
    !screeningForm.title.trim() ||
    !screeningForm.description.trim() ||
    !screeningForm.ageRating.trim() ||
    !screeningForm.language.trim()
  ) {
    errorMessage.value = 'Title, description, age rating, and language cannot be blank.'
    return
  }

  const duration = Number(screeningForm.duration)
  if (!Number.isInteger(duration) || duration < 1 || duration > 600) {
    errorMessage.value = 'Duration must be a whole number between 1 and 600 minutes.'
    return
  }

  if (!Number.isInteger(Number(screeningForm.hallId)) || !halls.value.some((hall) => hall.id === Number(screeningForm.hallId))) {
    errorMessage.value = 'Select a valid screening hall.'
    return
  }

  if (Number.isNaN(new Date(screeningForm.startsAt).getTime())) {
    errorMessage.value = 'Enter a valid screening start date and time.'
    return
  }

  try {
    const body = {
      ...screeningForm,
      genres,
    }

    if (editingSlug.value) {
      await adminService.updateScreening(
        getToken(),
        editingSlug.value,
        body
      )

      successMessage.value = 'Screening updated.'
    } else {
      await adminService.createScreening(getToken(), body)

      successMessage.value = 'Screening created.'
    }

    screenings.value = await movieService.getAllMovies()

    resetScreeningForm()
  } catch (error) {
    errorMessage.value = error.message || 'Unable to save screening.'
  }
}

async function removeScreening(screening) {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await adminService.deleteScreening(getToken(), screening.slug)

    screenings.value = screenings.value.filter(
      (item) => item.slug !== screening.slug
    )

    successMessage.value = 'Screening deleted.'

    if (editingSlug.value === screening.slug) {
      resetScreeningForm()
    }
  } catch (error) {
    errorMessage.value = error.message || 'Unable to delete screening.'
  }
}

const minDateTime = computed(() => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 16)
})
</script>

<template>
  <section>
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="text-2xl font-semibold text-primary">
          Manage screenings
        </h2>

        <p class="mt-1 text-secondary">
          Create, edit, and remove scheduled screenings.
        </p>
      </div>

      <BaseButton
        v-if="editingSlug"
        variant="neutral"
        @click="resetScreeningForm"
      >
        Cancel edit
      </BaseButton>
    </div>

    <p
      v-if="errorMessage"
      class="mb-5 rounded-lg border border-red/40 bg-red-dim p-3 text-red"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="successMessage"
      class="mb-5 rounded-lg border border-emerald/40 bg-emerald-dim p-3 text-emerald"
    >
      {{ successMessage }}
    </p>

    <form
      class="grid gap-4 border-b border-steel pb-8 md:grid-cols-2"
      @submit.prevent="saveScreening"
    >
      <BaseInput
        v-model="screeningForm.title"
        label="Title"
        placeholder="Film title"
        minlength="1"
        maxlength="120"
        required
      />

      <BaseSelect
        v-model="screeningForm.hallId"
        :options="hallOptions"
        label="Hall"
        required
      />

      <label class="flex flex-col gap-2 text-secondary md:col-span-2">
        Description

        <textarea
          v-model="screeningForm.description"
          class="rounded-lg border border-steel bg-navy-elevated p-3 text-primary focus:border-amber focus:outline-none"
          minlength="1"
          maxlength="2000"
          required
        />
      </label>

      <BaseInput
        v-model="screeningForm.duration"
        label="Duration in minutes"
        min="1"
        max="600"
        step="1"
        required
        type="number"
      />

      <BaseInput
        v-model="screeningForm.genres"
        label="Genres"
        placeholder="Drama, Sci-Fi"
        minlength="1"
        maxlength="400"
        required
      />

      <BaseInput
        v-model="screeningForm.ageRating"
        label="Age rating"
        placeholder="12"
        maxlength="2"
        required
      />

      <BaseInput
        v-model="screeningForm.language"
        label="Language"
        placeholder="English"
        minlength="1"
        maxlength="50"
        required
      />

      <BaseInput
        v-model="screeningForm.poster"
        label="Poster URL"
        maxlength="2048"
        required
        type="url"
      />

      <label class="flex flex-col gap-2 text-secondary">
        Start time

        <input
          v-model="screeningForm.startsAt"
          :min="minDateTime"
          class="rounded-lg border border-steel bg-navy-elevated p-3 text-primary scheme-dark focus:border-amber focus:outline-none"
          required
          type="datetime-local"
        />
      </label>

      <div class="md:col-span-2">
        <BaseButton type="submit">
          {{ editingSlug ? 'Save screening' : 'Create screening' }}
        </BaseButton>
      </div>
    </form>

    <SearchBar
      v-model="searchQuery"
      class="mb-5 mt-8"
      placeholder="Search screenings by title"
    />

    <div class="*:border-b *:border-steel">
      <article
        v-for="screening in filteredScreenings"
        :key="screening.slug"
        class="flex flex-wrap items-center justify-between gap-4 py-4"
      >
        <div>
          <h3 class="font-semibold text-primary">
            {{ screening.title }}
          </h3>

          <p class="text-sm text-secondary">
            {{ screening.slug }} · {{ screening.hall?.name }} ·
            {{ dateFormater(screening.startsAt) }}
          </p>
        </div>

        <div class="flex gap-2">
          <BaseButton
            variant="neutral"
            @click="editScreening(screening)"
          >
            Edit
          </BaseButton>

          <BaseButton
            variant="danger"
            @click="removeScreening(screening)"
          >
            Delete
          </BaseButton>
        </div>
      </article>

      <p
        v-if="!filteredScreenings.length"
        class="py-8 text-center text-muted"
      >
        {{ screenings.length ? 'No screenings match your search.' : 'No screenings found.' }}
      </p>
    </div>
  </section>
</template>
