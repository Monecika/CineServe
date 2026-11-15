import {useAuthStore} from "@/stores/authStore.js";
import {storeToRefs} from "pinia";

export const useAuth = () => {
  const auth = useAuthStore()
  const {user, isLoggedIn, isAdmin, isUser} = storeToRefs(auth)
  const {login, logout, getToken, ready} = auth

  return {user, isLoggedIn, isAdmin, isUser, ready, login, logout, getToken}
}
