import { useState } from "react";
import Modal from "../../../components/admin/Modal.jsx";
import { readAdmins, saveAdmins } from "../../../lib/adminPortal.js";

const emptyForm = { name: "", email: "", role: "Admin" };

export default function AdministratorsPage() {
  const [admins, setAdmins] = useState(readAdmins);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [form, setForm] = useState(emptyForm);

  function commit(next) {
    setAdmins(next);
    saveAdmins(next);
  }

  return (
    <section className="rounded-2xl bg-white/80 p-3 sm:p-5">
      <button
        type="button"
        onClick={() => {
          setForm(emptyForm);
          setCreating(true);
        }}
        className="rounded-md bg-[#12B981] px-4 py-2 text-sm font-semibold text-white"
      >
        + Invite new admin
      </button>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="text-[#667085]">
            <tr>
              <th className="px-3 py-3 font-medium">SL no.</th>
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Has Access to</th>
              <th className="px-3 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-t border-black/5">
                <td className="px-3 py-3">{admin.sl}</td>
                <td className="px-3 py-3">{admin.name}</td>
                <td className="px-3 py-3">{admin.email}</td>
                <td className="px-3 py-3">{admin.access}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${admin.name}`}
                      className="grid h-8 w-8 place-items-center rounded-md bg-[#12B981] text-white"
                      onClick={() => {
                        setEditing(admin);
                        setForm({ name: admin.name, email: admin.email, role: admin.access });
                      }}
                    >
                      ✎
                    </button>
                    <button type="button" aria-label={`Remove ${admin.name}`} className="grid h-8 w-8 place-items-center rounded-md bg-red-500 text-white" onClick={() => setRemoving(admin)}>
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {creating ? (
        <Modal title="New Administrator Profile Create" onClose={() => setCreating(false)}>
          <AdminForm
            form={form}
            setForm={setForm}
            submitLabel="Create"
            onCancel={() => setCreating(false)}
            onSubmit={() => {
              if (!form.name.trim() || !form.email.trim()) return;
              commit([{ id: `a${Date.now()}`, sl: "#1233", name: form.name.trim(), email: form.email.trim(), access: form.role }, ...admins]);
              setCreating(false);
            }}
          />
        </Modal>
      ) : null}

      {editing ? (
        <Modal title="Edit Administrator" onClose={() => setEditing(null)}>
          <AdminForm
            form={form}
            setForm={setForm}
            submitLabel="Save"
            onCancel={() => setEditing(null)}
            onSubmit={() => {
              commit(admins.map((admin) => (admin.id === editing.id ? { ...admin, name: form.name, email: form.email, access: form.role } : admin)));
              setEditing(null);
            }}
          />
        </Modal>
      ) : null}

      {removing ? (
        <Modal title="Confirm Remove access" onClose={() => setRemoving(null)} className="max-w-sm">
          <p className="text-center text-sm text-[#667085]">{removing.name} will lose administrator access.</p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => setRemoving(null)} className="h-10 flex-1 rounded-md border border-[#12B981] text-sm font-semibold text-[#12B981]">Cancel</button>
            <button
              type="button"
              onClick={() => {
                commit(admins.filter((admin) => admin.id !== removing.id));
                setRemoving(null);
              }}
              className="h-10 flex-1 rounded-md bg-[#12B981] text-sm font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}

function AdminForm({ form, setForm, onSubmit, onCancel, submitLabel }) {
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="grid items-center gap-2 text-sm sm:grid-cols-[72px_1fr]">
        <span>Name</span>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-10 rounded-md border border-[#e4e7ec] px-3" />
      </label>
      <label className="grid items-center gap-2 text-sm sm:grid-cols-[72px_1fr]">
        <span>Email</span>
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-10 rounded-md border border-[#e4e7ec] px-3" />
      </label>
      <label className="grid items-center gap-2 text-sm sm:grid-cols-[72px_1fr]">
        <span>Role</span>
        <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="h-10 rounded-md border border-[#e4e7ec] bg-white px-3">
          <option>Owner</option>
          <option>Admin</option>
          <option>Super Admin</option>
        </select>
      </label>
      <div className="grid items-center gap-2 text-sm sm:grid-cols-[72px_1fr]">
        <span>Image</span>
        <span className="flex overflow-hidden rounded-md border border-[#e4e7ec]">
          <span className="flex-1 bg-[#ececec] px-3 py-2 text-[#98a2b3]">Choose image</span>
          <button type="button" className="bg-[#dedede] px-3">Choose</button>
        </span>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="h-10 flex-1 rounded-md border border-[#12B981] text-sm font-semibold text-[#12B981]">Cancel</button>
        <button type="submit" className="h-10 flex-1 rounded-md bg-[#12B981] text-sm font-semibold text-white">{submitLabel}</button>
      </div>
    </form>
  );
}
