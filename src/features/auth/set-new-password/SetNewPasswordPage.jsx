import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import Logo from "../../../components/layout/Logo.jsx";
import PasswordField from "../../../components/ui/PasswordField.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import newPasswordImage from "../../../assets/auth/new-password.jpg";
import { clearPendingAuth } from "../../../lib/api/auth.js";

export default function SetNewPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = { password: "", confirmPassword: "" };

    if (!password) nextErrors.password = "Enter your new password.";
    else if (password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (!confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";

    setErrors(nextErrors);
    if (nextErrors.password || nextErrors.confirmPassword) return;

    clearPendingAuth();
    navigate("/login");
  }

  return (
    <AuthLayout image={newPasswordImage} imageAlt="Clinician reviewing a care plan with a patient">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-5 font-serif text-[2rem] font-semibold leading-tight text-ink">
            Enter new password
          </h1>
        </div>

        <div className="space-y-5">
          <PasswordField
            label="Password"
            name="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Enter your password again"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        <div className="mt-6">
          <PrimaryButton>Update Password</PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
}
