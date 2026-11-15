import * as api from "@/services/apiService.js";

const baseUrl = "/users";

export async function getCurrentUser(token) {
  return await api.get(baseUrl + "/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function updateCurrentUser(token, data) {
  return await api.put(baseUrl + '/me', data, {
    headers: {Authorization: `Bearer ${token}`}
  });
}
