import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { readAssessment, saveAssessment } from "../../lib/assessment.js";
import { findPackage, money, packages, recommendPackage } from "../../lib/packages.js";

export default function RecommendationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const assessment = readAssessment();
  const recommendation = recommendPackage(assessment.answers);
  const [phase, setPhase] = useState(location.state?.analyze ? "analyze" : "ready");
  const [progress, setProgress] = useState(6);
  const [selected, setSelected] = useState(assessment.packageId || recommendation.id);

  useEffect(() => {
    if (phase !== "analyze") return undefined;
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(timer);
          setPhase("ready");
          return 100;
        }
        return Math.min(100, current + 7);
      });
    }, 90);
    return () => clearInterval(timer);
  }, [phase]);

  if (phase === "analyze") {
    return (
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#12B981]">AI recommendation</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">Analyzing the assessment</h1>
        <p className="mt-2 text-sm text-[#667085]">Reading every saved answer across the eight steps, then ranking Bronze, Silver and Gold.</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e7ecee]">
          <div className="h-full rounded-full bg-[#12B981] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-[#98a2b3]">{progress}% complete</p>
        <ul className="mt-4 space-y-2 text-sm text-[#44505c]">
          <li>Consent, capacity and the immediate-risk screen</li>
          <li>Home, function, daily living and safety answers</li>
          <li>Carer response, priorities and clinical outcomes</li>
        </ul>
      </section>
    );
  }

  const chosen = findPackage(selected);
  const reason = recommendation.reasons.length
    ? `The saved answers show ${recommendation.reasons.join(", ")}.`
    : "The mandatory record is complete. The rank uses the clinical answers saved in this assessment.";

  function checkout() {
    const current = readAssessment();
    current.packageId = selected;
    saveAssessment(current);
    navigate("/payment");
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#12B981]">Compare equipment packages</p>
      <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">Bronze, Silver and Gold</h1>
      <p className="mt-2 max-w-3xl text-sm text-[#667085]">
        The assessment for {assessment.id} has been analyzed. {reason} Recommended package: {findPackage(recommendation.id).tier}.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {packages.map((item) => {
          const active = item.id === selected;
          const recommended = item.id === recommendation.id;
          return (
            <article key={item.id} className={`flex flex-col rounded-2xl border bg-white p-5 shadow-sm ${active ? "border-[#12B981] ring-2 ring-[#12B981]/30" : "border-[#e6ebef]"}`}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-ink">{item.name}</h2>
                {recommended ? <span className="rounded-full bg-[#e7faf3] px-2 py-1 text-[11px] font-semibold text-[#067a52]">AI recommendation</span> : null}
              </div>
              <p className="mt-1 text-sm text-[#667085]">{item.tier}</p>
              <p className="mt-4 text-2xl font-semibold text-ink">{money(item.total)}</p>
              <p className="mt-2 text-sm text-[#44505c]">{item.fit}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#344054]">
                {item.equipment.map((line) => (
                  <li key={line.item}>
                    {line.qty} × {line.item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelected(item.id)}
                className={`mt-5 h-10 rounded-lg text-sm font-semibold ${active ? "bg-[#12B981] text-white" : "border border-[#d0d5dd] text-[#344054]"}`}
              >
                {active ? "Selected" : `Select ${item.name}`}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#44505c]">
          Selected for checkout: <span className="font-semibold text-ink">{chosen.tier}</span> · {money(chosen.total)}
        </p>
        <button type="button" onClick={checkout} className="h-11 rounded-lg bg-[#12B981] px-5 text-sm font-semibold text-white">
          Continue to checkout
        </button>
      </div>
    </div>
  );
}
