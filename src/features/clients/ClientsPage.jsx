import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar.jsx";
import { useWorkspaceSearch } from "../../components/layout/AppShell.jsx";
import { clients } from "../../lib/clients.js";

export default function ClientsPage() {
  const { query } = useWorkspaceSearch();
  const needle = query.trim().toLowerCase();
  const visible = clients.filter((client) => {
    if (!needle) return true;
    return [client.name, client.cardId, client.id, client.condition, client.gender, client.location]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-[28px]">Clients</h1>
      <p className="mt-1 max-w-3xl text-sm text-[#667085]">
        Review, validate, and sign off client assessment summaries prior to generating equipment packages.
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl bg-white px-4 py-10 text-center text-sm text-[#667085]">No clients match that search.</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((client) => (
            <article key={client.id} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Avatar name={client.name} className="h-12 w-12 text-sm" />
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-ink">{client.name}</h2>
                  <p className="text-xs text-[#98a2b3]">{client.cardId}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#667085]">
                {client.age} yrs · {client.gender} · DOB {client.dob} · {client.condition}
              </p>
              <Link
                to={`/clients/${client.id}`}
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#3DDC97] px-3 py-1.5 text-sm font-semibold text-[#12B981]"
              >
                View Details
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
