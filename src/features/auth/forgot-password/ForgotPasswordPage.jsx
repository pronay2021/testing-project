import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import Logo from "../../../components/layout/Logo.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import TextField from "../../../components/ui/TextField.jsx";
import resetImage from "../../../assets/auth/reset.jpg";
import { isValidEmail, savePendingAuth } from "../../../lib/api/auth.js";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    savePendingAuth({ purpose: "reset", email: email.trim() });
    navigate("/otp?purpose=reset");
  }

  return (
    <AuthLayout image={resetImage} imageAlt="Clinician supporting a password reset">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-5 font-serif text-[2rem] font-semibold leading-tight text-ink">
            Reset your password
          </h1>
        </div>

        <TextField
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          error={error}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
        />

        <div className="mt-6">
          <PrimaryButton>Request Password Change</PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
}
