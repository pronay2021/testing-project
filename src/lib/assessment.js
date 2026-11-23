const KEY = "a2-assessment";

export const stepMeta = [
  { id: 1, short: "Record & Consent", title: "Assessment Record & Consent" },
  { id: 2, short: "Home & Infrastructure", title: "Home & Infrastructure" },
  { id: 3, short: "Health & Function", title: "Health, Disability & Functional Profile" },
  { id: 4, short: "Daily Living", title: "Daily Living & Environmental Tasks" },
  { id: 5, short: "Safety Assessment", title: "Safety & Safeguarding Screen" },
  { id: 6, short: "Carer & Support", title: "Carer Network, Alerts & Response" },
  { id: 7, short: "Preferences & Suitability", title: "Preferences & Practical Suitability" },
  { id: 8, short: "Clinical Outcomes", title: "Outcome Baseline & Clinical Judgement" },
];

export function emptyAssessment() {
  return {
    id: `OT-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
    answers: {},
  };
}

export function readAssessment() {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return emptyAssessment();
  try {
    return { ...emptyAssessment(), ...JSON.parse(raw) };
  } catch {
    return emptyAssessment();
  }
}

export function saveAssessment(assessment) {
  sessionStorage.setItem(KEY, JSON.stringify(assessment));
}

export function saveStepAnswers(stepId, answers) {
  const current = readAssessment();
  current.answers[stepId] = answers;
  saveAssessment(current);
  return current;
}

export function saveAssessmentRole(role) {
  const current = readAssessment();
  current.role = role;
  saveAssessment(current);
  return current;
}
