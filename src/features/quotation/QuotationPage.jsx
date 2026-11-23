import { Link } from "react-router-dom";
import { readAssessment } from "../../lib/assessment.js";

const lines = [
  { item: "Height-adjustable shower chair", amount: "£420" },
  { item: "Grab rail set, 3 points", amount: "£180" },
  { item: "Bedside alert sensor", amount: "£460" },
  { item: "Fitting and therapist handover", amount: "£220" },
];

export default function QuotationPage() {
  const assessment = readAssessment();

  return (
    <article className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="bg-[#e7faf3] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">Card 2</p>
        <h1 className="font-serif text-3xl font-semibold text-ink">Silver</h1>
        <p className="text-sm text-[#667085]">Quotation {assessment.id}</p>
      </div>
      <ul className="divide-y divide-black/5 px-6">
        {lines.map((line) => (
          <li key={line.item} className="flex items-center justify-between py-3 text-sm">
            <span className="text-[#44505c]">{line.item}</span>
            <span className="font-semibold text-ink">{line.amount}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm text-[#667085]">Total</span>
        <span className="text-2xl font-semibold text-ink">£1,280</span>
      </div>
      <div className="px-6 pb-6">
        <Link
          to="/payment"
          className="flex h-12 items-center justify-center rounded-md bg-brand text-sm font-semibold text-white"
        >
          Continue to payment
        </Link>
      </div>
    </article>
  );
}
