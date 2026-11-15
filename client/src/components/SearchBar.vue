<script setup>
const model = defineModel({type: String, default: ''})

defineProps({
  placeholder: {type: String, default: 'Search...'},
})

const emit = defineEmits(['search'])
</script>

<template>
  <form class="relative w-full" @submit.prevent="emit('search', model)">
    <svg class="pointer-events-none absolute top-4 left-5 size-6  text-muted"
         fill="none" stroke="currentColor" stroke-width="1.5"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>

    <input
      v-model="model"
      :placeholder="placeholder"
      class="h-full w-full rounded-xl border border-steel bg-navy-card py-4 pr-5 pl-14 text-lg text-primary focus:outline-none"
      type="search"
    />
  </form>
</template>
