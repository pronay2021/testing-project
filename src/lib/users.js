import { adminUsers } from "./clients.js";

const KEY = "a2-users";

export function readUsers() {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return adminUsers;
  try {
    return JSON.parse(raw);
  } catch {
    return adminUsers;
  }
}

export function saveUsers(users) {
  sessionStorage.setItem(KEY, JSON.stringify(users));
}

export function addUser(user) {
  const users = readUsers();
  const next = [{ id: `u${Date.now()}`, status: "Active", ...user }, ...users];
  saveUsers(next);
  return next;
}

export function updateUser(id, patch) {
  const users = readUsers().map((user) => (user.id === id ? { ...user, ...patch } : user));
  saveUsers(users);
  return users.find((user) => user.id === id);
}
