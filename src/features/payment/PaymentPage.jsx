import { readAssessment } from "../../lib/assessment.js";
import { clients } from "../../lib/clients.js";
import { findPackage, money } from "../../lib/packages.js";

function formatDate(value) {
  if (!value) return "04 Nov 2026";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PaymentPage() {
  const assessment = readAssessment();
  const stepOne = assessment.answers?.[1] || {};
  const reference = stepOne["A02.reference"] || "";
  const known = clients.find((client) => client.id === reference || client.cardId === reference || reference.toUpperCase().includes("48213"));
  const clientName = known?.name || (reference.includes(" ") ? reference : "Eleanor Vance");
  const address = stepOne["A04.address"] || (known ? "14 Oakwood Crescent, Leeds, LS8 1QA" : "14 Oakwood Crescent, Leeds, LS8 1QA");
  const therapist = stepOne["A01.otName"] || "Sarah Jenkins (HCPC)";
  const pack = findPackage(assessment.packageId || "gold");
  const receiptNo = "REC-2026-08492";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="no-print mb-3 flex flex-col gap-2 rounded-lg bg-[#1f2937] px-4 py-2 text-xs text-white sm:flex-row sm:items-center sm:justify-between">
        <span>PDF Print Preview Mode · Standard A4 Portrait (210 × 297mm)</span>
        <button type="button" onClick={() => window.print()} className="font-semibold text-white">
          Print / Save as PDF
        </button>
      </div>

      <article className="rounded-xl border border-[#e6ebef] bg-white p-4 shadow-sm sm:p-6">
        <header className="flex flex-col gap-4 border-b border-[#e6ebef] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xl font-bold tracking-wide text-[#12B981]">A2 HEALTHTECH</p>
            <p className="text-xs text-[#667085]">Occupational Therapy Smart Home Platform</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">Checkout receipt</p>
            <p className="text-sm text-ink">Receipt No: <span className="font-semibold">{receiptNo}</span></p>
            <p className="text-sm text-ink">Date: {formatDate(stepOne["A01.assessmentDate"])}</p>
            <p className="mt-1 text-sm text-[#12B981]">● Confirmed Order</p>
          </div>
        </header>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-[#f8fafb] p-3">
            <p className="text-[11px] uppercase tracking-wide text-[#98a2b3]">Client name</p>
            <p className="font-semibold text-ink">{clientName}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wide text-[#98a2b3]">Installation address</p>
            <p className="text-sm text-ink">{address}</p>
          </div>
          <div className="rounded-lg bg-[#f8fafb] p-3">
            <p className="text-[11px] uppercase tracking-wide text-[#98a2b3]">Package tier</p>
            <p className="font-semibold text-ink">{pack.tier}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#98a2b3]">Assessment ref</p>
                <p className="text-sm text-ink">{assessment.id}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#98a2b3]">Assessing OT</p>
                <p className="text-sm text-ink">{therapist}</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#344054]">Prescribed equipment</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="min-w-[640px] w-full text-left text-sm">
            <thead className="bg-[#12B981] text-white">
              <tr>
                <th className="px-3 py-2 font-semibold">Item</th>
                <th className="px-3 py-2 font-semibold">Location</th>
                <th className="px-3 py-2 font-semibold">Qty</th>
                <th className="px-3 py-2 font-semibold">Unit price</th>
                <th className="px-3 py-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {pack.equipment.map((line) => (
                <tr key={line.item} className="border-b border-[#eef2f4]">
                  <td className="px-3 py-2 font-medium text-ink">{line.item}</td>
                  <td className="px-3 py-2 text-[#44505c]">{line.location}</td>
                  <td className="px-3 py-2">{line.qty}</td>
                  <td className="px-3 py-2">{money(line.unit)}</td>
                  <td className="px-3 py-2">{money(line.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="space-y-3">
            <section className="rounded-lg border border-[#e6ebef] p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#344054]">Installation & support</h3>
              <dl className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-[#667085]">Installation Date:</dt><dd className="font-semibold text-[#12B981]">{pack.installDate}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[#667085]">Specialist Setup & Training:</dt><dd className="font-semibold text-[#12B981]">{pack.training}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[#667085]">Warranty & Care:</dt><dd className="font-semibold text-[#12B981]">{pack.warranty}</dd></div>
              </dl>
            </section>
            <section className="rounded-lg border border-[#e6ebef] p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#344054]">Payment</h3>
              <p className="mt-2 inline-flex rounded-full bg-[#fff7ed] px-2 py-1 text-xs font-semibold text-[#f97316]">{pack.paymentStatus}</p>
              <p className="mt-2 text-sm text-[#44505c]">{pack.payment}</p>
            </section>
          </div>
          <section className="rounded-lg border border-[#e6ebef] p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#344054]">Summary</h3>
              <span className="text-[11px] text-[#98a2b3]">GBP (£)</span>
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-[#667085]">Equipment Subtotal:</dt><dd>{money(pack.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-[#667085]">Installation & Configuration:</dt><dd>{money(pack.installation)}</dd></div>
              <div className="flex justify-between"><dt className="text-[#667085]">{pack.serviceLabel}:</dt><dd>{money(pack.service)}</dd></div>
              <div className="flex justify-between"><dt className="text-[#667085]">VAT (0% Zero-Rated):</dt><dd>{money(pack.vat)}</dd></div>
            </dl>
            <div className="mt-3 rounded-lg bg-[#12B981] px-3 py-3 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase">Total due</span>
                <span className="text-2xl font-semibold">{money(pack.total)}</span>
              </div>
              <p className="text-xs">DFG Direct Grant</p>
            </div>
          </section>
        </div>

        <footer className="mt-6 border-t border-[#e6ebef] pt-4 text-xs text-[#667085]">
          <p className="font-semibold text-[#344054]">AM2 Technology Ltd · Reg: 12489201 (UK) · VAT Reg: GB 384 1092 84 · ot-support@am2health.co.uk · portal.am2health.co.uk</p>
          <p className="mt-2">
            Thank you for choosing AM2 Occupational Therapy Platform. This receipt confirms the prescribed product package, assistive equipment specification, and associated installation costs authorised by the inspecting Occupational Therapist. Installation and service schedules are subject to client availability and local statutory authority grant drawdown confirmation. For operations enquiries or amendments, please quote Receipt Number {receiptNo} and Assessment ID {assessment.id}.
          </p>
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:justify-between">
            <span>Generated automatically via AM2 OT Clinical Portal v4.2</span>
            <span>Page 1 of 1 · Certified Authentic Digital Copy</span>
          </div>
        </footer>
      </article>
    </div>
  );
}
