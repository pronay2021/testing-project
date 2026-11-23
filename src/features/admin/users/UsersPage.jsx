import { useMemo, useState } from "react";
import Modal from "../../../components/admin/Modal.jsx";
import { portalUsers } from "../../../lib/adminPortal.js";

const PAGE_SIZE = 8;

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [actionUser, setActionUser] = useState(null);
  const [disabled, setDisabled] = useState({});
  const [removed, setRemoved] = useState({});

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return portalUsers.filter((user) => !removed[user.id] && (!needle || `${user.name} ${user.email}`.toLowerCase().includes(needle)));
  }, [query, removed]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <section className="rounded-2xl bg-white/80 p-3 sm:p-5">
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setPage(1);
        }}
      >
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by email or name"
          className="h-11 flex-1 rounded-md bg-[#eceff1] px-4 text-sm outline-none"
        />
        <button type="submit" className="h-11 rounded-md bg-[#12B981] px-5 text-sm font-semibold text-white">
          Search
        </button>
      </form>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="text-[#667085]">
            <tr>
              <th className="px-3 py-3 font-medium">SL no.</th>
              <th className="px-3 py-3 font-medium">Full Name</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Current Plan</th>
              <th className="px-3 py-3 font-medium">Registration Date</th>
              <th className="px-3 py-3 font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user) => (
              <tr key={user.id} className="border-t border-black/5">
                <td className="px-3 py-3">{user.sl}</td>
                <td className="px-3 py-3">{user.name}</td>
                <td className="px-3 py-3">{user.email}</td>
                <td className="px-3 py-3">{disabled[user.id] ? "Disabled" : user.plan}</td>
                <td className="px-3 py-3">{user.registered}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setSelected(user)} className="rounded-md bg-[#d1fae5] px-3 py-1.5 text-xs font-semibold text-[#067a52]">
                      View Details
                    </button>
                    <button type="button" onClick={() => setActionUser(user)} className="rounded-md border border-[#e4e7ec] px-3 py-1.5 text-xs font-semibold text-[#344054]">
                      Action
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="py-8 text-center text-sm text-[#667085]">No users match that search.</p> : null}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-md bg-[#12B981] px-3 py-1.5 text-sm font-semibold text-white">
          &lt; Prev
        </button>
        {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => setPage(number)}
            className={`grid h-8 w-8 place-items-center rounded-md text-sm ${number === safePage ? "bg-white font-semibold text-ink shadow-sm" : "text-[#667085]"}`}
          >
            {number}
          </button>
        ))}
        <button type="button" onClick={() => setPage((current) => Math.min(pages, current + 1))} className="rounded-md bg-[#12B981] px-3 py-1.5 text-sm font-semibold text-white">
          Next &gt;
        </button>
      </div>

      {selected ? (
        <Modal title="User Detail Page" onClose={() => setSelected(null)} className="max-w-lg">
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-4"><dt>Name</dt><dd className="text-[#667085]">{selected.name}</dd></div>
            <div className="flex justify-between gap-4"><dt>Email</dt><dd className="text-[#667085]">{selected.email}</dd></div>
            <div className="flex justify-between gap-4"><dt>Current plan</dt><dd className="text-[#667085]">{disabled[selected.id] ? "Disabled" : selected.plan}</dd></div>
          </dl>
          <button type="button" onClick={() => setSelected(null)} className="mt-6 h-11 w-full rounded-md border border-[#12B981] text-sm font-semibold text-[#12B981]">
            Close
          </button>
        </Modal>
      ) : null}

      {actionUser ? (
        <Modal title="Action" onClose={() => setActionUser(null)} className="max-w-sm">
          <div className="flex items-center justify-between text-sm">
            <span>Disable User Access</span>
            <button
              type="button"
              aria-pressed={Boolean(disabled[actionUser.id])}
              onClick={() => setDisabled((current) => ({ ...current, [actionUser.id]: !current[actionUser.id] }))}
              className={`h-6 w-11 rounded-full p-1 ${disabled[actionUser.id] ? "bg-[#12B981]" : "bg-[#d0d5dd]"}`}
            >
              <span className={`block h-4 w-4 rounded-full bg-white transition ${disabled[actionUser.id] ? "translate-x-5" : ""}`} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span>Delete User Account</span>
            <button
              type="button"
              onClick={() => {
                setRemoved((current) => ({ ...current, [actionUser.id]: true }));
                setActionUser(null);
              }}
              className="rounded-md bg-[#12B981] px-3 py-1.5 text-xs font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}
