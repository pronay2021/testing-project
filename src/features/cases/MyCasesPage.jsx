import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWorkspaceSearch } from "../../components/layout/AppShell.jsx";
import { clients } from "../../lib/clients.js";

const stageTone = {
  green: "border-emerald-200 text-emerald-600",
  blue: "border-indigo-200 text-indigo-500",
  orange: "border-orange-200 text-orange-500",
  slate: "border-slate-200 text-slate-500",
  cyan: "border-cyan-200 text-cyan-600",
};

const riskTone = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-orange-50 text-orange-500",
  Low: "bg-emerald-50 text-emerald-600",
};

function ActionLink({ client, className = "" }) {
  const solid = client.actionStyle === "solid";
  return (
    <Link
      to={client.actionTo}
      className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold ${
        solid ? "bg-[#12B981] text-white" : "border border-[#d0d5dd] bg-white text-[#344054]"
      } ${className}`}
    >
      {client.action}
    </Link>
  );
}

export default function MyCasesPage() {
  const { query } = useWorkspaceSearch();
  const [status, setStatus] = useState("All");
  const needle = query.trim().toLowerCase();

  const statuses = useMemo(() => ["All", ...new Set(clients.map((client) => client.stage))], []);

  const visible = clients.filter((client) => {
    if (status !== "All" && client.stage !== status) return false;
    if (!needle) return true;
    return [client.name, client.nhsId, client.presentation, client.presentationSub, client.stage, client.risk]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-[28px]">My Cases</h1>
      <p className="mt-1 text-sm text-[#667085]">Each role gets a permission level per module. Waiter roles can serve food.</p>

      <section className="mt-5 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-ink">Clinical Caseload Worklist</h2>
            <p className="text-xs text-[#98a2b3]">Prioritized by clinical vulnerability and intake SLA status</p>
          </div>
          <label className="relative inline-flex items-center">
            <span className="pointer-events-none absolute left-3 text-[#98a2b3]">▾</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-9 appearance-none rounded-lg border border-[#d0d5dd] bg-white pl-7 pr-8 text-xs font-semibold text-[#344054] outline-none"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Statuses (12)" : item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-[860px] w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wide text-[#98a2b3]">
              <tr>
                <th className="px-5 py-3 font-medium">Client & NHS ID</th>
                <th className="px-3 py-3 font-medium">Clinical Presentation</th>
                <th className="px-3 py-3 font-medium">Clinical Pathway Stage</th>
                <th className="px-3 py-3 font-medium">Risk Level</th>
                <th className="px-3 py-3 font-medium">Last Sync</th>
                <th className="px-5 py-3 font-medium">Direct Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((client) => (
                <tr key={client.id} className="border-t border-black/5">
                  <td className="px-5 py-3">
                    <Link to={`/clients/${client.id}`} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eef2f4] text-[11px] font-semibold text-[#0e4c57]">
                        {client.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">
                          {client.name}, {client.age}y
                        </span>
                        <span className="block text-xs text-[#98a2b3]">{client.nhsId}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-[#44505c]">
                    <span className="block">{client.presentation}</span>
                    <span className="block text-xs text-[#98a2b3]">{client.presentationSub}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${stageTone[client.stageTone]}`}>
                      {client.stage}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${riskTone[client.risk]}`}>{client.risk}</span>
                  </td>
                  <td className="px-3 py-3 text-[#667085]">{client.lastSync}</td>
                  <td className="px-5 py-3">
                    <ActionLink client={client} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 px-4 pb-4 md:hidden">
          {visible.map((client) => (
            <article key={client.id} className="rounded-xl border border-black/5 p-3">
              <Link to={`/clients/${client.id}`} className="font-semibold text-ink">
                {client.name}, {client.age}y
              </Link>
              <p className="text-xs text-[#98a2b3]">{client.nhsId}</p>
              <p className="mt-2 text-sm text-[#44505c]">{client.presentation}</p>
              <p className="text-xs text-[#98a2b3]">{client.presentationSub}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${stageTone[client.stageTone]}`}>
                  {client.stage}
                </span>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${riskTone[client.risk]}`}>{client.risk}</span>
                <span className="text-xs text-[#667085]">{client.lastSync}</span>
              </div>
              <ActionLink client={client} className="mt-3 w-full" />
            </article>
          ))}
        </div>

        {visible.length === 0 ? <p className="px-5 py-8 text-center text-sm text-[#667085]">No cases match that filter.</p> : null}

        <div className="flex flex-col gap-2 border-t border-black/5 px-4 py-3 text-xs text-[#98a2b3] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p>
            Showing {status === "All" && !needle ? 5 : visible.length} of 12 active priority cases
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded border border-[#e4e7ec] px-2 py-1">Prev</span>
            <span>Page 1 of 3</span>
            <span className="rounded border border-[#e4e7ec] px-2 py-1">Next</span>
          </div>
        </div>
      </section>
    </div>
  );
}
