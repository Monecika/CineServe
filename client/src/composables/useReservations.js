import {onMounted, ref} from 'vue'
import {useAuth} from "@/composables/useAuth.js";
import * as reservationService from "@/services/reservationService.js";

export const useReservations = () => {
  const {getToken} = useAuth()

  const reservations = ref([])

  const filterByStatus = (status) =>
    reservations.value.filter((reservation) => reservation.status === status)

  const countByStatus = (status) => filterByStatus(status).length

  onMounted(async () => {
    reservations.value = await reservationService.getUserReservations(getToken())
  })

  return {reservations, filterByStatus, countByStatus}
}
