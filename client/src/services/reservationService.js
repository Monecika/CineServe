import * as api from "@/services/apiService.js";

const baseUrl = "/reservations";

export async function getUserReservations(token) {
  return await api.get(baseUrl + "/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function cancelReservation(token, reservationId) {
  return await api.patch(baseUrl + `/${reservationId}/cancel`, {}, {
    headers: {Authorization: `Bearer ${token}`}
  });
}

export async function createReservation(token, reservation) {
  if (!token) throw new Error('You must be signed in to book seats.');
  return await api.post(baseUrl, reservation, {
    headers: {Authorization: `Bearer ${token}`}
  });
}
