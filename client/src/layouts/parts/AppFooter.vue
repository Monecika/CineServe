<script setup>
import {RouterLink} from 'vue-router'
import Logo from "@/components/Logo.vue";

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-steel-subtle bg-navy-card px-6 py-12 lg:px-12">
    <div class="grid gap-10 md:grid-cols-3 md:justify-items-center">
      <div class="flex flex-col gap-3 justify-self-start">
        <Logo/>

        <p class="text-lg text-muted">
          Your cinema, your seats. Reserve with confidence.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-primary">Discover</h3>
        <ul class="mt-4 space-y-3">
          <li>
            <RouterLink
              class="text-lg text-muted transition hover:text-primary"
              to="/"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="text-lg text-muted transition hover:text-primary"
              to="/screenings"
            >
              Screenings
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-primary">Account</h3>
        <ul class="mt-4 space-y-3">
          <li>
            <RouterLink
              class="text-lg text-muted transition hover:text-primary"
              to="/login"
            >
              Sign In
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="text-lg text-muted transition hover:text-primary"
              to="/register"
            >
              Register
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mx-auto mt-10 border-t border-steel-subtle pt-6 text-muted text-center">
      &copy; {{ year }} CineReserve. HBO-ICT Web Advanced project.
    </div>
  </footer>
</template>
