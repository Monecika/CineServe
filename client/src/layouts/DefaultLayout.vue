<script setup>
import {RouterView} from 'vue-router'
import AppHeader from "@/layouts/parts/header/AppHeader.vue";
import AppFooter from "@/layouts/parts/AppFooter.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-navy text-primary">
    <AppHeader/>

    <main class="w-full flex-1 px-6 py-20 lg:px-12 flex flex-col gap-15">
      <RouterView/>
    </main>

    <AppFooter/>
  </div>
</template>
