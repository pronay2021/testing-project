import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readAssessment, saveAssessmentRole } from "../../lib/assessment.js";

const roles = [
  {
    id: "family",
    title: "Myself or a Family Member",
    badge: "Personal & Family",
    icon: "people",
    body: "I am looking for practical, discreet smart-home and assistive technology solutions to support myself or a loved one to live safely and independently at home.",
    points: [
      { icon: "leaf", text: "Plain-English guidance & zero technical jargon" },
      { icon: "shield", text: "Non-intrusive, privacy-first sensor recommendations" },
    ],
  },
  {
    id: "ot",
    title: "Occupational Therapist",
    badge: "Clinical Assessment",
    icon: "clinic",
    body: "I am a qualified OT or rehabilitation professional carrying out a formal functional assessment to match clinical goals with evidence-based assistive technology.",
    points: [
      { icon: "check", text: "Standardised ADL/IADL metrics & clinical taxonomies" },
      { icon: "doc", text: "Exportable OT assessment summary & specification sheet" },
    ],
  },
  {
    id: "care",
    title: "Care Provider or Support Worker",
    badge: "Formal & Domiciliary",
    icon: "home",
    body: "I deliver home care visits or residential support and want to reduce nocturnal wandering, detect falls early, and relieve caregiver physical strain.",
    points: [
      { icon: "bell", text: "Carer pager & dispersed alarm system integration" },
      { icon: "moon", text: "Preventative night-time ambient monitoring protocols" },
    ],
  },
  {
    id: "housing",
    title: "Housing or Council Professional",
    badge: "Commissioning & Grants",
    icon: "building",
    body: "I work in housing associations, local council social services, or facilities management looking to fund or retrofit properties with compliant smart tech.",
    points: [
      { icon: "check", text: "DFG (Disabled Facilities Grant) criteria alignment" },
      { icon: "building", text: "Local authority procurement & scalable IoT telemetry" },
    ],
  },
];

function Glyph({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "people") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.2" />
        <path d="M3.5 19c.7-3 2.8-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
        <path d="M16 14.5c1.8.3 3.2 1.4 3.8 3.5" />
      </svg>
    );
  }
  if (name === "clinic") {
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }
  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M4 11l8-7 8 7v9H4z" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }
  if (name === "building") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common} width="14" height="14">
        <path d="M12 3l7 3v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V6l7-3z" />
      </svg>
    );
  }
  if (name === "bell") {
    return (
      <svg {...common} width="14" height="14">
        <path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15z" />
      </svg>
    );
  }
  if (name === "moon") {
    return (
      <svg {...common} width="14" height="14">
        <path d="M16 4a7 7 0 1 0 4 12 8 8 0 1 1-4-12z" />
      </svg>
    );
  }
  if (name === "doc") {
    return (
      <svg {...common} width="14" height="14">
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
      </svg>
    );
  }
  if (name === "leaf") {
    return (
      <svg {...common} width="14" height="14">
        <path d="M5 19c8 0 14-8 14-14-6 0-14 6-14 14z" />
      </svg>
    );
  }
  return (
    <svg {...common} width="14" height="14">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const saved = readAssessment().role;
  const [role, setRole] = useState(saved || "family");
  const [guide, setGuide] = useState(false);

  function continueToSteps() {
    saveAssessmentRole(role);
    navigate("/assessment/1");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-[28px]">Create New Case</h1>
      <p className="mt-1 text-sm text-[#667085]">Each role gets a permission level per module. Waiter roles can serve food.</p>

      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e7faf3] px-3 py-1 text-xs font-semibold text-[#067a52]">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-[#12B981] text-[10px] text-white">✓</span>
        Personalized Assistive Pathway Engine
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-[32px]">Who are you completing this assessment for?</h2>
      <p className="mt-2 max-w-3xl text-sm text-[#667085]">
        To provide the most relevant smart living recommendations, please tell us your perspective. This adapts the diagnostic terminology, assistive tech frameworks, and local funding pathways.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {roles.map((item) => {
          const selected = role === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setRole(item.id)}
              className={`rounded-2xl border bg-white p-4 text-left shadow-sm sm:p-5 ${selected ? "border-[#12B981] ring-1 ring-[#12B981]" : "border-[#e6ebef]"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${selected ? "bg-[#e7faf3] text-[#12B981]" : "bg-[#f4f7f8] text-[#344054]"}`}>
                  <Glyph name={item.icon} />
                </span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-[#eef2ff] px-2 py-1 text-[11px] font-semibold text-[#6366f1]">{item.badge}</span>
                  <span className={`grid h-5 w-5 place-items-center rounded-full border ${selected ? "border-[#12B981] bg-[#12B981] text-white" : "border-[#d0d5dd] bg-white"}`}>
                    {selected ? "✓" : ""}
                  </span>
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#667085]">{item.body}</p>
              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li key={point.text} className="flex items-start gap-2 rounded-lg bg-[#f7faf8] px-3 py-2 text-xs text-[#067a52]">
                    <span className="mt-0.5 text-[#12B981]">
                      <Glyph name={point.icon} />
                    </span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#f4f7f8] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[#44505c]">
          <p className="font-semibold text-ink">Not sure which role fits best?</p>
          <p className="mt-1 text-[#667085]">
            If you are helping a parent or partner but are not an employed carer, select &quot;Myself or a Family Member&quot; for direct consumer solutions and free public grant suggestions.
          </p>
          {guide ? (
            <ul className="mt-2 space-y-1 text-xs text-[#667085]">
              {roles.map((item) => (
                <li key={item.id}>
                  <span className="font-semibold text-ink">{item.title}:</span> {item.badge}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <button type="button" onClick={() => setGuide((current) => !current)} className="shrink-0 text-sm font-semibold text-[#344054]">
          {guide ? "Hide role comparison" : "View Role Comparison Guide"}
        </button>
      </div>

      <div className="sticky bottom-0 mt-4 flex justify-end bg-[#e7ecee]/95 py-3">
        <button type="button" onClick={continueToSteps} className="h-11 rounded-lg bg-[#12B981] px-5 text-sm font-semibold text-white">
          Continue →
        </button>
      </div>
    </div>
  );
}
