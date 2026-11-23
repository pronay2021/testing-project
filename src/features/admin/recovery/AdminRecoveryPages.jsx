import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminAuthFrame from "../../../components/layout/AdminAuthFrame.jsx";
import PasswordField from "../../../components/ui/PasswordField.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import TextField from "../../../components/ui/TextField.jsx";
import { isValidEmail, savePendingAuth } from "../../../lib/api/auth.js";

const fieldClass = "border border-[#e4e7ec] bg-white";
const CODE_LENGTH = 6;

export function AdminForgotPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    savePendingAuth({ purpose: "admin-reset", email: email.trim() });
    navigate("/admin/check-email");
  }

  return (
    <AdminAuthFrame title="Forget Password?" subtitle="We'll email you a reset link.">
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          error={error}
          onChange={(event) => setEmail(event.target.value)}
          inputClassName={fieldClass}
        />
        <div className="mt-6">
          <PrimaryButton>Send reset link</PrimaryButton>
        </div>
      </form>
    </AdminAuthFrame>
  );
}

export function CheckEmailPage() {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  function focusAt(index) {
    inputsRef.current[index]?.focus();
  }

  function handleChange(index, value) {
    const cleaned = value.replace(/\D/g, "");
    const next = [...digits];
    if (!cleaned) {
      next[index] = "";
      setDigits(next);
      return;
    }
    cleaned.split("").forEach((char, offset) => {
      if (index + offset < CODE_LENGTH) next[index + offset] = char;
    });
    setDigits(next);
    setError("");
    focusAt(Math.min(index + cleaned.length, CODE_LENGTH - 1));
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      focusAt(index - 1);
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, index) => {
      next[index] = char;
    });
    setDigits(next);
    focusAt(Math.min(pasted.length, CODE_LENGTH) - 1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (digits.join("").length < CODE_LENGTH) {
      setError("Enter the 6-digit code.");
      return;
    }
    navigate("/admin/reset-password");
  }

  return (
    <AdminAuthFrame title="Check your email" subtitle="Enter the 6-digit code we sent.">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputsRef.current[index] = node;
              }}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Digit ${index + 1}`}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="h-12 w-full max-w-12 rounded-md border border-[#e4e7ec] bg-white text-center text-lg font-semibold text-ink outline-none focus:border-[#12B981]"
            />
          ))}
        </div>
        {error ? <p className="mt-3 text-center text-xs text-red-500">{error}</p> : null}
        <div className="mt-6">
          <PrimaryButton>Verify code</PrimaryButton>
        </div>
        <button
          type="button"
          className="mt-4 w-full text-center text-sm text-[#667085] hover:text-ink"
          onClick={() => {
            setDigits(Array(CODE_LENGTH).fill(""));
            setResent(true);
            setError("");
            focusAt(0);
          }}
        >
          {resent ? "Code sent again" : "Resend code"}
        </button>
      </form>
    </AdminAuthFrame>
  );
}

export function AdminResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (password.length < 8 || password !== confirm) {
      setError("Use at least 8 characters and match both fields.");
      return;
    }
    navigate("/admin/thanks");
  }

  return (
    <AdminAuthFrame title="Set a new password" subtitle="Choose a password you haven't used before.">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <PasswordField label="New password" placeholder="New password" value={password} onChange={(event) => setPassword(event.target.value)} inputClassName={fieldClass} />
          <PasswordField label="Confirm password" placeholder="Confirm password" value={confirm} onChange={(event) => setConfirm(event.target.value)} inputClassName={fieldClass} />
        </div>
        {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}
        <div className="mt-6">
          <PrimaryButton>Update password</PrimaryButton>
        </div>
      </form>
    </AdminAuthFrame>
  );
}

export function ThanksPage() {
  return (
    <AdminAuthFrame title="Password updated" subtitle="You can now sign in with your new password.">
      <Link to="/admin/login" className="flex h-12 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-dark">
        Back to login
      </Link>
    </AdminAuthFrame>
  );
}
