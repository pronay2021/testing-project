import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findClient } from "../../../lib/clients.js";
import { findPackage, money } from "../../../lib/packages.js";

export default function AdminReceiptPage() {
  const { id } = useParams();
  const client = findClient(id);
  const pack = findPackage("gold");
  const [approved, setApproved] = useState(false);

  if (!client) {
    return <p className="text-sm text-[#667085]">That receipt is not available.</p>;
  }

  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-4 shadow-sm sm:p-6">
      <header className="flex flex-col gap-3 border-b border-[#e6ebef] pb-4 sm:flex-row sm:justify-between">
        <div>
          <p className="text-xl font-bold text-[#12B981]">A2 HEALTHTECH</p>
          <p className="text-xs text-[#667085]">Occupational Therapy Smart Home Platform</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">Checkout receipt</p>
          <p className="text-sm">Receipt No: REC-2026-08492</p>
          <p className="text-sm">Date: 04 Nov 2026</p>
          <p className="text-sm text-[#12B981]">● {approved ? "Approved" : "Confirmed Order"}</p>
        </div>
      </header>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-[#f8fafb] p-3 text-sm">
          <p className="text-[11px] uppercase text-[#98a2b3]">Client name</p>
          <p className="font-semibold">{client.name}</p>
          <p className="mt-2 text-[11px] uppercase text-[#98a2b3]">Installation address</p>
          <p>14 Oakwood Crescent, Leeds, LS8 1QA</p>
        </div>
        <div className="rounded-lg bg-[#f8fafb] p-3 text-sm">
          <p className="text-[11px] uppercase text-[#98a2b3]">Package tier</p>
          <p className="font-semibold">{pack.tier}</p>
          <p className="mt-2 text-[11px] uppercase text-[#98a2b3]">Assessment ref</p>
          <p>{client.progressRef}</p>
          <p className="mt-2 text-[11px] uppercase text-[#98a2b3]">Assessing OT</p>
          <p>{client.assignedOt}</p>
        </div>
      </div>
      <h2 className="mt-5 text-xs font-semibold uppercase">Prescribed equipment</h2>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-[640px] w-full text-left text-sm">
          <thead className="bg-[#12B981] text-white">
            <tr>
              <th className="px-3 py-2">Item</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Unit price</th>
              <th className="px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {pack.equipment.map((line) => (
              <tr key={line.item} className="border-b border-[#eef2f4]">
                <td className="px-3 py-2">{line.item}</td>
                <td className="px-3 py-2">{line.location}</td>
                <td className="px-3 py-2">{line.qty}</td>
                <td className="px-3 py-2">{money(line.unit)}</td>
                <td className="px-3 py-2">{money(line.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-[#e6ebef] p-3 text-sm">
          <h3 className="text-xs font-semibold uppercase">Installation & support</h3>
          <p className="mt-2">Installation Date: <span className="font-semibold text-[#12B981]">{pack.installDate}</span></p>
          <p>Specialist Setup & Training: <span className="font-semibold text-[#12B981]">{pack.training}</span></p>
          <p>Warranty & Care: <span className="font-semibold text-[#12B981]">{pack.warranty}</span></p>
          <p className="mt-3 text-xs font-semibold uppercase">Payment</p>
          <p className="mt-1 inline-flex rounded-full bg-[#fff7ed] px-2 py-1 text-xs font-semibold text-[#f97316]">{pack.paymentStatus}</p>
          <p className="mt-1">{pack.payment}</p>
        </div>
        <div className="rounded-lg border border-[#e6ebef] p-3 text-sm">
          <h3 className="text-xs font-semibold uppercase">Summary</h3>
          <p className="mt-2 flex justify-between"><span>Equipment Subtotal</span><span>{money(pack.subtotal)}</span></p>
          <p className="flex justify-between"><span>Installation & Configuration</span><span>{money(pack.installation)}</span></p>
          <p className="flex justify-between"><span>{pack.serviceLabel}</span><span>{money(pack.service)}</span></p>
          <p className="flex justify-between"><span>VAT (0% Zero-Rated)</span><span>{money(pack.vat)}</span></p>
          <div className="mt-3 rounded-lg bg-[#12B981] px-3 py-3 text-white">
            <div className="flex items-center justify-between"><span className="text-xs uppercase">Total due</span><span className="text-2xl font-semibold">{money(pack.total)}</span></div>
            <p className="text-xs">DFG Direct Grant</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-[#667085]">AM2 Technology Ltd · Reg: 12489201 (UK) · VAT Reg: GB 384 1092 84 · ot-support@am2health.co.uk</p>
      <div className="mt-4 space-y-3">
        <Link to={`/admin/cases/${client.id}/product`} className="flex h-11 items-center justify-center rounded-lg border border-[#12B981] text-sm font-semibold text-[#12B981]">
          Edit Product →
        </Link>
        <button type="button" onClick={() => setApproved(true)} className="h-11 w-full rounded-lg bg-[#12B981] text-sm font-semibold text-white">
          {approved ? "Approved" : "✓ Approve"}
        </button>
      </div>
    </article>
  );
}
