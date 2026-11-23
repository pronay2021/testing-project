import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../../components/ui/TextField.jsx";
import { isValidEmail } from "../../../lib/api/auth.js";
import { addUser } from "../../../lib/users.js";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Occupational Therapist");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !isValidEmail(email)) {
      setError("Enter a name and a valid email.");
      return;
    }
    addUser({ name: name.trim(), email: email.trim(), role });
    navigate("/admin/users");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <h1 className="font-serif text-3xl font-semibold text-ink">New Create</h1>
      <div className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <TextField label="Full name" required value={name} onChange={(event) => setName(event.target.value)} />
        <TextField label="Email Address" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Role</span>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="h-11 w-full rounded-md bg-field px-3 text-sm text-ink outline-none"
          >
            <option>Occupational Therapist</option>
            <option>Admin</option>
          </select>
        </label>
        {error ? <p className="text-xs text-red-500">{error}</p> : null}
        <button type="submit" className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white">
          Create user
        </button>
      </div>
    </form>
  );
}
