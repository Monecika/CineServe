<script setup>
import BaseInput from "@/components/primitives/BaseInput.vue";
import BaseButton from "@/components/primitives/BaseButton.vue";
import {computed, ref} from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "login",
    validator: (value) => ['register', 'login'].includes(value),
  },
})

const isRegister = computed(() => props.variant === "register");

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const emits = defineEmits(["submit"])

function handleSubmit() {
  if (isRegister.value) {
    emits('submit', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    })
    return
  }

  emits('submit', email.value, password.value)
}
</script>

<template>
  <form
    class="mt-5 flex flex-col gap-8"
    @submit.prevent="handleSubmit"
  >
    <template v-if="isRegister">
      <div class="flex gap-5">
        <BaseInput
          v-model="firstName"
          label="Name"
          placeholder="Your Name"
          :required="true"
          maxlength="80"
          type="text"
        />

        <BaseInput
          v-model="lastName"
          label="Surname"
          placeholder="Your Surname"
          :required="true"
          maxlength="80"
          type="text"
        />
      </div>
    </template>

    <BaseInput
      v-model="email"
      label="Email"
      placeholder="example@ex.com"
      required
      maxlength="254"
      type="email"
    >
      <template #icon>
        <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        </svg>
      </template>
    </BaseInput>

    <BaseInput
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      placeholder="*******"
      required
      maxlength="128"
    >
      <template #icon>
        <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        </svg>
      </template>

      <template #suffix>
        <button class="hover:text-primary cursor-pointer" type="button"
                @click="showPassword = !showPassword">
          <svg
            v-if="showPassword"
            class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>

          <svg
            v-else
            class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              stroke-linecap="round"
              stroke-linejoin="round"/>
          </svg>
        </button>
      </template>
    </BaseInput>

    <BaseInput
      v-if="isRegister"
      v-model="passwordConfirm"
      :type="showPasswordConfirm ? 'text' : 'password'"
      label="Confirm Password"
      placeholder="*******"
      required
      minlength="8"
      maxlength="128"
    >
      <template #icon>
        <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        </svg>
      </template>

      <template #suffix>
        <button class="hover:text-primary cursor-pointer" type="button"
                @click="showPasswordConfirm = !showPasswordConfirm">
          <svg
            v-if="showPasswordConfirm"
            class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>

          <svg
            v-else
            class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              stroke-linecap="round"
              stroke-linejoin="round"/>
          </svg>
        </button>
      </template>
    </BaseInput>

    <BaseButton class="w-full" size="lg" type="submit">{{
        isRegister ? "Create Account" : "Sign in"
      }}
    </BaseButton>
  </form>
</template>
