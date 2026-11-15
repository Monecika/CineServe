import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import * as authService from '@/services/authService.js'
import * as userService from '@/services/userService.js'

const getToken = () => localStorage.getItem('token')

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isLoggedIn = computed(() => !!user.value)

  const isAdmin = computed(() => user.value?.roles?.includes('admin'))
  const isUser = computed(() => user.value?.roles?.includes('user'))

  async function login(data) {
    const response = await authService.login(data)

    localStorage.setItem('token', response.token)

    if (response.user) {
      user.value = response.user
    } else {
      await fetchUser()
    }
  }

  async function fetchUser() {
    const token = getToken()

    if (!token) {
      user.value = null
      return
    }

    try {
      user.value = await userService.getCurrentUser(token)
    } catch (error) {
      console.error('Failed to load current user:', error)
      user.value = null
      localStorage.removeItem("token");
    }
  }

  function logout() {
    localStorage.removeItem('token')
    user.value = null
  }

  const ready = fetchUser()

  return {user, isLoggedIn, isAdmin, isUser, ready, login, logout, getToken}
})
