<script setup>
import {ref} from 'vue'
import {RouterLink, useRouter} from 'vue-router'
import Logo from "@/components/Logo.vue";
import AuthForm from "@/components/AuthForm.vue";
import * as authService from '@/services/authService.js'

const router = useRouter()
const errorMessage = ref('')

async function handleSubmit({firstName, lastName, email, password, passwordConfirm}) {
  errorMessage.value = ''

  if (password !== passwordConfirm) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if(!firstName || firstName.trim() === ''){
    errorMessage.value = 'first name is required'
  }
  if (!lastName || lastName.trim() === '')

  try {
    await authService.register({firstName, lastName, email, password})
    await router.replace('/')
  } catch (error) {
    errorMessage.value = error.message || 'Unable to create your account.'
  }
}
</script>

<template>
  <div>
    <Logo/>

    <h1 class="mt-16 text-4xl font-bold text-primary">Create your account</h1>
    <p class="mt-3 text-lg text-muted">
      Already have an account?
      <RouterLink class="text-amber transition hover:text-amber-light" to="/login">
        Sign In
      </RouterLink>
    </p>

    <AuthForm variant="register" @submit="handleSubmit"/>
    <p v-if="errorMessage" class="mt-4 text-red" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>
