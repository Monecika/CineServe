<script setup>
import {computed} from "vue";

const props = defineProps({
  facing: {
    type: String,
    required: true,
    validator: (value) =>
      ["up", "down", "left", "right"].includes(value)
  }
})

const rotation = computed(() => ({
  up: 'rotate-0',
  right: 'rotate-90',
  down: 'rotate-180',
  left: '-rotate-90'
}[props.facing]))
</script>

<template>
  <svg
    :class="[rotation, 'size-6 transition-transform duration-200']"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
