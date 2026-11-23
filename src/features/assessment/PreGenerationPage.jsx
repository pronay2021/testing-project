import { Link, useNavigate } from "react-router-dom";
import { readAssessment } from "../../lib/assessment.js";
import { assessmentStats, assessmentSteps, consentGates, everyQuestion, questionMissing } from "./steps.js";

export default function PreGenerationPage() {
  const navigate = useNavigate();
  const assessment = readAssessment();
  const answers = assessment.answers || {};
  const stats = assessmentStats(answers);
  const ready = stats.mandatoryDone === stats.mandatoryTotal;
  const questions = everyQuestion();

  const gates = consentGates.map((gate) => {
    const question = questions.find((item) => item.code === gate.code);
    const recorded = question ? !questionMissing({ ...question, mandatory: true }, answers[question.stepId]) : false;
    return { ...gate, recorded };
  });

  const groups = assessmentSteps
    .map((step) => ({
      title: step.title,
      items: step.questions.filter((question) => questionMissing(question, answers[step.id])),
      stepId: step.id,
    }))
    .filter((group) => group.items.length);

  return (
    <section className="mx-auto max-w-xl rounded-2xl bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-black/5 px-5 py-4">
        <div>
          <h1 className="text-lg font-semibold text-ink">Pre-generation check</h1>
          <p className="text-xs text-[#98a2b3]">{assessment.id}</p>
        </div>
        <Link to="/assessment/8" className="grid h-8 w-8 place-items-center rounded-full text-[#667085] hover:bg-[#f2f4f7]" aria-label="Close">
          ×
        </Link>
      </header>

      <div className="space-y-5 px-5 py-5">
        <div>
          <div className="flex items-end justify-between">
            <p className="text-sm font-medium text-ink">Assessment completeness</p>
            <p className="text-3xl font-semibold text-ink">{stats.percent}%</p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e7ecee]">
            <div className="h-full rounded-full bg-[#12B981] transition-all" style={{ width: `${stats.percent}%` }} />
          </div>
          <p className="mt-2 text-xs text-[#667085]">
            {stats.mandatoryDone} of {stats.mandatoryTotal} mandatory questions complete · {stats.answered} of {stats.total} answered overall
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Consent and safety gates</h2>
          <ul className="mt-2 space-y-2">
            {gates.map((gate) => (
              <li key={gate.code}>
                <Link to={`/assessment/${gate.stepId}?q=${gate.code}`} className="flex items-center justify-between rounded-lg border border-[#e6ebef] px-3 py-2">
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      <span className="mr-2 text-[#98a2b3]">{gate.code}</span>
                      {gate.title}
                    </span>
                    <span className="text-xs text-[#98a2b3]">{gate.recorded ? "Answer recorded" : "Not yet answered"}</span>
                  </span>
                  <span className={`text-xs font-semibold ${gate.recorded ? "text-[#12B981]" : "text-[#98a2b3]"}`}>{gate.recorded ? "Recorded" : "Missing"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Outstanding questions ({stats.mandatoryTotal - stats.mandatoryDone})</h2>
          {groups.length === 0 ? <p className="mt-2 text-sm text-[#12B981]">Every mandatory question has an answer.</p> : null}
          <div className="mt-2 space-y-3">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-medium text-[#98a2b3]">{group.title}</p>
                <ul className="mt-1 space-y-1">
                  {group.items.map((question) => (
                    <li key={question.code}>
                      <Link to={`/assessment/${group.stepId}?q=${question.code}`} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-[#f8fafb]">
                        <span>
                          <span className="mr-2 font-semibold text-red-500">{question.code}</span>
                          {question.title}
                        </span>
                        <span aria-hidden="true" className="text-[#98a2b3]">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#667085]">
          {`Complete ${stats.mandatoryTotal - stats.mandatoryDone} outstanding ${stats.mandatoryTotal - stats.mandatoryDone === 1 ? "question" : "questions"} to continue.`}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate("/assessment/1")} className="h-10 rounded-lg border border-[#d0d5dd] px-4 text-sm font-semibold text-[#344054]">
            Keep editing
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => navigate("/recommendation", { state: { analyze: true } })}
            className="h-10 rounded-lg bg-[#12B981] px-4 text-sm font-semibold text-white disabled:bg-[#e4e7ec] disabled:text-[#98a2b3]"
          >
            Generate AI Recommendations
          </button>
        </div>
      </div>
    </section>
  );
}
