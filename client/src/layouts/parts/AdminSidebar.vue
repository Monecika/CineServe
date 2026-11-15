<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside
    class="border-r border-steel p-5 sticky top-20 h-fit"
  >
    <p class="pl-4 mb-6 text-sm font-semibold text-amber">
      Cinema Operations
    </p>

    <nav class="flex gap-2 lg:flex-col">
      <RouterLink
        class="nav-item nav-item--base"
        exact-active-class="active"
        to="/admin/users"
      >
        Manage Users
      </RouterLink>

      <RouterLink
        class="nav-item nav-item--base"
        exact-active-class="active"
        to="/admin/screenings"
      >
        Manage Screenings
      </RouterLink>
    </nav>
  </aside>
</template>
