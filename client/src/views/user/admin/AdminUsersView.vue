<script setup>
import {computed, onMounted, ref} from 'vue'
import BaseButton from '@/components/primitives/BaseButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import {useAuth} from '@/composables/useAuth.js'
import * as adminService from '@/services/adminService.js'

const {getToken} = useAuth()

const users = ref([])
const searchQuery = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const filteredUsers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return users.value

  return users.value.filter((user) =>
    user.email.toLowerCase().includes(query)
  )
});

onMounted(async () => {
  errorMessage.value = ''

  try {
    users.value = await adminService.getUsers(getToken())
    users.value.forEach((user) => {
      user.roles = [...(user.roles ?? [])]
    })
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load users.'
  }
})

async function saveUser(user) {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !user.roles.length ||
    user.roles.length > 2 ||
    user.roles.some((role) => !['user', 'admin'].includes(role)) ||
    !['active', 'inactive'].includes(user.status)
  ) {
    errorMessage.value = 'Choose at least one valid role and a valid account status.'
    return
  }

  try {
    await adminService.updateUser(getToken(), user.id, {
      roles: user.roles,
      status: user.status,
    })

    successMessage.value = `Updated access for ${user.email}.`
  } catch (error) {
    errorMessage.value = error.message || 'Unable to update user access.'
  }
}
</script>

<template>
  <section>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-primary">
        Manage users
      </h2>
      <p class="mt-1 text-secondary">
        Change account roles and access status.
      </p>
    </div>

    <p
      v-if="errorMessage"
      class="mb-5 rounded-lg border border-red/40 bg-red-dim p-3 text-red"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="successMessage"
      class="mb-5 rounded-lg border border-emerald/40 bg-emerald-dim p-3 text-emerald"
    >
      {{ successMessage }}
    </p>

    <SearchBar
      v-model="searchQuery"
      class="mb-5"
      placeholder="Search users by email"
    />

    <div>
      <table class="w-full text-left">
        <thead class="text-sm text-muted">
          <tr class="border-b border-steel *:py-3 *:pr-4 *:font-medium">
            <th>User</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-steel *:py-4 *:pr-4"
          >
            <td class="text-primary">
              {{ user.firstName }} {{ user.lastName }}
            </td>

            <td class="text-secondary">
              {{ user.email }}
            </td>

            <td>
              <label class="mr-3 inline-flex items-center gap-2 text-primary">
                <input v-model="user.roles" type="checkbox" value="user">
                User
              </label>
              <label class="inline-flex items-center gap-2 text-primary">
                <input v-model="user.roles" type="checkbox" value="admin">
                Admin
              </label>
            </td>

            <td>
              <select
                v-model="user.status"
                class="rounded-md border border-steel bg-navy-elevated p-2 text-primary"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </td>

            <td>
              <BaseButton @click="saveUser(user)">
                Save
              </BaseButton>
            </td>
          </tr>

          <tr v-if="!filteredUsers.length">
            <td class="py-8 text-center text-muted" colspan="5">
              {{ users.length ? 'No users match your search.' : 'No users found.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
