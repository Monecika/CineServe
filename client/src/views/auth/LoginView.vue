<script setup>
import {ref} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import Logo from "@/components/Logo.vue";
import AuthForm from "@/components/AuthForm.vue";
import {useAuth} from "@/composables/useAuth.js";

const router = useRouter();
const route = useRoute();

const {login} = useAuth();
const errorMessage = ref('')

const handleSubmit = async (email, password) => {
  errorMessage.value = ''

  if (!password || password.trim().length < 8) {
    errorMessage.value = 'Password is required';
  }

  try {
    await login({
      email,
      password,
    });

    const redirect = route.query.redirect || "/";
    router.push(redirect);
  } catch (error) {
    errorMessage.value = error.message || 'Unable to sign in.'
  }
}
</script>

<template>
  <div>
    <Logo/>

    <h1 class="mt-16 text-4xl font-bold text-primary">Sign in to your account</h1>
    <p class="mt-3 text-lg text-muted">
      Don't have an account?
      <RouterLink class="text-amber transition hover:text-amber-light" to="/register">
        Create one for free
      </RouterLink>
    </p>

    <AuthForm @submit="handleSubmit"/>
    <p v-if="errorMessage" class="mt-4 text-red" role="alert">
      {{ errorMessage }}
    </p>

    <div class="text-primary">
      <div class="flex gap-5">
        <p>alex.rivera@example.com</p>
        <p>password123</p>
      </div>
      <div class="flex gap-5">
        <p>admin@cinereserve.com</p>
        <p>password123</p>
      </div>
      <div class="flex gap-5">
        <p>mona@cinereserve.com</p>
        <p>password123</p>
      </div>
    </div>
  </div>
</template>
