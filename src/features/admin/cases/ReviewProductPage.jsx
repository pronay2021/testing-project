import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findClient } from "../../../lib/clients.js";
import { findPackage, money } from "../../../lib/packages.js";

const starter = [
  "Bath Lift with Reclining Backrest",
  "Bath Lift with Reclining Backrest",
  "Bath Lift with Reclining Backrest",
  "Bath Lift with Reclining Backrest",
];

export default function ReviewProductPage() {
  const { id } = useParams();
  const client = findClient(id);
  const pack = findPackage("gold");
  const [items, setItems] = useState(starter);
  const [draft, setDraft] = useState("");
  const [approved, setApproved] = useState(false);

  if (!client) return <p className="text-sm text-[#667085]">That product review is not available.</p>;

  return (
    <section className="mx-auto max-w-4xl rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#98a2b3]">Card 2: Silver</p>
      <h1 className="mt-1 text-xl font-semibold text-ink">Review Final Product</h1>
      <p className="text-sm text-[#667085]">One-off integration fee – excludes equipment</p>
      <p className="text-sm text-[#98a2b3]">Essential equipment plus additional suitable options.</p>

      <div className="mt-4">
        <p className="text-sm font-semibold">Included equipment ({items.length})</p>
        <ul className="mt-2 space-y-2">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center justify-between rounded-lg border border-[#e6ebef] px-3 py-2 text-sm">
              <span>
                <span className="mr-2 grid inline-grid h-5 w-5 place-items-center rounded-full bg-[#e7faf3] text-xs font-semibold text-[#12B981]">{index + 1}</span>
                {item}
              </span>
              <button type="button" className="text-red-500" aria-label={`Remove ${item}`} onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>
                ×
              </button>
            </li>
          ))}
        </ul>
        <form
          className="mt-3 flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.trim()) return;
            setItems([...items, draft.trim()]);
            setDraft("");
          }}
        >
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add equipment" className="h-10 flex-1 rounded-md border border-[#e4e7ec] px-3 text-sm outline-none" />
          <button type="submit" className="text-sm font-semibold text-[#12B981]">+ Add More</button>
        </form>
      </div>

      <h2 className="mt-6 text-xs font-semibold uppercase">Prescribed equipment</h2>
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

      <h2 className="mt-5 text-sm font-semibold">Key differences</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#44505c]">
        <li>Adds sit-to-stand support and an indoor walking aid</li>
        <li>Adds night lighting on the route to the bathroom</li>
        <li>Toilet frame needs side clearance confirmed on survey</li>
      </ul>

      <button type="button" onClick={() => setApproved(true)} className="mt-6 h-11 w-full rounded-lg bg-[#12B981] text-sm font-semibold text-white">
        {approved ? "Approved" : "✓ Approve"}
      </button>
      <Link to={`/admin/cases/${client.id}/receipt`} className="mt-3 block text-center text-sm font-semibold text-[#12B981]">
        Back to checkout receipt
      </Link>
    </section>
  );
}
