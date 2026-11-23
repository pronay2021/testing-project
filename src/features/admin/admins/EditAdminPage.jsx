import { useState } from "react";
import TextField from "../../../components/ui/TextField.jsx";
import { readSession, saveSession } from "../../../lib/api/auth.js";

export default function EditAdminPage() {
  const session = readSession() || {};
  const [name, setName] = useState(session.name || "Priya Shah");
  const [email, setEmail] = useState(session.email || "");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    saveSession({ ...session, name, email, role: "admin", title: "Administrator" });
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <h1 className="font-serif text-3xl font-semibold text-ink">Edit Admin</h1>
      <div className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <TextField label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
        <TextField label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button type="submit" className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white">
          Save admin
        </button>
        {saved ? <p className="text-sm text-emerald-600">Saved</p> : null}
      </div>
    </form>
  );
}
