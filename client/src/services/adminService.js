import * as api from '@/services/apiService.js'

function withToken(token) {
  return {headers: {Authorization: `Bearer ${token}`}}
}

export async function getUsers(token) {
  return await api.get('/users', withToken(token))
}

export async function updateUser(token, userId, updates) {
  return await api.put(`/users/${userId}`, updates, withToken(token))
}

export async function getHalls(token) {
  return await api.get('/halls', withToken(token))
}

export async function createScreening(token, screening) {
  return await api.post('/movies', screening, withToken(token))
}

export async function updateScreening(token, slug, screening) {
  return await api.put(`/movies/${slug}`, screening, withToken(token))
}

export async function deleteScreening(token, slug) {
  return await api.del(`/movies/${slug}`, withToken(token))
}
