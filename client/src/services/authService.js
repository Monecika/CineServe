import * as api from "@/services/apiService.js";

async function request(url, data) {
  return await api.post("/auth" + url, data);
}

export async function login(data) {
  return await request("/login", data);
}

export async function register(data) {
  return await request("/register", data);
}
