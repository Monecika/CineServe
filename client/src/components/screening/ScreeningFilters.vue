<script setup>
import BaseSelect from "@/components/primitives/BaseSelect.vue";
import BaseButton from "@/components/primitives/BaseButton.vue";

defineProps({
  genres: {type: Array, required: true},
  languages: {type: Array, required: true},
  ratings: {type: Array, required: true},
})

const emit = defineEmits(["reset"]);

const genre = defineModel('genre', {type: String, default: ''})
const language = defineModel('language', {type: String, default: ''})
const ageRating = defineModel('ageRating', {type: String, default: ''})
const date = defineModel('date', {type: String, default: ''})
</script>

<template>
  <div
    class="grid gap-4 rounded-3xl border-steel bg-navy-card p-6 sm:grid-cols-2 lg:grid-cols-4"
  >
    <BaseSelect v-model="genre" :options="genres" all-label="All genres" label="Genre"/>
    <BaseSelect v-model="language" :options="languages" all-label="All languages" label="Language"/>
    <BaseSelect v-model="ageRating" :options="ratings" all-label="All ratings" label="Age rating"/>

    <label class="flex flex-col">
      <span class="mb-2 text-muted">Date</span>
      <input
        v-model="date"
        class="flex-1 rounded-xl border border-steel bg-navy-elevated p-4 text-lg text-primary scheme-dark focus:outline-none"
        type="date"
      />
    </label>

    <BaseButton variant="secondary" @click="emit('reset')">Clear all</BaseButton>
  </div>

</template>
