<script setup>
import {ref, watch} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import Logo from '@/components/Logo.vue'
import UserMenu from "@/layouts/parts/header/UserMenu.vue";
import MobileDropdown from "@/layouts/parts/header/MobileDropdown.vue";
import {useAuth} from "@/composables/useAuth.js";

const route = useRoute()

const {isLoggedIn, isAdmin, isUser, user} = useAuth();

const isOpen = ref(false)

watch(() => route.fullPath, () => (isOpen.value = false))
</script>

<template>
  <header class="sticky z-99 top-0 border-b border-navy-subtle bg-navy/90 backdrop-blur">
    <nav class="flex h-16 items-center justify-between px-6 md:grid md:grid-cols-3 lg:px-12">
      <Logo/>

      <div class="hidden items-center justify-center gap-1 md:flex">
        <RouterLink
          class="nav-item nav-item--base"
          exact-active-class="active"
          to="/"
        >
          Home
        </RouterLink>

        <RouterLink
          class="nav-item nav-item--base"
          exact-active-class="active"
          to="/screenings"
        >
          Screenings
        </RouterLink>
      </div>

      <div class="hidden justify-self-end md:block">
        <UserMenu v-if="isLoggedIn"/>
        <div v-else class="flex items-center gap-2">
          <RouterLink
            class="nav-item nav-item--base"
            to="/login"
          >
            Sign in
          </RouterLink>
          <RouterLink
            class="nav-item nav-item--amber"
            to="/register"
          >
            Get started
          </RouterLink>
        </div>
      </div>

      <button
        class="flex items-center justify-center size-10 cursor-pointer rounded-xl text-secondary transition hover:bg-navy-elevated hover:text-primary md:hidden"
        type="button"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!open" class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
        <svg v-else class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </nav>

    <MobileDropdown
      v-if="isOpen"
      :is-logged-in="isLoggedIn"
      :is-admin="isAdmin"
      :is-user="isUser"
      @close="isOpen = false"
    />
  </header>
</template>
