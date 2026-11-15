<script setup>
defineProps({
  label: {type: String},
  options: {type: Array, required: true},
  allLabel: {type: String, default: ''},
})

const model = defineModel({type: String, default: ''})
</script>

<template>
  <label class="flex flex-col">
    <span v-if="label" class="mb-2 text-muted">{{ label }}</span>
    <select
      v-model="model"
      class="flex-1 cursor-pointer appearance-none rounded-xl border border-steel bg-navy-elevated p-4 text-lg text-primary focus:border-amber focus:outline-none"
    >
      <option v-if="allLabel" value="">{{ allLabel }}</option>
      <option
        v-for="option in options"
        :key="option.value ?? option"
        :value="option.value ?? option"
        class="bg-navy-elevated text-primary"
      >
        {{ option.label ?? option }}
      </option>
    </select>
  </label>
</template>
