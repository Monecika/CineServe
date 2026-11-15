<script setup>
import {ref, watch} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import BaseButton from "@/components/primitives/BaseButton.vue";
import {useAuth} from "@/composables/useAuth.js";

const route = useRoute();
const router = useRouter();

const isOpen = ref(false);

const userLinks = [
  {
    title: "My Dashboard",
    to: "/dashboard"
  },
  {
    title: "My Reservations",
    to: "/reservations"
  },
  {
    title: "My Profile",
    to: "/profile"
  }
]

const {user, isAdmin, isUser, logout} = useAuth();

const initials = user.value.firstName.slice(0, 1) + user.value.lastName.slice(0, 1);

watch(() => route.fullPath, () => (isOpen.value = false))

const signOut = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="relative">
    <button
      class="flex cursor-pointer items-center gap-3 rounded-full text-primary font-bold border border-steel bg-navy-card p-2 transition hover:bg-navy-elevated"
      type="button"
      @click="isOpen = !isOpen"
    >
      <span
        class="size-9 flex items-center justify-center rounded-full bg-amber text-navy">
        {{ initials }}
      </span>
      {{ user.firstName }}

      <svg :class="{'rotate-180': isOpen}" class="size-4" fill="none"
           stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path d="m4.5 15.75 7.5-7.5 7.5 7.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute w-72 right-0 mt-2 overflow-hidden rounded-2xl border border-navy bg-navy-card shadow-2xl"
    >
      <div class="border-b border-steel px-5 py-4">
        <p class="text-primary">{{ user.firstName }} {{ user.lastName }}</p>
        <p class="text-sm text-muted">{{ user.email }}</p>
      </div>

      <div class="p-2 border-y border-steel">
        <template v-if="isUser">
          <RouterLink
            v-for="link in userLinks"
            :key="link.title"
            :to="link.to"
            @click="isOpen = false"
            class="block p-2 rounded-xl text-secondary transition hover:bg-navy-elevated hover:text-primary">
            {{ link.title }}
          </RouterLink>
        </template>

        <RouterLink
          v-if="isAdmin"
          class="block p-2 text-purple transition hover:bg-navy-elevated"
          to="/admin"
          @click="isOpen = false">
          Admin panel
        </RouterLink>
      </div>

      <div class="p-2">
        <BaseButton class="mt-2 w-full" variant="danger" @click="signOut()">Sign Out</BaseButton>
      </div>
    </div>
  </div>
</template>
