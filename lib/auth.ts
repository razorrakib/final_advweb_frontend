/** Summary:
 * Tiny auth helper: store token+role+name in localStorage for Axios + route guard.
 * Keep simple (no refresh tokens). Use logout() to clear state.
 */
export type Role = "admin" | "manager";

const KEY = "shopcart_auth";

export function saveAuth(data: { token: string; role: Role; name?: string }) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
export function getAuth(): { token: string; role: Role; name?: string } | null {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
export function logout() { localStorage.removeItem(KEY); }
