<script setup>
import {useId} from 'vue'

defineProps({
  label: {type: String, default: 'Missing Label'},
  type: {type: String, default: 'text'},
  placeholder: {type: String, default: 'Missing Placeholder'},
  error: {type: String},
  required: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  minlength: {type: [String, Number], default: undefined},
  maxlength: {type: [String, Number], default: undefined},
  min: {type: [String, Number], default: undefined},
  max: {type: [String, Number], default: undefined},
  step: {type: [String, Number], default: undefined},
})

const model = defineModel({type: String, default: ''})
const id = useId()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-lg text-secondary">
      {{ label }}
    </label>

    <div class="relative">
      <span
        class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-muted">
        <slot name="icon"/>
      </span>

      <input
        :id="id"
        v-model="model"
        :class="[
          $slots.icon ? 'pl-14' : 'pl-5',
          $slots.suffix ? 'pr-14' : 'pr-5',
          error ? 'border-red' : 'border-steel',
        ]"
        :placeholder="placeholder"
        :type="type"
        :required="required"
        :disabled="disabled"
        :minlength="minlength"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        class="py-4 text-lg text-primary w-full rounded-2xl border bg-navy-elevated placeholder:text-muted focus:border-amber focus:outline-none"
      >

      <span class="absolute top-1/2 right-3 -translate-y-1/2 text-muted">
        <slot name="suffix"/>
      </span>
    </div>
    <p v-if="error" class="mt-2 text-red">{{ error }}</p>
  </div>
</template>
