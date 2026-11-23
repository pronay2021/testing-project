import { Link, useParams } from "react-router-dom";
import Avatar from "../../../components/ui/Avatar.jsx";
import { findClient } from "../../../lib/clients.js";

export default function CaseReviewDetailPage() {
  const { id } = useParams();
  const client = findClient(id);

  if (!client) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="text-sm text-[#667085]">That case is not in the review list.</p>
        <Link to="/admin/cases" className="mt-3 inline-block text-sm font-semibold text-[#12B981]">Back to case review</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={client.name} className="h-16 w-16 text-lg" />
          <div>
            <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{client.name}</h1>
            <p className="mt-1 text-sm text-[#667085]">
              <span className="font-medium text-[#12B981]">● {client.status}</span> · ID: {client.id} · Age: {client.age} · {client.location}
            </p>
            <p className="text-xs text-[#98a2b3]">Assigned OT: {client.assignedOt}</p>
          </div>
        </div>
        <Link to={`/admin/cases/${client.id}/receipt`} className="inline-flex h-10 items-center justify-center rounded-lg bg-[#e8eefc] px-4 text-sm font-semibold text-[#344054]">
          View Checkout Receipt
        </Link>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Demographics & Context</p>
              <h2 className="text-lg font-semibold">Client Overview</h2>
            </div>
            <span className="rounded-full bg-[#eef2ff] px-2 py-1 text-[11px] font-semibold text-[#6366f1]">{client.tier}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Fact label="Living Arrangement" title={client.living.title} note={client.living.note} />
            <Fact label="Property Details" title={client.property.title} note={client.property.note} />
            <Fact label="Primary Clinical Needs" title={client.needs.title} note={client.needs.note} />
            <Fact label="Emergency Contact" title={client.emergency.name} note={client.emergency.note} />
          </div>
          <p className="mt-4 text-xs text-[#12B981]">✓ {client.verified}</p>
        </section>

        <section className="rounded-xl bg-white p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Assistive Technology</p>
              <h2 className="text-lg font-semibold">Selected Package</h2>
            </div>
            <span className="rounded-full bg-[#fff7ed] px-2 py-1 text-[11px] font-semibold text-[#f97316]">{client.grant}</span>
          </div>
          <div className="mt-4 flex items-start justify-between rounded-lg bg-[#f4f7f8] p-3">
            <div>
              <p className="text-[11px] text-[#98a2b3]">Prescribed System</p>
              <p className="font-semibold text-[#0e4c57]">{client.packageName}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#98a2b3]">Total Approved</p>
              <p className="font-semibold text-[#12B981]">{client.packageTotal}</p>
            </div>
          </div>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {client.equipment.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
          <Link to={`/admin/cases/${client.id}/product`} className="mt-4 flex h-11 items-center justify-center rounded-lg bg-[#12B981] text-sm font-semibold text-white">
            View Details →
          </Link>
        </section>

        <section className="rounded-xl bg-white p-4 sm:p-5">
          <div className="flex justify-between text-[11px] text-[#98a2b3]">
            <span>Clinical Workflow</span>
            <span>{client.progressRef}</span>
          </div>
          <h2 className="text-lg font-semibold">Assessment Progress</h2>
          <div className="mt-3 flex justify-between text-sm">
            <span>Overall Completion</span>
            <span className="font-semibold text-[#12B981]">{client.percent}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[#e7ecee]">
            <div className="h-full rounded-full bg-[#12B981]" style={{ width: `${client.percent}%` }} />
          </div>
          <p className="mt-2 text-xs text-[#98a2b3]">{client.stepsDone} · {client.remaining}</p>
          <div className="mt-4 rounded-lg bg-[#f4f7f8] p-3 text-sm">
            <p className="text-[11px] text-[#98a2b3]">Immediate Next Step</p>
            <p className="font-semibold">{client.nextTitle}</p>
            <p className="mt-1 text-xs text-[#667085]">{client.nextNote}</p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-4 sm:p-5">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <ul className="mt-3 space-y-3">
            {client.activity.map((item) => (
              <li key={item.title}>
                <div className="flex justify-between gap-3 text-sm">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-xs text-[#98a2b3]">{item.date}</span>
                </div>
                <p className="text-xs text-[#667085]">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Fact({ label, title, note }) {
  return (
    <div className="rounded-lg bg-[#f4f7f8] p-3">
      <p className="text-[11px] text-[#98a2b3]">{label}</p>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-[#667085]">{note}</p>
    </div>
  );
}
