<script setup>
defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  isUser: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div class="border-t border-steel-subtle bg-navy px-6 py-4 md:hidden">
    <div class="flex flex-col gap-2">
      <RouterLink
        class="nav-item nav-item--base"
        exact-active-class="active"
        to="/"
        @click="close"
      >
        Home
      </RouterLink>

      <RouterLink
        class="nav-item nav-item--base"
        exact-active-class="active"
        to="/screenings"
        @click="close"
      >
        Screenings
      </RouterLink>

      <div class="my-2 border-t border-steel-subtle"></div>

      <template v-if="isLoggedIn">
        <RouterLink
          v-if="isUser"
          class="nav-item nav-item--base"
          to="/reservations"
          @click="close"
        >
          My reservations
        </RouterLink>

        <RouterLink
          v-if="isUser"
          class="nav-item nav-item--base"
          to="/profile"
          @click="close"
        >
          My Profile
        </RouterLink>

        <RouterLink
          v-if="isAdmin"
          class="nav-item nav-item--base"
          to="/admin"
          @click="close"
        >
          Admin panel
        </RouterLink>

        <button
          class="nav-item nav-item--base text-left"
          @click="close"
        >
          Sign out
        </button>
      </template>

      <template v-else>
        <RouterLink
          class="nav-item nav-item--base"
          to="/login"
          @click="close"
        >
          Sign in
        </RouterLink>

        <RouterLink
          class="nav-item nav-item--amber"
          to="/register"
          @click="close"
        >
          Get started
        </RouterLink>
      </template>
    </div>
  </div>
</template>
