import { Link, useParams } from "react-router-dom";
import Avatar from "../../components/ui/Avatar.jsx";
import { findClient } from "../../lib/clients.js";

const activityTone = {
  green: "bg-[#e7faf3] text-[#12B981]",
  blue: "bg-sky-50 text-sky-600",
  violet: "bg-violet-50 text-violet-600",
};

function EquipIcon({ kind }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" };
  if (kind === "radar") {
    return (
      <svg {...common}>
        <path d="M12 12l7-4" />
        <circle cx="12" cy="12" r="2" />
        <path d="M5 19a10 10 0 0 1 14 0" />
      </svg>
    );
  }
  if (kind === "light") {
    return (
      <svg {...common}>
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3 11H9a6 6 0 0 1 3-11z" />
      </svg>
    );
  }
  if (kind === "plug") {
    return (
      <svg {...common}>
        <path d="M8 7v5a4 4 0 0 0 8 0V7M9 3v4M15 3v4M12 16v5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M10 7h4" />
    </svg>
  );
}

function Fact({ label, title, note }) {
  return (
    <div className="rounded-lg bg-[#f4f7f8] p-3">
      <p className="text-[11px] text-[#98a2b3]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{title}</p>
      <p className="text-xs text-[#667085]">{note}</p>
    </div>
  );
}

export default function ClientDetailPage() {
  const { id } = useParams();
  const client = findClient(id);

  if (!client) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="text-sm text-[#667085]">That client is not on this caseload.</p>
        <Link to="/clients" className="mt-3 inline-block text-sm font-semibold text-brand">
          Back to clients
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={client.name} className="h-16 w-16 text-lg sm:h-[72px] sm:w-[72px]" />
          <div>
            <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{client.name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#667085]">
              <span className="inline-flex items-center gap-1 font-medium text-[#12B981]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12B981]" />
                {client.status}
              </span>
              <span>
                ID: {client.id} · Age: {client.age} · {client.location}
              </span>
            </p>
            <p className="mt-1 text-xs text-[#98a2b3]">Assigned OT: {client.assignedOt}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/assessment/${client.nextStep}`}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#12B981] px-4 text-sm font-semibold text-white"
          >
            Resume Assessment (Step {client.nextStep})
          </Link>
          <Link
            to="/payment"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d0d5dd] bg-white px-4 text-sm font-semibold text-ink"
          >
            View Checkout Receipt
          </Link>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Demographics & Context</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Client Overview</h2>
            </div>
            <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-semibold text-[#6366f1]">{client.tier}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Fact label="Living Arrangement" title={client.living.title} note={client.living.note} />
            <Fact label="Property Details" title={client.property.title} note={client.property.note} />
            <Fact label="Primary Clinical Needs" title={client.needs.title} note={client.needs.note} />
            <Fact label="Emergency Contact" title={client.emergency.name} note={client.emergency.note} />
          </div>
          <p className="mt-4 text-xs text-[#12B981]">✓ {client.verified}</p>
        </section>

        <section className="rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Assistive Technology</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Selected Package</h2>
            </div>
            <span className="rounded-full bg-[#fff7ed] px-2.5 py-1 text-[11px] font-semibold text-[#f97316]">{client.grant}</span>
          </div>
          <div className="mt-4 flex items-start justify-between gap-3 rounded-lg bg-[#f4f7f8] px-3 py-3">
            <div>
              <p className="text-[11px] text-[#98a2b3]">Prescribed System</p>
              <p className="font-semibold text-[#0e4c57]">{client.packageName}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#98a2b3]">Total Approved</p>
              <p className="font-semibold text-[#12B981]">{client.packageTotal}</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Key Equipment Specification</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {client.equipment.map((item) => (
              <li key={item.name} className="flex items-center gap-2 text-sm text-[#344054]">
                <span className="text-[#12B981]">
                  <EquipIcon kind={item.kind} />
                </span>
                {item.name}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-1 text-xs text-[#667085] sm:flex-row sm:items-center sm:justify-between">
            <span>Installation: {client.install}</span>
            <span>{client.team}</span>
          </div>
        </section>

        <section className="rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Clinical Workflow</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Assessment Progress</h2>
            </div>
            <span className="text-[11px] text-[#98a2b3]">{client.progressRef}</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">Overall Completion</span>
            <span className="font-semibold text-[#12B981]">{client.percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e7ecee]">
            <div className="h-full rounded-full bg-[#12B981]" style={{ width: `${client.percent}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-[#98a2b3]">
            <span>{client.stepsDone}</span>
            <span>{client.remaining}</span>
          </div>
          <div className="mt-4 flex gap-3 rounded-lg bg-[#f4f7f8] p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111] text-xs font-semibold text-white">
              {client.nextStep}
            </span>
            <div>
              <p className="text-[11px] text-[#98a2b3]">Immediate Next Step</p>
              <p className="text-sm font-semibold text-ink">{client.nextTitle}</p>
              <p className="mt-1 text-xs text-[#667085]">{client.nextNote}</p>
            </div>
          </div>
          <Link to={`/assessment/${client.nextStep}`} className="mt-4 inline-flex text-sm font-semibold text-[#12B981]">
            Continue assessment →
          </Link>
        </section>

        <section className="rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#98a2b3]">Audit Log</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Recent Activity</h2>
            </div>
            <span className="text-[11px] text-[#98a2b3]">Last 7 Days</span>
          </div>
          <ul className="mt-4 space-y-4">
            {client.activity.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs ${activityTone[item.tone]}`}>•</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="text-xs text-[#98a2b3]">{item.date}</p>
                  </div>
                  <p className="text-xs text-[#667085]">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold text-[#12B981]">View comprehensive clinical audit trail</p>
          <p className="mt-1 text-right text-[11px] text-[#98a2b3]">{client.activity.length} of {client.activity.length} records</p>
        </section>
      </div>

      <footer className="flex flex-col gap-3 rounded-xl border border-black/5 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e7faf3] text-[#12B981]">⌂</span>
          <div>
            <p className="text-sm font-semibold text-ink">{client.integration}</p>
            <p className="text-xs text-[#667085]">{client.worker}</p>
          </div>
        </div>
        <a
          href="mailto:david.miller@leeds.gov.uk"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d0d5dd] px-4 text-sm font-semibold text-ink"
        >
          Contact Case Worker
        </a>
      </footer>
    </div>
  );
}
