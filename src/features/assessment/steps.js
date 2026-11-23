const scale = ["0", "1", "2", "3", "4"];
const scaleNa = ["0", "1", "2", "3", "4", "N/A"];
const frequency = ["Never", "Monthly", "Weekly", "Daily", "Multiple Times Daily"];
const difficulty = ["No Issue", "Mild", "Moderate", "Severe", "Unknown"];
const risk = ["None", "Possible", "Documented", "Recurrent", "Unknown"];
const severity = ["Low", "Medium", "High"];

function task(code, title) {
  return {
    code,
    title,
    hint: "Independence scale 0–4 / N/A, frequency",
    fields: [
      { name: "independence", label: "Independence", type: "scale", options: scaleNa, captionLeft: "0 Independent", captionRight: "4 Unable / Unsafe" },
      { name: "frequency", label: "Frequency", type: "radio", options: frequency },
    ],
    notes: true,
  };
}

function safety(code, title) {
  return {
    code,
    title,
    hint: "Risk response, severity",
    fields: [
      { name: "risk", label: "Risk response", type: "radio", options: risk },
      { name: "severity", label: "Severity", type: "radio", options: severity },
    ],
    notes: true,
  };
}

export const assessmentSteps = [
  {
    id: 1,
    stepper: "Assessment & Consent",
    title: "Assessment Record & Consent",
    summary: "Collect assessment details, client reference and consent information.",
    questions: [
      {
        code: "A01",
        title: "Assessment Information",
        hint: "Input: Read-only ID, date picker, dropdown, text inputs",
        mandatory: true,
        columns: 2,
        fields: [
          { name: "assessmentId", label: "Assessment ID", type: "readonly", hint: "Auto-generated" },
          { name: "assessmentDate", label: "Assessment Date", type: "date", required: true, placeholder: "mm/dd/yyyy" },
          { name: "otName", label: "OT Name", type: "select", required: true, placeholder: "Select occupational therapist", options: ["Sarah Mitchell", "Sarah Jenkins (HCPC)", "James Okonkwo"] },
          { name: "organisation", label: "Organisation", type: "text", required: true, placeholder: "e.g. Leeds Community OT Service" },
          { name: "contact", label: "Contact Information", type: "text", required: true, placeholder: "Work email or phone number", wide: true },
        ],
        notes: true,
      },
      {
        code: "A02",
        title: "Client Reference",
        hint: "Input: Text input, single-select dropdown",
        mandatory: true,
        columns: 2,
        fields: [
          { name: "reference", label: "Client Reference / Pseudonymous ID", type: "text", required: true, placeholder: "e.g. CL-48213" },
          { name: "ageBand", label: "Age Band", type: "select", required: true, placeholder: "Select age band", options: ["Under 65", "65–74", "75–84", "85 and over"] },
        ],
        notes: true,
      },
      {
        code: "A03",
        title: "Recording Status",
        hint: "Input: Single-select radio",
        fields: [
          { name: "recording", label: "Recording status", type: "radio", options: ["Not recording", "Written notes only", "Audio recorded with consent", "Client declined"] },
        ],
        notes: true,
      },
      {
        code: "A04",
        title: "Assessment Location",
        hint: "Input: Single-select, text",
        mandatory: true,
        columns: 2,
        fields: [
          { name: "setting", label: "Setting", type: "select", required: true, placeholder: "Select location", options: ["Client home", "Clinic", "Remote / video", "Other"] },
          { name: "address", label: "Address or setting", type: "text", required: true, placeholder: "e.g. 14 Oakwood Crescent, Leeds, LS8 1QA" },
        ],
        notes: true,
      },
      {
        code: "A05",
        title: "Assessment Participants",
        hint: "Input: Multi-select checkboxes",
        mandatory: true,
        fields: [
          { name: "present", label: "Who was present", type: "checks", required: true, options: ["Client", "Family member or carer", "Paid support worker", "Another professional"] },
        ],
        notes: true,
        attention: "Select who was present",
      },
      {
        code: "A06",
        title: "Client Capacity / Authority",
        hint: "Input: Single-select radio",
        mandatory: true,
        fields: [
          { name: "capacity", label: "Capacity", type: "radio", required: true, options: ["Has capacity to consent", "Best-interests decision", "Unsure – review required"] },
        ],
        notes: true,
        attention: "Choose an option for Client Capacity / Authority",
      },
      {
        code: "A07",
        title: "Permission to Process Health and Disability Information",
        hint: "Input: Single-select radio",
        mandatory: true,
        fields: [
          { name: "permission", label: "Lawful basis", type: "radio", required: true, options: ["Consent given", "Consent refused", "Other lawful basis recorded"] },
        ],
        notes: true,
        attention: "Choose an option for permission to process health information",
      },
      {
        code: "A08",
        title: "Records Already Held",
        hint: "Input: Textarea",
        fields: [
          { name: "records", label: "Existing records reviewed", type: "textarea", placeholder: "Previous OT reports, NHS notes, or housing records" },
        ],
      },
      {
        code: "A09",
        title: "Communication and Access Needs",
        hint: "Input: Textarea",
        fields: [
          { name: "access", label: "Needs for this assessment", type: "textarea", placeholder: "Interpreter, hearing support, extra time, or an advocate" },
        ],
      },
    ],
  },
  {
    id: 2,
    stepper: "Home Environment",
    title: "Home & Infrastructure",
    summary: "Understand the client’s home environment and technical suitability.",
    questions: [
      {
        code: "H01",
        title: "Tenure and Property Type",
        hint: "Input: Single-select dropdowns",
        mandatory: true,
        columns: 2,
        fields: [
          { name: "tenure", label: "Tenure", type: "select", required: true, placeholder: "Select tenure", options: ["Owner-occupier", "Private rental", "Social housing", "Supported living", "Other"] },
          { name: "property", label: "Property Type", type: "select", required: true, placeholder: "Select property type", options: ["Bungalow", "Ground-floor flat", "2-Storey House", "Maisonette", "Other"] },
        ],
        notes: true,
      },
      {
        code: "H02",
        title: "Floors and Essential Rooms",
        hint: "Input: Number input, dropdowns",
        columns: 3,
        fields: [
          { name: "floors", label: "Number of Floors", type: "text", placeholder: "e.g. 2" },
          { name: "bedroom", label: "Bedroom Floor", type: "select", placeholder: "Select floor", options: ["Ground", "First", "Second", "Third or above"] },
          { name: "bathroom", label: "Main Bathroom Floor", type: "select", placeholder: "Select floor", options: ["Ground", "First", "Second", "Third or above"] },
        ],
        notes: true,
      },
      {
        code: "H03",
        title: "Installation Permissions",
        hint: "Input: Single-select radio",
        detail: "Landlord, freeholder or care provider permission to install devices.",
        mandatory: true,
        fields: [
          { name: "permission", label: "Installation permission", type: "radio", required: true, options: ["Confirmed", "Pending", "Not Required", "Unknown"] },
        ],
        notes: true,
        attention: "Choose an option for installation permission",
      },
      {
        code: "H04",
        title: "Home Internet",
        hint: "Input: Single-select radio",
        mandatory: true,
        fields: [
          { name: "internet", label: "Home internet", type: "radio", required: true, options: ["Reliable Wi-Fi", "Unreliable Wi-Fi", "No Internet", "Unknown"] },
        ],
        notes: true,
        attention: "Choose an option for home internet",
      },
      {
        code: "H05",
        title: "Mobile Coverage, Broadband and Power Reliability",
        hint: "Input: Single-select radio",
        fields: [
          { name: "reliability", label: "Overall reliability", type: "radio", options: ["Good", "Variable", "Poor", "Unknown"] },
        ],
        notes: true,
      },
      {
        code: "H06",
        title: "Existing Devices and Platforms",
        hint: "Input: Multi-select checkboxes, textarea",
        fields: [
          { name: "platforms", label: "Platforms in the home", type: "checks", options: ["Alexa", "Google Assistant", "Tuya", "Other Smart Home", "None", "Unknown"] },
          { name: "devices", label: "Existing Device Details", type: "textarea", placeholder: "e.g. Echo Dot in kitchen, smart plugs on bedside lamp" },
        ],
      },
      {
        code: "H07",
        title: "Smartphone / Tablet Availability and Digital Confidence",
        hint: "Input: Single-select toggles",
        columns: 2,
        fields: [
          { name: "device", label: "Device Availability", type: "radio", options: ["Own Device", "Shared Device", "No Device"] },
          { name: "confidence", label: "Digital Confidence", type: "radio", options: ["Confident", "Needs Support", "Unable"] },
        ],
        notes: true,
      },
      {
        code: "H08",
        title: "Existing Adaptations and Monitoring",
        hint: "Input: Textarea",
        detail: "Include existing adaptations, alarms, telecare and monitoring systems.",
        fields: [
          { name: "adaptations", label: "Existing adaptations", type: "textarea", placeholder: "e.g. Grab rails in bathroom, pendant alarm via Careline, bed sensor installed 2023" },
        ],
      },
      {
        code: "H09",
        title: "Physical Access Constraints",
        hint: "Input: Multi-select checkboxes",
        fields: [
          { name: "constraints", label: "Constraints", type: "checks", options: ["Listed Building", "Asbestos Concern", "Wiring Concern", "No-Drill Requirement", "None", "Unknown"] },
        ],
        notes: true,
      },
    ],
  },
  {
    id: 3,
    stepper: "Health & Function",
    title: "Health, Disability & Functional Profile",
    summary: "Understand functional abilities and limitations.",
    questions: [
      {
        code: "F01",
        title: "Relevant Conditions or Functional Difficulties",
        hint: "Input: Multi-select checkboxes",
        mandatory: true,
        fields: [
          { name: "conditions", label: "Conditions", type: "checks", required: true, options: ["Mobility", "Neurological", "Musculoskeletal", "Vision", "Hearing", "Cognitive", "Learning Disability", "Mental Health", "Respiratory", "Other", "Prefer Not to Say"] },
        ],
        notes: true,
        attention: "Select at least one condition or difficulty",
      },
      {
        code: "F02",
        title: "Expected Course of Needs",
        hint: "Input: Single-select radio",
        fields: [
          { name: "course", label: "Expected Course of Needs", type: "radio", options: ["Stable", "Improving", "Progressive", "Fluctuating", "Unknown"] },
        ],
        notes: true,
      },
      {
        code: "F03",
        title: "Mobility & Ambulation",
        hint: "Input: Independence scale 0–4, single-select",
        mandatory: true,
        fields: [
          { name: "independence", label: "Independence Scale", type: "scale", required: true, options: scale, captionLeft: "0 Independent", captionRight: "4 Unable / Unsafe" },
          { name: "equipment", label: "Equipment Used", type: "radio", options: ["None", "Stick", "Frame", "Wheelchair", "Other"] },
        ],
        notes: true,
        attention: "Choose an independence score for mobility",
      },
      {
        code: "F04",
        title: "Transfers (Bed, Chair, Toilet)",
        hint: "Input: Independence scale 0–4",
        fields: [
          { name: "independence", label: "Independence Scale", type: "scale", options: scale, captionLeft: "0 Independent", captionRight: "4 Unable / Unsafe" },
        ],
        notes: true,
      },
      {
        code: "F05",
        title: "Stairs and Entrance Access",
        hint: "Input: Independence scale 0–4 or N/A",
        fields: [
          { name: "independence", label: "Independence Scale", type: "scale", options: scaleNa, captionLeft: "0 Independent", captionRight: "4 Unable / Unsafe" },
        ],
        notes: true,
      },
      {
        code: "F06",
        title: "Vision and Ability to See Switches, Screens and Hazards",
        hint: "Input: Single-select",
        fields: [{ name: "level", label: "Level of difficulty", type: "radio", options: difficulty }],
        notes: true,
      },
      {
        code: "F07",
        title: "Hearing and Ability to Detect Alarms or Speech",
        hint: "Input: Single-select",
        fields: [{ name: "level", label: "Level of difficulty", type: "radio", options: difficulty }],
        notes: true,
      },
      {
        code: "F08",
        title: "Hand Dexterity, Reach and Ability to Operate Controls",
        hint: "Input: Single-select",
        fields: [{ name: "level", label: "Level of difficulty", type: "radio", options: difficulty }],
        notes: true,
      },
      {
        code: "F09",
        title: "Memory, Orientation, Sequencing and Decision-Making",
        hint: "Input: Single-select",
        fields: [{ name: "level", label: "Level of difficulty", type: "radio", options: difficulty }],
        notes: true,
      },
      {
        code: "F10",
        title: "Speech, Communication and Voice Commands",
        hint: "Input: Single-select",
        fields: [{ name: "level", label: "Level of difficulty", type: "radio", options: difficulty }],
        notes: true,
      },
      {
        code: "F11",
        title: "Fatigue, Pain, Breathlessness or Sensory Sensitivities",
        hint: "Input: Frequency scale",
        fields: [{ name: "frequency", label: "Frequency", type: "radio", options: frequency }],
        notes: true,
      },
      {
        code: "F12",
        title: "Fluctuating Needs, Triggers and Increased Risk",
        hint: "Input: Textarea",
        fields: [
          { name: "notes", label: "Triggers", type: "textarea", placeholder: "e.g. Mobility worsens late afternoon; increased confusion during UTs" },
        ],
      },
    ],
  },
  {
    id: 4,
    stepper: "Daily Living",
    title: "Daily Living & Environmental Tasks",
    summary: "Understand the client’s independence in everyday activities.",
    layout: "grid",
    optionalLabel: "all optional",
    questions: [
      task("D01", "Getting In / Out of Bed and Night-time Movement"),
      task("D02", "Using the Toilet / Bathroom"),
      task("D03", "Washing and Personal Care"),
      task("D04", "Preparing Food and Using Kitchen Appliances"),
      task("D05", "Operating Lighting and Switches"),
      task("D06", "Managing Heating, Temperature and Ventilation"),
      task("D07", "Opening / Closing Doors and Controlling Access"),
      task("D08", "Responding to Visitors and Deliveries"),
      task("D09", "Managing Routines, Reminders and Appointments"),
      task("D10", "Accessing Help or Contacting Carers"),
    ],
  },
  {
    id: 5,
    stepper: "Safety Assessment",
    title: "Safety & Safeguarding Screen",
    summary: "Identify potential risks and determine whether technology recommendations can safely proceed.",
    layout: "grid",
    banner: {
      title: "Safety information",
      body: "An immediate safety or safeguarding concern requires the OT to follow local escalation procedures. Technology is not a substitute for urgent care or a safeguarding response.",
    },
    questions: [
      safety("S01", "Falls or Near-Falls in the Past 12 Months"),
      safety("S02", "Night-time Wandering, Disorientation or Unsafe Exits"),
      safety("S03", "Unanswered Calls for Help / Inability to Summon Assistance"),
      safety("S04", "Kitchen Hazards (Unattended Cooking, Appliances, Fire)"),
      safety("S05", "Flood / Water Left Running / Bathroom Incidents"),
      safety("S06", "Door Security, Intruder Concerns or Unsafe Visitor Access"),
      safety("S07", "Temperature-Related Risks (Overheating, Cold Exposure)"),
      safety("S08", "Missed Essential Routines or Appointments"),
      {
        code: "S09",
        title: "Immediate Risk Requiring Action Outside This Assessment",
        hint: "Input: Single-select radio",
        mandatory: true,
        full: true,
        fields: [
          { name: "immediate", label: "Immediate risk", type: "radio", required: true, options: ["No", "Yes – Escalate", "Unsure – Review"] },
        ],
        notes: true,
        attention: "Choose an option for immediate risk",
      },
      {
        code: "S10",
        title: "Statutory Safety Systems",
        hint: "Input: Single-select",
        detail: "Are fire, smoke, CO and other statutory safety systems already compliant?",
        full: true,
        fields: [
          { name: "compliant", label: "Statutory safety systems compliant", type: "radio", options: ["Yes", "No", "Unknown – Specialist Inspection Needed"] },
        ],
        notes: true,
      },
    ],
  },
  {
    id: 6,
    stepper: "Carer & Support",
    title: "Carer Network, Alerts & Response",
    summary: "Understand available support and whether alerts can be acted upon.",
    questions: [
      {
        code: "C01",
        title: "Living Arrangement",
        hint: "Input: Single-select radio",
        mandatory: true,
        fields: [
          { name: "living", label: "Living arrangement", type: "radio", required: true, options: ["Alone", "With Partner or Family", "Shared Support", "24-Hour Staffed", "Other"] },
        ],
        notes: true,
        attention: "Choose an option for Living Arrangement",
      },
      {
        code: "C02",
        title: "Formal and Informal Support Availability",
        hint: "Input: Single-select",
        fields: [
          { name: "support", label: "Support availability", type: "radio", options: ["None", "Unknown", "Occasional", "Daily", "24-Hour"] },
        ],
        notes: true,
      },
      {
        code: "C03",
        title: "Named Person or Service Authorised to Receive Alerts",
        hint: "Input: Yes / No / Pending, response availability",
        fields: [
          { name: "named", label: "Authorised responder", type: "radio", options: ["Yes", "No", "Pending", "24/7", "Daytime", "Limited"] },
        ],
        notes: true,
      },
      {
        code: "C04",
        title: "Preferred Alert Types and Escalation",
        hint: "Input: Multi-select checkboxes, reorderable list",
        fields: [
          { name: "alerts", label: "Alert types", type: "checks", options: ["App Push", "SMS", "Call", "Telecare Centre", "Other"] },
          { name: "order", label: "Escalation Order", type: "order", source: "alerts", placeholder: "Select alert types above to set the escalation order." },
        ],
        notes: true,
      },
      {
        code: "C05",
        title: "Device and Connectivity Management",
        hint: "Input: Textarea",
        detail: "Who will manage devices, connectivity, updates and false alarms?",
        fields: [
          { name: "manager", label: "Device management", type: "textarea", placeholder: "e.g. Daughter manages the app and updates; landlord responsible for router" },
        ],
      },
      {
        code: "C06",
        title: "Carer Burden and Remote Reassurance",
        hint: "Input: Single-select",
        fields: [
          { name: "burden", label: "Carer burden", type: "radio", options: ["Low", "Moderate", "High", "Unknown"] },
        ],
        notes: true,
      },
    ],
  },
  {
    id: 7,
    stepper: "Preferences & Suitability",
    title: "Preferences & Practical Suitability",
    summary: "Understand client preferences, accessibility and acceptance.",
    questions: [
      {
        code: "P01",
        title: "Client Priorities",
        hint: "Input: Multi-select with drag-and-drop ranking (max 3)",
        detail: "Select and rank the client’s top three priorities.",
        mandatory: true,
        fields: [
          {
            name: "priorities",
            label: "Ranked priorities",
            type: "rank",
            required: true,
            max: 3,
            options: ["Independence", "Falls", "Safety", "Night-time", "Communication", "Comfort", "Access", "Carer Reassurance", "Energy", "Other"],
          },
        ],
        notes: true,
        attention: "Select and rank at least one priority",
      },
      {
        code: "P02",
        title: "Control Methods",
        hint: "Input: Multi-select radio/cards",
        fields: [
          { name: "control", label: "Control method", type: "checks", options: ["Automated Sensor", "Carer-operated", "Mixed"] },
        ],
        notes: true,
      },
      {
        code: "P03",
        title: "Tolerance for Cameras, Sensors and Monitoring",
        hint: "Input: Single-select radio",
        fields: [
          { name: "monitoring", label: "Monitoring tolerance", type: "radio", options: ["Cameras Acceptable", "Non-camera Sensors Only", "No Monitoring", "Case-by-case"] },
        ],
        notes: true,
      },
      {
        code: "P04",
        title: "Rooms or Data Categories Excluded from Monitoring",
        hint: "Input: Textarea",
        fields: [
          { name: "excluded", label: "Exclusions", type: "textarea", placeholder: "e.g. No sensors in bathroom; no audio recording anywhere" },
        ],
      },
      {
        code: "P05",
        title: "Accessibility and Device Placement Requirements",
        hint: "Input: Textarea",
        fields: [
          { name: "placement", label: "Placement", type: "textarea", placeholder: "e.g. Controls between 900–1100 mm from floor, reachable from wheelchair" },
        ],
      },
      {
        code: "P06",
        title: "Client Acceptance and Training Needs",
        hint: "Input: Single-select toggles",
        fields: [
          { name: "acceptance", label: "Client Acceptance", type: "radio", options: ["Ready", "Needs Demonstration", "Hesitant", "Declines"] },
          { name: "training", label: "Training Needs", type: "radio", options: ["Low", "Medium", "High"] },
        ],
        notes: true,
      },
      {
        code: "P07",
        title: "Expected Duration of Benefit",
        hint: "Input: Single-select",
        fields: [
          { name: "duration", label: "Expected duration", type: "radio", options: ["Under 12 Months", "1–3 Years", "3–5 Years", "Over 5 Years", "Unknown"] },
        ],
        notes: true,
      },
    ],
  },
  {
    id: 8,
    stepper: "Clinical Outcomes",
    title: "Outcome Baseline & Clinical Judgement",
    summary: "Define measurable goals and document OT judgement before recommendations are generated.",
    questions: [
      {
        code: "O01",
        title: "Baseline Priority Outcomes",
        hint: "Input: Repeatable outcome entry",
        mandatory: true,
        fields: [
          {
            name: "outcomes",
            label: "Outcomes",
            type: "repeatable",
            required: true,
            addLabel: "Add outcome",
            placeholder: "Describe the measurable outcome",
            examples: ["Independent light control", "Fewer unassisted night-time transfers", "Reliable carer notification"],
          },
        ],
        notes: true,
        attention: "Add at least one outcome",
      },
      {
        code: "O02",
        title: "Current Incident Frequency / Assistance Required",
        hint: "Input: Repeatable structured entry",
        fields: [
          { name: "incidents", label: "Incident records", type: "repeatable", addLabel: "Add incident record", placeholder: "e.g. Two night-time falls in the past month, assistance to return to bed" },
        ],
        notes: true,
      },
      {
        code: "O03",
        title: "Existing Non-Digital Alternatives",
        hint: "Input: Repeatable structured entry",
        fields: [
          { name: "alternatives", label: "Alternatives considered", type: "repeatable", addLabel: "Add alternative", placeholder: "e.g. Extra care visits, pendant alarm already declined" },
        ],
        notes: true,
      },
      {
        code: "O04",
        title: "Environmental, Accessibility or Clinical Contraindications",
        hint: "Input: Textarea",
        fields: [
          { name: "contraindications", label: "Contraindications", type: "textarea", placeholder: "e.g. Photosensitive epilepsy – avoid flashing visual alerts" },
        ],
      },
      {
        code: "O05",
        title: "Other Professionals / Services Requiring Approval or Coordination",
        hint: "Input: Repeatable entry",
        fields: [
          { name: "professionals", label: "Professionals and services", type: "repeatable", addLabel: "Add professional / service", placeholder: "e.g. District nurse, housing officer, telecare provider" },
        ],
        notes: true,
      },
      {
        code: "O06",
        title: "OT Confidence in Data Collected",
        hint: "Input: Single-select, textarea",
        mandatory: true,
        fields: [
          { name: "confidence", label: "Confidence", type: "radio", required: true, options: ["High", "Medium", "Low"] },
          { name: "unknowns", label: "Unknowns Requiring Follow-up", type: "textarea", placeholder: "e.g. Confirm broadband contract; check landlord permission" },
        ],
        notes: true,
        attention: "Choose an option for Confidence",
      },
      {
        code: "O07",
        title: "Suggested Reassessment and Outcome Review",
        hint: "Input: Single-select",
        fields: [
          { name: "review", label: "Review point", type: "radio", options: ["Installation", "6 Weeks", "3 Months", "6 Months", "Other"] },
        ],
        notes: true,
      },
    ],
  },
];

export function fieldKey(question, field) {
  return `${question.code}.${field.name}`;
}

export function notesKey(question) {
  return `${question.code}.__notes`;
}

export function isFilled(value) {
  if (Array.isArray(value)) return value.some((item) => String(item ?? "").trim());
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export function questionMissing(question, values = {}) {
  if (!question.mandatory) return false;
  return question.fields.some((field) => field.required && !isFilled(values[fieldKey(question, field)]));
}

export function questionTouched(question, values = {}) {
  if (isFilled(values[notesKey(question)])) return true;
  return question.fields.some((field) => isFilled(values[fieldKey(question, field)]));
}

export function stepById(id) {
  return assessmentSteps.find((step) => step.id === Number(id)) || assessmentSteps[0];
}

export function mandatoryQuestions() {
  return assessmentSteps.flatMap((step) =>
    step.questions.filter((question) => question.mandatory).map((question) => ({ ...question, stepId: step.id, section: step.title })),
  );
}

export function everyQuestion() {
  return assessmentSteps.flatMap((step) => step.questions.map((question) => ({ ...question, stepId: step.id, section: step.title })));
}

export function assessmentStats(answers = {}) {
  const mandatory = mandatoryQuestions();
  const all = everyQuestion();
  const mandatoryDone = mandatory.filter((question) => !questionMissing(question, answers[question.stepId])).length;
  const answered = all.filter((question) => questionTouched(question, answers[question.stepId])).length;
  return {
    mandatoryDone,
    mandatoryTotal: mandatory.length,
    answered,
    total: all.length,
    percent: mandatory.length ? Math.round((mandatoryDone / mandatory.length) * 100) : 0,
  };
}

export const consentGates = [
  { code: "A07", title: "Lawful basis to process health information", stepId: 1 },
  { code: "A06", title: "Client capacity / authority", stepId: 1 },
  { code: "S09", title: "Immediate risk screen", stepId: 5 },
];
