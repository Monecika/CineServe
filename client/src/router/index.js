import {createRouter, createWebHistory} from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

import HomeView from '@/views/main/home/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ScreeningsView from '@/views/main/ScreeningsView.vue'
import ScreeningDetailsView from '@/views/main/screeningDetails/ScreeningDetailsView.vue'
import SeatSelectionView from '@/views/main/seatSelection/SeatSelectionView.vue'
import DashboardView from '@/views/user/DashboardView.vue'
import ReservationsView from '@/views/user/ReservationsView.vue'
import ProfileView from '@/views/user/ProfileView.vue'

import {useAuth} from '@/composables/useAuth.js'
import AdminUsersView from "@/views/user/admin/AdminUsersView.vue";
import AdminScreeningsView from "@/views/user/admin/AdminScreeningsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'screenings', name: 'screenings', component: ScreeningsView
        },
        {
          path: 'screenings/:slug',
          name: 'screening',
          component: ScreeningDetailsView,
        },
        {
          path: 'screenings/:slug/seats',
          name: 'screeningSeats',
          component: SeatSelectionView,
          meta: {requiresAuth: true, requiresUser: true},
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: {requiresAuth: true, requiresUser: true},
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: ReservationsView,
          meta: {requiresAuth: true, requiresUser: true},
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
          meta: {requiresAuth: true, requiresUser: true},
        },
        {
          path: 'examples',
          name: 'examples',
          component: () => import('@/views/ExamplesView.vue'),
        },
      ],
    },

    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      children: [
        {
          path: '',
          redirect: {name: 'admin-users'},
        },
        {
          path: 'users',
          name: 'admin-users',
          component: AdminUsersView,
        },
        {
          path: 'screenings',
          name: 'admin-screenings',
          component: AdminScreeningsView,
        },
      ],
    },

    {
      path: '/',
      component: CenteredLayout,
      children: [
        {path: 'login', name: 'login', component: LoginView},
        {path: 'register', name: 'register', component: RegisterView},
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: CenteredLayout,
      children: [
        {
          path: '',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue'),
          props: true,
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const {ready, isLoggedIn, isAdmin, isUser} = useAuth()
  await ready

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return {
      name: 'login',
      query: {redirect: to.fullPath},
    }
  }

  if (to.meta.requiresUser && !isUser.value) {
    return isAdmin.value ? {name: 'admin-users'} : {name: 'home'}
  }

  if (to.meta.requiresAdmin && !isAdmin.value) {
    return {name: 'home'}
  }
})

export default router
