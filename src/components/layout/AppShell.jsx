import { createContext, useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import Logo from "./Logo.jsx";
import { clearSession, readSession } from "../../lib/api/auth.js";

const SearchContext = createContext({ query: "", setQuery: () => {} });

export function useWorkspaceSearch() {
  return useContext(SearchContext);
}

const userLinks = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard", match: (path) => path === "/dashboard" },
  { to: "/cases", label: "My Cases", icon: "cases", match: (path) => path.startsWith("/cases") },
  { to: "/assessment/role", label: "Create New Case", icon: "plus", match: (path) => path.startsWith("/assessment") },
  { to: "/clients", label: "Client", icon: "clients", match: (path) => path.startsWith("/clients") },
];

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: "gauge", match: (path) => path === "/admin" },
  { to: "/admin/users", label: "User Management", icon: "clients", match: (path) => path.startsWith("/admin/users") },
  { to: "/admin/cases", label: "Case Review", icon: "cases", match: (path) => path.startsWith("/admin/cases") },
  { to: "/admin/administrators", label: "Administrators", icon: "shield", match: (path) => path.startsWith("/admin/administrators") },
  { to: "/admin/settings", label: "Settings", icon: "settings", match: (path) => path.startsWith("/admin/settings") },
];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "dashboard") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (name === "cases") {
    return (
      <svg {...common}>
        <path d="M4 7h16v12H4z" />
        <path d="M8 7V5h8v2" />
        <path d="M4 12h16" />
      </svg>
    );
  }
  if (name === "plus") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    );
  }
  if (name === "clients") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14.4 16 15 19" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M16.2 14.6c2 .4 3.4 1.6 4 3.4" />
      </svg>
    );
  }
  if (name === "logout") {
    return (
      <svg {...common}>
        <path d="M10 7V5H5v14h5v-2" />
        <path d="M10 12h9" />
        <path d="M16 8l4 4-4 4" />
      </svg>
    );
  }
  if (name === "gauge") {
    return (
      <svg {...common}>
        <path d="M5 16a7 7 0 1 1 14 0" />
        <path d="M12 16l4-5" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v6c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (name === "settings") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }
  if (name === "bell") {
    return (
      <svg {...common}>
        <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

function SideNav({ links, onNavigate, tone = "dark" }) {
  const { pathname } = useLocation();

  return (
    <nav className="mt-6 space-y-1">
      {links.map((link) => {
        const active = link.match(pathname);
        const activeClass = tone === "green" ? "bg-[#12B981] text-white" : "bg-[#071417] text-white";
        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin" || link.to === "/dashboard"}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              active ? activeClass : "text-white/85 hover:bg-white/10"
            }`}
          >
            <Icon name={link.icon} />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function Sidebar({ variant, onNavigate, className = "" }) {
  const navigate = useNavigate();
  const links = variant === "admin" ? adminLinks : userLinks;

  function logout() {
    clearSession();
    navigate(variant === "admin" ? "/admin/login" : "/login");
  }

  return (
    <div className={`flex h-full flex-col bg-[#0e4c57] px-4 py-5 text-white ${className}`}>
      <Logo className="h-10" />
      <SideNav links={links} onNavigate={onNavigate} tone={variant === "admin" ? "green" : "dark"} />
      {variant === "admin" ? null : (
        <button
          type="button"
          onClick={logout}
          className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
        >
          <Icon name="logout" />
          Logout
        </button>
      )}
    </div>
  );
}

export default function AppShell({ children, variant = "user" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const session = readSession();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const name = session?.name || "Sarah Mitchell";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function openAccount() {
    if (variant === "user") navigate("/account");
  }

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <div className={`workspace-shell min-h-screen md:grid md:grid-cols-[232px_1fr] ${variant === "admin" ? "bg-[#e7f4ef]" : "bg-[#e7ecee]"}`}>
        <aside className="hidden md:block md:min-h-screen">
          <Sidebar variant={variant} className="sticky top-0 h-screen" />
        </aside>

        {open ? (
          <div className="fixed inset-0 z-40 md:hidden">
            <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <aside className="relative h-full w-[260px] max-w-[80vw]">
              <Sidebar variant={variant} onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        ) : null}

        <div className="flex min-h-screen min-w-0 flex-col">
          {variant === "admin" ? <AdminHeader onMenu={() => setOpen(true)} /> : null}
          {variant === "admin" ? null : (
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-black/5 bg-[#f4f6f7] px-3 py-3 sm:px-5">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-[#0e4c57] md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <label className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-black/5 bg-white px-3 md:flex">
              <span className="text-[#98a2b3]">
                <Icon name="search" />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search candidates, jobs, clients..."
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-[#b0b7c3]"
              />
            </label>
            <button type="button" className="ml-auto grid h-10 w-10 place-items-center rounded-full text-[#667085]" aria-label="Notifications">
              <Icon name="bell" />
            </button>
            <button type="button" onClick={openAccount} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-left hover:bg-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#111] text-[11px] font-semibold text-white">{initials}</span>
              <span className="hidden text-sm font-semibold text-ink sm:block">{name}</span>
            </button>
          </header>
          )}
          {variant === "user" ? (
          <div className="border-b border-black/5 bg-[#f4f6f7] px-3 py-3 md:hidden">
            <label className="flex items-center gap-2 rounded-lg border border-black/5 bg-white px-3">
              <span className="text-[#98a2b3]">
                <Icon name="search" />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search candidates, jobs, clients..."
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-[#b0b7c3]"
              />
            </label>
          </div>
          ) : null}
          <main className="flex-1 px-3 py-4 sm:px-5 sm:py-6 lg:px-6">{children}</main>
        </div>
      </div>
    </SearchContext.Provider>
  );
}
