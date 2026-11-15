<script setup>
import { RouterView } from 'vue-router'
import AdminSidebar from "@/layouts/parts/AdminSidebar.vue"
import AppHeader from "@/layouts/parts/header/AppHeader.vue"
</script>

<template>
  <main class="min-h-screen bg-navy">
    <AppHeader />

    <div class="flex min-h-screen flex-col px-5 lg:flex-row">
      <AdminSidebar />

      <section class="min-w-0 flex-1 p-6 lg:p-10">
        <RouterView />
      </section>
    </div>
  </main>
</template>
