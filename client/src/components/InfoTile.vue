<script setup>
defineProps({
  label: {type: String, required: true},
  value: {type: [String, Number], required: true},
})
</script>

<template>
  <div class="rounded-2xl border border-steel bg-navy-card p-5">
    <dt class="text-muted">{{ label }}</dt>
    <dd class="mt-1 text-xl font-semibold text-primary">{{ value }}</dd>
  </div>
</template>
