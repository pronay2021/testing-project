import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import Logo from "../../../components/layout/Logo.jsx";
import CheckboxField from "../../../components/ui/CheckboxField.jsx";
import OrDivider from "../../../components/ui/OrDivider.jsx";
import PasswordField from "../../../components/ui/PasswordField.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import TextField from "../../../components/ui/TextField.jsx";
import loginImage from "../../../assets/auth/login.jpg";
import { isValidEmail, saveSession } from "../../../lib/api/auth.js";

const emptyErrors = { email: "", password: "" };

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState(emptyErrors);

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = { ...emptyErrors };

    if (!email.trim()) nextErrors.email = "Enter your email address.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";

    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    saveSession({
      email: email.trim(),
      remember,
      role: "user",
      name: "Sarah Mitchell",
      title: "Occupational Therapist",
    });
    navigate("/dashboard");
  }

  return (
    <AuthLayout image={loginImage} imageAlt="Clinician speaking with a patient during a consultation">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-5 font-serif text-[2rem] font-semibold leading-tight text-ink">
            Sign in to your account
          </h1>
        </div>

        <div className="space-y-5">
          <TextField
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address here"
            value={email}
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <CheckboxField label="Remember Password" checked={remember} onChange={setRemember} />
          <Link to="/forgot-password" className="text-xs text-[#8a8484] hover:text-brand">
            Forget Password?
          </Link>
        </div>

        <div className="mt-6">
          <PrimaryButton>Log in</PrimaryButton>
        </div>

        <OrDivider />

        <p className="text-center text-sm text-[#8a8484]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-brand hover:text-brand-dark">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
