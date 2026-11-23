import { useState } from "react";

function EyeIcon({ off }) {
  if (off) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 3l18 18" strokeLinecap="round" />
        <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" strokeLinecap="round" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9.5 4.2 10.5 7-.4 1.1-1.2 2.4-2.3 3.6M6.1 6.7C4.2 8 2.9 9.8 1.5 12c1 2.8 5 7 10.5 7 1.4 0 2.7-.3 3.9-.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function PasswordField({ label, required = false, error, inputClassName = "", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-ink">
          {label}
          {required ? <span className="ml-1 text-[#f43f5e]">*</span> : null}
        </span>
      ) : null}
      <span className="relative block">
        <input
          type={visible ? "text" : "password"}
          className={`h-11 w-full rounded-md bg-field px-3 pr-11 text-sm text-ink outline-none placeholder:text-[#c5bebe] focus:ring-2 focus:ring-brand/30 ${
            error ? "ring-2 ring-red-400" : ""
          } ${inputClassName}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0aaaa]"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <EyeIcon off={visible} />
        </button>
      </span>
      {error ? <span className="mt-1 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
