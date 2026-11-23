const PENDING_KEY = "a2-pending-auth";
const SESSION_KEY = "a2-session";

export function savePendingAuth(pending) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
}

export function readPendingAuth() {
  const raw = sessionStorage.getItem(PENDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearPendingAuth() {
  sessionStorage.removeItem(PENDING_KEY);
}

export function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function readSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
