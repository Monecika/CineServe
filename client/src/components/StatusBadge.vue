<script setup>
defineProps({
  status: {type: String, required: true},
})

const styles = {
  upcoming: {
    label: 'Upcoming',
    badge: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    dot: 'bg-blue-400'
  },
  completed: {
    label: 'Completed',
    badge: 'border-steel bg-navy-card text-muted',
    dot: 'bg-muted'
  },
  cancelled: {
    label: 'Cancelled',
    badge: 'border-red-500/40 bg-red-500/10 text-red-400',
    dot: 'bg-red-400'
  },
}
</script>

<template>
  <p
    :class="styles[status]?.badge"
    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
  >
    <span :class="styles[status]?.dot" class="size-2 rounded-full"></span>
    {{ styles[status]?.label }}
  </p>
</template>
