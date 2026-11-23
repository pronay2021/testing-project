export const packages = [
  {
    id: "bronze",
    name: "Bronze",
    tier: "Bronze Care-Safe Essentials",
    fit: "Support is close by and night-time risk is limited.",
    equipment: [
      { item: "AM2 Smart Cellular Hub", location: "Hallway / Central", qty: 1, unit: 185, total: 185 },
      { item: "Pendant Alert", location: "Worn by client", qty: 1, unit: 95, total: 95 },
    ],
    installDate: "18 Nov 2026 (09:30 GMT)",
    training: "Included (45 min remote)",
    warranty: "1 Year Standard Support",
    subtotal: 280,
    installation: 160,
    service: 200,
    serviceLabel: "1-Yr Monitoring Service",
    vat: 0,
    total: 640,
    payment: "Self-funded settlement",
    paymentStatus: "Awaiting payment",
  },
  {
    id: "silver",
    name: "Silver",
    tier: "Silver Care-Safe Assisted Living",
    fit: "A monitored home with one fall sensor and pathway lighting.",
    equipment: [
      { item: "AM2 Smart Cellular Hub", location: "Hallway / Central", qty: 1, unit: 185, total: 185 },
      { item: "Radar Micro-Fall & Presence Sensor", location: "Main Bedroom", qty: 1, unit: 120, total: 120 },
      { item: "Smart Pathway Night Lighting", location: "Hallway", qty: 1, unit: 75, total: 75 },
    ],
    installDate: "18 Nov 2026 (09:30 GMT)",
    training: "Included (1h In-Home)",
    warranty: "2 Years Priority Support",
    subtotal: 380,
    installation: 240,
    service: 660,
    serviceLabel: "Carer App & 2-Yr Service",
    vat: 0,
    total: 1280,
    payment: "DFG direct BACS settlement · Ref: DFG-LCC-2026-8841",
    paymentStatus: "Grant Release Pending",
  },
  {
    id: "gold",
    name: "Gold",
    tier: "Gold Care-Safe Assisted Living",
    fit: "Full night-time, fall and kitchen cover for a client who needs a monitored response.",
    equipment: [
      { item: "AM2 Smart Cellular Hub", location: "Hallway / Central", qty: 1, unit: 185, total: 185 },
      { item: "Radar Micro-Fall & Presence Sensor", location: "Main Bedroom", qty: 2, unit: 120, total: 240 },
      { item: "Smart Pathway Night Lighting", location: "Hallway & Bath", qty: 2, unit: 75, total: 150 },
      { item: "Smart Appliance Safety Plug", location: "Kitchen (Kettle/Hob)", qty: 2, unit: 45, total: 90 },
    ],
    installDate: "18 Nov 2026 (09:30 GMT)",
    training: "Included (1.5h In-Home)",
    warranty: "3 Years Priority Support",
    subtotal: 665,
    installation: 360,
    service: 885,
    serviceLabel: "Carer iPad & 3-Yr Service",
    vat: 0,
    total: 1980,
    payment: "DFG direct BACS settlement · Ref: DFG-LCC-2026-9021",
    paymentStatus: "Grant Release Pending",
  },
];

export function money(value) {
  return `£${Number(value).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function findPackage(id) {
  return packages.find((item) => item.id === id) || packages[2];
}

export function recommendPackage(answers = {}) {
  const living = answers[6]?.["C01.living"];
  const risk = answers[5]?.["S09.immediate"];
  const falls = answers[5]?.["S01.risk"];
  const priorities = answers[7]?.["P01.priorities"] || [];
  const reasons = [];
  let score = 0;

  if (living === "Alone") {
    score += 2;
    reasons.push("the client lives alone");
  }
  if (risk && risk !== "No") {
    score += 3;
    reasons.push("the immediate-risk screen needs action outside this assessment");
  }
  if (falls && falls !== "None" && falls !== "Unknown") {
    score += 2;
    reasons.push(`falls were recorded as ${falls.toLowerCase()}`);
  }
  if (priorities.includes("Night-time") || priorities.includes("Falls")) {
    score += 1;
    reasons.push("falls or night-time support is a ranked priority");
  }

  const id = score >= 4 ? "gold" : score >= 2 ? "silver" : "bronze";
  return { id, reasons };
}
