import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "../../components/ui/PasswordField.jsx";

export default function PasswordPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!current || !next) {
      setError("Enter your current and new password.");
      return;
    }
    if (next.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    navigate("/account");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <h1 className="font-serif text-3xl font-semibold text-ink">Password Change</h1>
      <div className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <PasswordField label="Current password" value={current} onChange={(event) => setCurrent(event.target.value)} />
        <PasswordField label="New password" value={next} onChange={(event) => setNext(event.target.value)} />
        <PasswordField label="Confirm Password" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
        {error ? <p className="text-xs text-red-500">{error}</p> : null}
        <button type="submit" className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-white">
          Update Password
        </button>
      </div>
    </form>
  );
}
