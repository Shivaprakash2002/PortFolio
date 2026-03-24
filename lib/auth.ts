// Simple session-based auth using sessionStorage
// Credentials are validated server-side via API route

export const AUTH_KEY = "portfolio_admin_auth";

/**
 * Check if the current session is authenticated.
 * Returns false on server (no sessionStorage available).
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

/** Mark session as authenticated */
export function setAuthenticated(): void {
  sessionStorage.setItem(AUTH_KEY, "true");
}

/** Clear authentication and remove session flag */
export function clearAuth(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
