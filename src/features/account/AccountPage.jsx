import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "../../components/ui/TextField.jsx";
import { readSession, saveSession } from "../../lib/api/auth.js";

export default function AccountPage() {
  const session = readSession() || {};
  const [name, setName] = useState(session.name || "Sarah Mitchell");
  const [email, setEmail] = useState(session.email || "");
  const [title, setTitle] = useState(session.title || "Occupational Therapist");
  const [organisation, setOrganisation] = useState(session.organisation || "Leeds Community OT Service");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    saveSession({ ...session, name, email, title, organisation });
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <h1 className="font-serif text-3xl font-semibold text-ink">Account Setting</h1>
      <p className="mt-1 text-sm text-[#667085]">Update the clinician profile shown across the workspace.</p>
      <div className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2">
        <TextField label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
        <TextField label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextField label="Role" value={title} onChange={(event) => setTitle(event.target.value)} />
        <TextField label="Organisation" value={organisation} onChange={(event) => setOrganisation(event.target.value)} />
        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button type="submit" className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white">
            Save changes
          </button>
          <Link to="/account/password" className="text-sm font-semibold text-brand">
            Password Change
          </Link>
          {saved ? <span className="text-sm text-emerald-600">Saved</span> : null}
        </div>
      </div>
    </form>
  );
}
