import { Link } from "react-router-dom";
import { useWorkspaceSearch } from "../../components/layout/AppShell.jsx";
import { caseload, homeVisits, stats } from "../../lib/clients.js";
import { readSession } from "../../lib/api/auth.js";

const riskTone = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-emerald-50 text-emerald-700",
};

export default function DashboardPage() {
  const session = readSession();
  const { query } = useWorkspaceSearch();
  const needle = query.trim().toLowerCase();
  const rows = caseload.filter((client) => {
    if (!needle) return true;
    return [client.name, client.nhsId, client.presentation, client.stage].join(" ").toLowerCase().includes(needle);
  });
  const firstName = (session?.name || "Sarah Mitchell").split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink">Welcome back, {firstName}</h1>
          <p className="text-sm text-[#667085]">{session?.title || "Occupational Therapist"}</p>
        </div>
        <input
          placeholder="Search patients, pay claims"
          className="h-11 w-full rounded-md border border-black/5 bg-white px-3 text-sm outline-none placeholder:text-[#b0aaaa] focus:ring-2 focus:ring-brand/30 lg:max-w-sm"
        />
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className={`text-[11px] font-semibold uppercase tracking-wide ${stat.tone}`}>{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1 text-xs text-[#8a8484]">{stat.note}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
        <section className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <h2 className="text-sm font-semibold text-ink">Clinical Caseload Worklist</h2>
              <p className="text-xs text-[#8a8484]">Prioritise by clinical urgency and review date</p>
            </div>
            <Link to="/cases" className="text-xs font-semibold text-brand">
              All cases
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-[#f8fafb] text-[11px] uppercase tracking-wide text-[#8a8484]">
                <tr>
                  <th className="px-4 py-3 font-medium">Client & NDIS ID</th>
                  <th className="px-4 py-3 font-medium">Clinical presentation</th>
                  <th className="px-4 py-3 font-medium">Pathway stage</th>
                  <th className="px-4 py-3 font-medium">Risk</th>
                  <th className="px-4 py-3 font-medium">Last seen</th>
                  <th className="px-4 py-3 font-medium">Direct action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((client) => (
                  <tr key={client.id} className="border-t border-black/5">
                    <td className="px-4 py-3">
                      <Link to={`/clients/${client.id}`} className="font-semibold text-ink">
                        {client.name}, {client.age}y
                      </Link>
                      <p className="text-xs text-[#8a8484]">{client.nhsId}</p>
                    </td>
                    <td className="px-4 py-3 text-[#44505c]">
                      {client.presentation}
                      <span className="block text-xs text-[#8a8484]">{client.presentationSub}</span>
                    </td>
                    <td className="px-4 py-3 text-[#44505c]">{client.stage}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${riskTone[client.risk]}`}>
                        {client.risk}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#44505c]">{client.lastSync}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={client.actionTo}
                        className="rounded-md bg-[#e7faf3] px-3 py-1.5 text-xs font-semibold text-brand"
                      >
                        {client.action}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-[#8a8484]">Page 1 of 2</p>
        </section>

        <aside className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-ink">Today&apos;s Home Visits</h2>
          <ul className="mt-4 space-y-3">
            {homeVisits.map((visit) => (
              <li key={visit.time} className="rounded-lg bg-[#f8fafb] p-3">
                <p className="text-xs font-semibold text-brand">{visit.time}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{visit.name}</p>
                <p className="text-xs text-[#8a8484]">{visit.place}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
