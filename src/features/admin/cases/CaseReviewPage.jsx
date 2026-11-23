import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../components/ui/Avatar.jsx";
import { clients } from "../../../lib/clients.js";

export default function CaseReviewPage() {
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState("");
  const visible = useMemo(() => {
    const needle = applied.trim().toLowerCase();
    if (!needle) return clients;
    return clients.filter((client) => `${client.name} ${client.cardId} ${client.condition}`.toLowerCase().includes(needle));
  }, [applied]);

  return (
    <section className="rounded-2xl bg-white/70 p-3 sm:p-5">
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setApplied(query);
        }}
      >
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by email or name" className="h-11 flex-1 rounded-md bg-[#eceff1] px-4 text-sm outline-none" />
        <button type="submit" className="h-11 rounded-md bg-[#12B981] px-5 text-sm font-semibold text-white">
          Search
        </button>
      </form>
      {visible.length === 0 ? <p className="py-10 text-center text-sm text-[#667085]">No cases match that search.</p> : null}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((client) => (
          <article key={client.id} className="rounded-xl border border-black/5 bg-white p-4">
            <div className="flex items-center gap-3">
              <Avatar name={client.name} />
              <div>
                <h2 className="font-semibold text-ink">{client.name}</h2>
                <p className="text-xs text-[#98a2b3]">{client.cardId}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-[#667085]">
              {client.age} yrs · {client.gender} · DOB {client.dob} · {client.condition}
            </p>
            <Link to={`/admin/cases/${client.id}`} className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#3DDC97] px-3 py-1.5 text-sm font-semibold text-[#12B981]">
              View Details →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
