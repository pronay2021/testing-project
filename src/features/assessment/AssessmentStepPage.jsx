import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { readAssessment, saveStepAnswers } from "../../lib/assessment.js";
import QuestionCard from "./QuestionCard.jsx";
import { assessmentSteps, questionMissing, stepById } from "./steps.js";

export default function AssessmentStepPage() {
  const { step } = useParams();
  const [searchParams] = useSearchParams();
  const current = stepById(step);
  const navigate = useNavigate();
  const assessment = readAssessment();
  const [values, setValues] = useState(() => ({ ...(assessment.answers[current.id] || {}), __assessmentId: assessment.id }));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const next = readAssessment();
    setValues({ ...(next.answers[current.id] || {}), __assessmentId: next.id });
    setSaved(false);
  }, [current.id]);

  useEffect(() => {
    const target = searchParams.get("q");
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams, current.id]);

  const missing = useMemo(
    () => current.questions.filter((question) => questionMissing(question, values)),
    [current, values],
  );
  const mandatoryCount = current.questions.filter((question) => question.mandatory).length;

  function persist() {
    const answers = {};
    Object.entries(values).forEach(([key, value]) => {
      if (key === "__assessmentId" || key.endsWith("Open")) return;
      answers[key] = value;
    });
    saveStepAnswers(current.id, answers);
  }

  function update(name, value) {
    setSaved(false);
    setValues((currentValues) => {
      const next = { ...currentValues, [name]: value };
      if (name.endsWith(".alerts")) {
        const orderKey = name.replace(/alerts$/, "order");
        const previous = Array.isArray(currentValues[orderKey]) ? currentValues[orderKey] : [];
        const selected = Array.isArray(value) ? value : [];
        next[orderKey] = [...previous.filter((item) => selected.includes(item)), ...selected.filter((item) => !previous.includes(item))];
      }
      return next;
    });
  }

  function saveDraft() {
    persist();
    setSaved(true);
  }

  function continueStep() {
    persist();
    if (missing.length) {
      document.getElementById(missing[0].code)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (current.id === 8) navigate("/assessment/check");
    else navigate(`/assessment/${current.id + 1}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink sm:text-[28px]">Create New Case</h1>
      <p className="mt-1 text-sm text-[#667085]">Each role gets a permission level per module. Waiter roles can serve food.</p>

      <ol className="mt-4 flex gap-2 overflow-x-auto rounded-2xl bg-white px-3 py-4 shadow-sm">
        {assessmentSteps.map((item, index) => {
          const state = item.id === current.id ? "current" : item.id < current.id ? "done" : "upcoming";
          return (
            <li key={item.id} className="min-w-[108px] flex-1">
              <Link to={`/assessment/${item.id}`} onClick={persist} className="block text-center">
                <span className="relative flex items-center justify-center">
                  {index > 0 ? <span className={`absolute right-1/2 top-4 h-px w-full ${state === "upcoming" ? "bg-[#e4e7ec]" : "bg-[#b7f0dc]"}`} /> : null}
                  <span
                    className={`relative grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                      state === "upcoming" ? "bg-[#e6eaee] text-[#98a2b3]" : "bg-[#12B981] text-white"
                    }`}
                  >
                    {state === "done" ? "✓" : String(item.id).padStart(2, "0")}
                  </span>
                </span>
                <span className={`mt-2 block text-[11px] font-semibold leading-4 ${state === "upcoming" ? "text-[#98a2b3]" : "text-[#067a52]"}`}>
                  {item.stepper}
                </span>
                <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-wide ${state === "upcoming" ? "text-[#b0b7c3]" : "text-[#12B981]"}`}>
                  {state === "current" ? "In progress" : state === "done" ? "Completed" : "Upcoming"}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98a2b3]">Step {current.id} of 8</p>
        <h2 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">{current.title}</h2>
        <p className="mt-1 text-sm text-[#667085]">{current.summary}</p>
        <p className="mt-2 text-xs text-[#98a2b3]">
          {current.questions.length} questions · {current.optionalLabel || `${mandatoryCount} mandatory`}
        </p>
      </div>

      {current.banner ? (
        <div className="mt-4 flex gap-3 rounded-xl border border-[#f3e2b3] bg-[#fff8e8] px-4 py-3 text-sm text-[#8a6116]">
          <span aria-hidden="true">⚠</span>
          <p>
            <span className="font-semibold">{current.banner.title}. </span>
            {current.banner.body}
          </p>
        </div>
      ) : null}

      {missing.length ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-[#fff1f1] px-4 py-3">
          <p className="text-sm font-semibold text-red-600">
            {`ⓘ ${missing.length} ${missing.length === 1 ? "question needs" : "questions need"} attention before you can continue`}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {missing.map((question) => (
              <button
                key={question.code}
                type="button"
                className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-red-600"
                onClick={() => document.getElementById(question.code)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                {question.code} {question.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className={`mt-4 ${current.layout === "grid" ? "grid gap-4 lg:grid-cols-2" : "space-y-4"}`}>
        {current.questions.map((question) => (
          <QuestionCard key={question.code} question={question} values={values} onChange={update} stacked={current.layout === "grid"} />
        ))}
      </div>

      <div className="sticky bottom-0 mt-4 flex flex-col gap-3 border-t border-black/5 bg-[#e7ecee]/95 py-3 sm:flex-row sm:items-center sm:justify-end">
        {saved ? <span className="text-sm text-emerald-700 sm:mr-auto">Draft saved</span> : <span className="sm:mr-auto" />}
        <button type="button" onClick={saveDraft} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-4 text-sm font-semibold text-[#344054]">
          Save Draft
        </button>
        <button type="button" onClick={continueStep} className="inline-flex h-10 items-center justify-center rounded-lg bg-[#12B981] px-5 text-sm font-semibold text-white">
          Continue →
        </button>
      </div>
    </div>
  );
}
