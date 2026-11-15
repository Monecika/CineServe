<script setup>
import {onMounted, ref} from 'vue'
import BaseButton from '@/components/primitives/BaseButton.vue'
import BaseInput from '@/components/primitives/BaseInput.vue'
import {useAuth} from '@/composables/useAuth.js'
import * as userService from '@/services/userService.js'

const {user, getToken} = useAuth()

const profile = ref({firstName: '', lastName: '', email: ''})
const passwords = ref({current: '', new: '', confirm: ''})
const errorMessage = ref('')
const successMessage = ref('')

onMounted(() => {
  profile.value = {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
  }
})

async function saveProfile() {
  errorMessage.value = ''
  successMessage.value = ''

  const {current, new: newPassword, confirm} = passwords.value

  if (newPassword && newPassword !== confirm) {
    errorMessage.value = 'The new passwords do not match.'
    return
  }

  const updates = {...profile.value}

  if (newPassword) {
    updates.currentPassword = current
    updates.newPassword = newPassword
  }

  try {
    await userService.updateCurrentUser(getToken(), updates)
    user.value = await userService.getCurrentUser(getToken())

    profile.value = {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      email: user.value.email,
    }

    passwords.value = {current: '', new: '', confirm: ''}
    successMessage.value = 'Your profile has been updated.'
  } catch (error) {
    errorMessage.value = error.message || 'Unable to update your profile.'
  }
}
</script>

<template>
  <section class="mx-auto w-full max-w-4xl">
    <h1 class="mb-3 text-4xl font-bold text-primary">My Profile</h1>
    <p class="mb-8 text-muted">Manage your personal details and password.</p>

    <form class="flex flex-col gap-8" @submit.prevent="saveProfile">
      <section class="border-b border-steel pb-8">
        <h2 class="mb-4 text-xl font-semibold text-primary">Personal details</h2>

        <div class="grid gap-4 md:grid-cols-2">
          <BaseInput
            v-model="profile.firstName"
            label="Name"
            placeholder="Your name"
          />

          <BaseInput
            v-model="profile.lastName"
            label="Surname"
            placeholder="Your surname"
          />

          <div class="md:col-span-2">
            <BaseInput
              v-model="profile.email"
              label="Email"
              placeholder="you@example.com"
              type="email"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-2 text-xl font-semibold text-primary">Change password</h2>
        <p class="mb-4 text-muted">Leave empty to keep your current password.</p>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="md:col-span-2">
            <BaseInput
              v-model="passwords.current"
              label="Current password"
              type="password"
            />
          </div>

          <BaseInput
            v-model="passwords.new"
            label="New password"
            type="password"
          />

          <BaseInput
            v-model="passwords.confirm"
            label="Confirm new password"
            type="password"
          />
        </div>
      </section>

      <div
        class="flex flex-col gap-3 border-t border-steel pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p v-if="errorMessage" class="text-red">{{ errorMessage }}</p>
        <p v-else-if="successMessage" class="text-emerald">{{ successMessage }}</p>

        <BaseButton type="submit">Save changes</BaseButton>
      </div>
    </form>
  </section>
</template>
