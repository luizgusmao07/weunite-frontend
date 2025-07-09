import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use((config) => {
  const jwt = useAuthStore.getState().jwt;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

