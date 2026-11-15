import * as api from "@/services/apiService.js";

const baseUrl = "/movies"

export async function getAllMovies() {
  return await api.get(baseUrl);
}

export async function getMovie(slug) {
  return await api.get(baseUrl + "/" + slug);
}
