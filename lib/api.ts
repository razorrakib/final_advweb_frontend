/** Summary:
 * Axios instance for NestJS API.
 * Adds Bearer token automatically from localStorage.
 * Central place for baseURL + error handling.
 */
import axios from "axios";
import { getAuth, logout } from "./auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  const auth = typeof window !== "undefined" ? getAuth() : null;
  if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) logout();
    return Promise.reject(err);
  }
);
