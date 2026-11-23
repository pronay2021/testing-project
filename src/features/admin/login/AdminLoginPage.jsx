import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminAuthFrame from "../../../components/layout/AdminAuthFrame.jsx";
import PasswordField from "../../../components/ui/PasswordField.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import TextField from "../../../components/ui/TextField.jsx";
import { isValidEmail, saveSession } from "../../../lib/api/auth.js";

const fieldClass = "border border-[#e4e7ec] bg-white";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValidEmail(email) || !password) {
      setError("Enter your admin email and password.");
      return;
    }
    saveSession({
      email: email.trim(),
      role: "admin",
      name: "Moni Roy",
      title: "Super Admin",
      remember,
    });
    navigate("/admin");
  }

  return (
    <AdminAuthFrame title="Login to your portal" subtitle="Secure access for authorized administrators only.">
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            inputClassName={fieldClass}
          />
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            inputClassName={fieldClass}
          />
        </div>
        {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-[#44505c]">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 accent-brand" />
            Remember me
          </label>
          <Link to="/admin/forgot-password" className="text-[#667085] hover:text-ink">
            Forgot password?
          </Link>
        </div>
        <div className="mt-6">
          <PrimaryButton>Login</PrimaryButton>
        </div>
      </form>
    </AdminAuthFrame>
  );
}
