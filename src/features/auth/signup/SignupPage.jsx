import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout.jsx";
import Logo from "../../../components/layout/Logo.jsx";
import OrDivider from "../../../components/ui/OrDivider.jsx";
import PasswordField from "../../../components/ui/PasswordField.jsx";
import PrimaryButton from "../../../components/ui/PrimaryButton.jsx";
import TextField from "../../../components/ui/TextField.jsx";
import signupImage from "../../../assets/auth/signup.jpg";
import { isValidEmail, savePendingAuth } from "../../../lib/api/auth.js";

const locations = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  location: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: true,
};

export default function SignupPage() {
  const navigate = useNavigate();
  const datePickerRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openDatePicker() {
    const picker = datePickerRef.current;
    if (!picker) return;
    if (typeof picker.showPicker === "function") picker.showPicker();
    else picker.click();
  }

  function handleDatePicked(event) {
    const value = event.target.value;
    if (!value) return;
    const [year, month, day] = value.split("-");
    update("dateOfBirth", `${day}/${month}/${year}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!form.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.phone.trim()) nextErrors.phone = "Enter your phone number.";
    else if (form.phone.replace(/\D/g, "").length < 8) nextErrors.phone = "Enter a valid phone number.";
    if (!form.dateOfBirth.trim()) nextErrors.dateOfBirth = "Enter your date of birth.";
    else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.dateOfBirth.trim())) {
      nextErrors.dateOfBirth = "Use the format DD/MM/YYYY.";
    }
    if (!form.location) nextErrors.location = "Select your current location.";
    if (!form.password) nextErrors.password = "Enter a password.";
    else if (form.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (!form.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    if (!form.acceptedTerms) nextErrors.acceptedTerms = "Agree to the terms to continue.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    savePendingAuth({
      purpose: "signup",
      email: form.email.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
    });
    navigate("/otp?purpose=signup");
  }

  return (
    <AuthLayout
      wide
      image={signupImage}
      imageAlt="Clinician ready to welcome a new account holder"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-7 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-4 font-serif text-[2rem] font-semibold leading-tight text-ink">
            Create your free account
          </h1>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="First Name"
              required
              name="firstName"
              autoComplete="given-name"
              placeholder="Enter First Name"
              value={form.firstName}
              error={errors.firstName}
              onChange={(event) => update("firstName", event.target.value)}
            />
            <TextField
              label="Last Name"
              required
              name="lastName"
              autoComplete="family-name"
              placeholder="Enter Last Name"
              value={form.lastName}
              error={errors.lastName}
              onChange={(event) => update("lastName", event.target.value)}
            />
          </div>

          <TextField
            label="Email Address"
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address here"
            value={form.email}
            error={errors.email}
            onChange={(event) => update("email", event.target.value)}
          />
          <TextField
            label="Phone Number"
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="Enter your phone number here"
            value={form.phone}
            error={errors.phone}
            onChange={(event) => update("phone", event.target.value)}
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">
              Date of Birth
              <span className="ml-1 text-[#f43f5e]">*</span>
            </span>
            <span className="relative block">
              <input
                name="dateOfBirth"
                inputMode="numeric"
                placeholder="(DD/MM/YYYY)"
                value={form.dateOfBirth}
                onChange={(event) => update("dateOfBirth", event.target.value)}
                className={`h-11 w-full rounded-md bg-field px-3 pr-11 text-sm text-ink outline-none placeholder:text-[#c5bebe] focus:ring-2 focus:ring-brand/30 ${
                  errors.dateOfBirth ? "ring-2 ring-red-400" : ""
                }`}
              />
              <button
                type="button"
                onClick={openDatePicker}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0aaaa]"
                aria-label="Open calendar"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3.5" y="5" width="17" height="15" rx="2" />
                  <path d="M8 3.5V7M16 3.5V7M3.5 10h17" strokeLinecap="round" />
                </svg>
              </button>
              <input
                ref={datePickerRef}
                type="date"
                tabIndex={-1}
                onChange={handleDatePicked}
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-0"
                aria-hidden="true"
              />
            </span>
            {errors.dateOfBirth ? (
              <span className="mt-1 block text-xs text-red-500">{errors.dateOfBirth}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">
              Current Location
              <span className="ml-1 text-[#f43f5e]">*</span>
            </span>
            <span className="relative block">
              <select
                name="location"
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                className={`h-11 w-full appearance-none rounded-md bg-field px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-brand/30 ${
                  form.location ? "text-ink" : "text-[#c5bebe]"
                } ${errors.location ? "ring-2 ring-red-400" : ""}`}
              >
                <option value="">Please select your current location</option>
                {locations.map((location) => (
                  <option key={location} value={location} className="text-ink">
                    {location}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b0aaaa]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {errors.location ? <span className="mt-1 block text-xs text-red-500">{errors.location}</span> : null}
          </label>

          <PasswordField
            label="Password"
            required
            name="password"
            autoComplete="new-password"
            placeholder="Enter your password again"
            value={form.password}
            error={errors.password}
            onChange={(event) => update("password", event.target.value)}
          />
          <PasswordField
            label="Confirm Password"
            required
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Enter your password again"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) => update("confirmPassword", event.target.value)}
          />
        </div>

        <label className="mt-3 flex items-start gap-2 text-xs text-[#5f5a5a]">
          <input
            type="checkbox"
            checked={form.acceptedTerms}
            onChange={(event) => update("acceptedTerms", event.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand"
          />
          <span>By continuing, I agree to the Terms &amp; Conditions and Privacy Policy</span>
        </label>
        {errors.acceptedTerms ? (
          <span className="mt-1 block text-xs text-red-500">{errors.acceptedTerms}</span>
        ) : null}

        <div className="mt-5">
          <PrimaryButton>Sign Up</PrimaryButton>
        </div>

        <OrDivider />

        <p className="text-center text-sm text-[#8a8484]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand hover:text-brand-dark">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
