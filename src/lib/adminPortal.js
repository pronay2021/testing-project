const PROFILE_KEY = "a2-admin-profile";
const KEY_KEY = "a2-admin-api-key";

export const defaultAdminProfile = {
  name: "Moni Roy",
  email: "moni.roy@a2.care",
  phone: "+88084454556444",
  role: "Super Admin",
};

export function readAdminProfile() {
  const raw = sessionStorage.getItem(PROFILE_KEY);
  if (!raw) return { ...defaultAdminProfile };
  try {
    return { ...defaultAdminProfile, ...JSON.parse(raw) };
  } catch {
    return { ...defaultAdminProfile };
  }
}

export function saveAdminProfile(profile) {
  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function readApiKey() {
  return sessionStorage.getItem(KEY_KEY) || "";
}

export function saveApiKey(value) {
  sessionStorage.setItem(KEY_KEY, value);
}

export const portalUsers = [
  { id: "u1", sl: "#1233", name: "Kathryn Murp", email: "bockely@att.com", plan: "Monthly", registered: "22 Nov 2022" },
  { id: "u2", sl: "#1233", name: "Devon Lane", email: "csilvers@rizon.com", plan: "Free", registered: "22 Nov 2022" },
  { id: "u3", sl: "#1233", name: "Foysal Rahman", email: "qamaho@gmail.com", plan: "Monthly", registered: "22 Nov 2022" },
  { id: "u4", sl: "#1233", name: "Hari Danang", email: "xterris@gmail.com", plan: "Yearly", registered: "22 Nov 2022" },
  { id: "u5", sl: "#1233", name: "Floyd Miles", email: "xterris@gmail.com", plan: "Yearly", registered: "22 Nov 2022" },
  { id: "u6", sl: "#1233", name: "Eleanor Pena", email: "xterris@gmail.com", plan: "Free", registered: "22 Nov 2022" },
  { id: "u7", sl: "#1233", name: "Devon Lane", email: "xterris@gmail.com", plan: "Free", registered: "22 Nov 2022" },
  { id: "u8", sl: "#1233", name: "Hari Danang", email: "xterris@gmail.com", plan: "Free", registered: "22 Nov 2022" },
  { id: "u9", sl: "#1233", name: "Devon Lane", email: "xterris@gmail.com", plan: "Monthly", registered: "22 Nov 2022" },
  { id: "u10", sl: "#1233", name: "Hari Danang", email: "xterris@gmail.com", plan: "Yearly", registered: "22 Nov 2022" },
];

export const overviewStats = [
  { label: "Active Users Today", value: "1320", tone: "text-emerald-600", mark: "✓" },
  { label: "New Users (Last 7 Days)", value: "8", tone: "text-amber-500", mark: "NEW" },
  { label: "Total Users", value: "4,55,666", tone: "text-sky-600", mark: "☺" },
  { label: "Total Paying User", value: "41", tone: "text-amber-500", mark: "♛" },
  { label: "Monthly Revenue", value: "$500", tone: "text-yellow-500", mark: "$" },
];

const ADMINS_KEY = "a2-administrators";

export const seedAdmins = [
  { id: "a1", sl: "#1233", name: "Kathryn Murp", email: "bockely@att.com", access: "Super Admin" },
  { id: "a2", sl: "#1233", name: "Devon Lane", email: "csilvers@rizon.com", access: "Admin" },
  { id: "a3", sl: "#1233", name: "Foysal Rahman", email: "qamaho@gmail.com", access: "Admin" },
  { id: "a4", sl: "#1233", name: "Hari Danang", email: "xterris@gmail.com", access: "Admin" },
  { id: "a5", sl: "#1233", name: "Floyd Miles", email: "xterris@gmail.com", access: "Admin" },
  { id: "a6", sl: "#1233", name: "Eleanor Pena", email: "xterris@gmail.com", access: "Admin" },
  { id: "a7", sl: "#1233", name: "Devon Lane", email: "xterris@gmail.com", access: "Admin" },
  { id: "a8", sl: "#1233", name: "Hari Danang", email: "xterris@gmail.com", access: "Admin" },
];

export function readAdmins() {
  const raw = sessionStorage.getItem(ADMINS_KEY);
  if (!raw) return seedAdmins;
  try {
    return JSON.parse(raw);
  } catch {
    return seedAdmins;
  }
}

export function saveAdmins(admins) {
  sessionStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
}
