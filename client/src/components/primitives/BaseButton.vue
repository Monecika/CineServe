<script setup>
import {RouterLink} from 'vue-router'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'neutral', 'danger'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'lg'].includes(value),
  },
  to: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const variants = {
  primary: 'bg-amber text-navy hover:bg-amber-light',
  secondary: 'border border-amber text-amber hover:bg-amber-dim',
  neutral: 'border border-steel bg-navy-card text-primary hover:bg-navy-elevated',
  danger: 'border border-red/40 text-red hover:bg-red-dim',
}

const sizes = {
  md: 'px-5 py-2.5',
  lg: 'px-8 py-4 text-lg',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber'
</script>

<template>
  <RouterLink
    v-if="to"
    :class="[
      baseClasses,
      variants[variant],
      sizes[size],
    ]"
    :to="to"
  >
    <slot/>
  </RouterLink>

  <button
    v-else
    :class="[
      baseClasses,
      variants[variant],
      sizes[size],
    ]"
    :disabled="disabled"
    :type="type"
  >
    <slot/>
  </button>
</template>
