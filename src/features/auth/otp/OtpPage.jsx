import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import Logo from "../../../components/layout/Logo.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import otpImage from "../../../assets/auth/otp.jpg";
import { readPendingAuth } from "../../../lib/api/auth.js";

const LENGTH = 6;

export default function OtpPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const purpose = params.get("purpose") === "reset" ? "reset" : "signup";
  const pending = readPendingAuth();
  const inputsRef = useRef([]);
  const [digits, setDigits] = useState(Array(LENGTH).fill(""));
  const [error, setError] = useState("");

  function focusAt(index) {
    const input = inputsRef.current[index];
    if (input) input.focus();
  }

  function applyDigits(nextDigits) {
    setDigits(nextDigits);
    setError("");
  }

  function handleChange(index, value) {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      applyDigits(next);
      return;
    }

    const next = [...digits];
    cleaned.split("").forEach((char, offset) => {
      if (index + offset < LENGTH) next[index + offset] = char;
    });
    applyDigits(next);
    focusAt(Math.min(index + cleaned.length, LENGTH - 1));
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      applyDigits(next);
      focusAt(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) focusAt(index - 1);
    if (event.key === "ArrowRight" && index < LENGTH - 1) focusAt(index + 1);
  }

  function handlePaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    const next = Array(LENGTH).fill("");
    pasted.split("").forEach((char, index) => {
      next[index] = char;
    });
    applyDigits(next);
    focusAt(Math.min(pasted.length, LENGTH) - 1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const code = digits.join("");
    if (code.length < LENGTH) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    if (purpose === "reset") navigate("/reset-password");
    else navigate("/login");
  }

  return (
    <AuthLayout image={otpImage} imageAlt="Clinician reviewing a verification step">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Logo />
        <h1 className="mt-6 text-center font-serif text-[1.85rem] font-semibold leading-tight text-ink">
          Enter Emailed Verification Code
        </h1>
        {pending?.email ? (
          <p className="mt-2 text-center text-sm text-[#8a8484]">Sent to {pending.email}</p>
        ) : null}

        <div className="mt-8 flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
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
              placeholder="-"
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="h-12 w-10 rounded-md border border-[#f0f0f0] bg-white text-center text-lg font-semibold text-ink shadow-sm outline-none placeholder:text-[#d0d0d0] focus:ring-2 focus:ring-brand/40 sm:h-14 sm:w-12"
            />
          ))}
        </div>
        {error ? <p className="mt-3 text-center text-xs text-red-500">{error}</p> : null}

        <div className="mt-6 w-full max-w-[320px]">
          <PrimaryButton>Submit</PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
}
