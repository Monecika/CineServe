<script setup>
import {computed} from 'vue'
import {perPage} from "@/utils/pagination.js";

const props = defineProps({
  total: {type: Number, required: true},
})

const page = defineModel({type: Number, default: 1})

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / perPage)))
const pages = computed(() => Array.from({length: pageCount.value}, (_, index) => index + 1))
const from = computed(() => (props.total === 0 ? 0 : (page.value - 1) * perPage + 1))
const to = computed(() => Math.min(page.value * perPage, props.total))

function go(target) {
  page.value = Math.min(Math.max(target, 1), pageCount.value)
}
</script>

<template>
  <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
    <p class="text-lg text-muted">Showing {{ from }}–{{ to }} of {{ total }}</p>

    <div v-if="pageCount > 1" class="flex items-center gap-2">
      <button
        :disabled="page === 1"
        class="flex size-12 cursor-pointer items-center justify-center rounded-xl text-secondary transition hover:bg-navy-elevated hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        @click="go(page - 1)"
      >
        <svg class="size-5" fill="none" stroke="currentColor"
             stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <button
        v-for="number in pages"
        :key="number"
        :aria-current="number === page ? 'page' : undefined"
        :class="
          number === page
            ? 'bg-amber text-navy'
            : 'text-secondary hover:bg-navy-elevated hover:text-primary'
        "
        class="size-12 cursor-pointer rounded-xl text-lg font-semibold transition"
        type="button"
        @click="go(number)"
      >
        {{ number }}
      </button>

      <button
        :disabled="page === pageCount"
        class="flex size-12 cursor-pointer items-center justify-center rounded-xl text-secondary transition hover:bg-navy-elevated hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        @click="go(page + 1)"
      >
        <svg class="size-5" fill="none" stroke="currentColor"
             stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>
  </div>
</template>
