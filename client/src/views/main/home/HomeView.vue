<script setup>
import HomeHero from "@/views/main/home/HomeHero.vue";
import FeaturedScreenings from "@/views/main/home/FeaturedScreenings.vue";
import BaseButton from "@/components/primitives/BaseButton.vue";
import {useAuth} from "@/composables/useAuth.js";

const {isLoggedIn} = useAuth();
</script>

<template>
  <HomeHero/>
  <FeaturedScreenings/>

  <section
    v-if="!isLoggedIn"
    class="px-8 py-10 flex flex-col gap-8 rounded-3xl border border-steel bg-navy-elevated md:flex-row md:items-center md:justify-between lg:px-16"
  >
    <div>
      <h2 class="text-3xl font-bold text-primary">Ready to reserve?</h2>
      <p class="mt-3 text-lg text-secondary">Create a free account and start booking your favourite
        seats today.</p>
    </div>

    <div class="flex flex-wrap items-center gap-4 *:w-full">
      <BaseButton to="/" variant="secondary">Sign In</BaseButton>
      <BaseButton to="/register">Create account</BaseButton>
    </div>
  </section>
</template>
