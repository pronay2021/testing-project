import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../admin/Modal.jsx";
import { clearSession, saveSession, readSession } from "../../lib/api/auth.js";
import { readAdminProfile, saveAdminProfile } from "../../lib/adminPortal.js";

const fieldClass = "h-11 w-full rounded-md border border-[#e4e7ec] bg-white px-3 text-sm outline-none focus:border-[#12B981]";

export default function AdminHeader({ onMenu }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profile, setProfile] = useState(readAdminProfile);
  const [draft, setDraft] = useState(profile);
  const [passwords, setPasswords] = useState({ old: "", next: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    function close(event) {
      if (!event.target.closest("[data-admin-profile]")) setOpen(false);
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function logout() {
    clearSession();
    navigate("/admin/login");
  }

  function saveAccount(event) {
    event.preventDefault();
    saveAdminProfile(draft);
    setProfile(draft);
    const session = readSession() || {};
    saveSession({ ...session, name: draft.name, email: draft.email, title: draft.role, role: "admin" });
    setAccountOpen(false);
  }

  function savePassword(event) {
    event.preventDefault();
    if (!passwords.old || passwords.next.length < 8 || passwords.next !== passwords.confirm) {
      setPasswordError("Enter the current password, then a new password of at least 8 characters that matches.");
      setPasswordSaved(false);
      return;
    }
    setPasswordError("");
    setPasswordSaved(true);
    setPasswords({ old: "", next: "", confirm: "" });
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-end bg-[#f3f6f5] px-3 py-3 sm:px-5">
      <button type="button" className="mr-auto grid h-10 w-10 place-items-center rounded-lg text-[#0e4c57] md:hidden" aria-label="Open menu" onClick={onMenu}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <div className="relative" data-admin-profile>
        <button type="button" onClick={() => setOpen((current) => !current)} className="flex items-center gap-2 rounded-full border border-black/5 bg-white py-1 pl-1 pr-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f3d2ea] text-xs font-semibold text-[#9d174d]">{profile.name.slice(0, 1)}</span>
          <span className="text-left">
            <span className="block text-sm font-semibold leading-4 text-ink">{profile.name}</span>
            <span className="block text-[11px] text-[#98a2b3]">{profile.role}</span>
          </span>
          <span className="text-xs text-[#98a2b3]">▾</span>
        </button>
        {open ? (
          <div className="absolute right-0 z-30 mt-2 w-64 rounded-2xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#dbeafe] text-sm font-semibold text-[#1d4ed8]">{profile.name.slice(0, 1)}</span>
              <span>
                <span className="block text-sm font-semibold text-ink">{profile.name}</span>
                <span className="mt-1 inline-flex rounded-full bg-[#12B981] px-2 py-0.5 text-[10px] font-semibold text-white">{profile.role}</span>
              </span>
            </div>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-between py-2 text-sm text-ink"
              onClick={() => {
                setDraft(profile);
                setOpen(false);
                setAccountOpen(true);
              }}
            >
              Profile <span>›</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between border-t border-black/5 py-2 text-sm text-ink"
              onClick={() => {
                setOpen(false);
                setPasswordOpen(true);
                setPasswordSaved(false);
              }}
            >
              Change Password <span>›</span>
            </button>
            <button type="button" onClick={logout} className="mt-3 h-10 w-full rounded-full bg-[#12B981] text-sm font-semibold text-white">
              Logout
            </button>
          </div>
        ) : null}
      </div>

      {accountOpen ? (
        <Modal title="Account Setting" onClose={() => setAccountOpen(false)}>
          <form onSubmit={saveAccount} className="space-y-3">
            {[
              ["name", "Name"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([key, label]) => (
              <label key={key} className="grid grid-cols-1 items-center gap-2 text-sm sm:grid-cols-[88px_1fr]">
                <span className="text-[#344054]">{label}</span>
                <input className={fieldClass} value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} />
              </label>
            ))}
            <label className="grid grid-cols-1 items-center gap-2 text-sm sm:grid-cols-[88px_1fr]">
              <span className="text-[#344054]">Role</span>
              <select className={fieldClass} value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })}>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Owner</option>
              </select>
            </label>
            <div className="grid grid-cols-1 items-center gap-2 text-sm sm:grid-cols-[88px_1fr]">
              <span className="text-[#12B981]">Image</span>
              <span className="flex overflow-hidden rounded-md border border-[#e4e7ec]">
                <span className="flex-1 bg-[#ececec] px-3 py-2 text-[#98a2b3]">Choose image</span>
                <button type="button" className="bg-[#dedede] px-3 text-sm">Choose</button>
              </span>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setAccountOpen(false)} className="h-10 flex-1 rounded-md border border-[#12B981] text-sm font-semibold text-[#12B981]">
                Cancel
              </button>
              <button type="submit" className="h-10 flex-1 rounded-md bg-[#12B981] text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {passwordOpen ? (
        <Modal title="Password Change" onClose={() => setPasswordOpen(false)}>
          <form onSubmit={savePassword} className="space-y-3">
            {[
              ["old", "Old Password", "text"],
              ["next", "New Password", "password"],
              ["confirm", "Re Type New Password", "password"],
            ].map(([key, label, type]) => (
              <label key={key} className="grid grid-cols-1 items-center gap-2 text-sm sm:grid-cols-[140px_1fr]">
                <span className="text-[#344054]">{label}</span>
                <input
                  type={type}
                  className={fieldClass}
                  value={passwords[key]}
                  onChange={(event) => setPasswords({ ...passwords, [key]: event.target.value })}
                />
              </label>
            ))}
            {passwordError ? <p className="text-xs text-red-500">{passwordError}</p> : null}
            {passwordSaved ? <p className="text-xs text-emerald-600">Password updated</p> : null}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setPasswordOpen(false)} className="h-10 flex-1 rounded-md border border-[#12B981] text-sm font-semibold text-[#12B981]">
                Cancel
              </button>
              <button type="submit" className="h-10 flex-1 rounded-md bg-[#12B981] text-sm font-semibold text-white">
                Update
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </header>
  );
}
