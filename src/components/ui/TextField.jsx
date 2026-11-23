export default function TextField({
  label,
  required = false,
  error,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <label className={`block ${className}`}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-ink">
          {label}
          {required ? <span className="ml-1 text-[#f43f5e]">*</span> : null}
        </span>
      ) : null}
      <input
        className={`h-11 w-full rounded-md bg-field px-3 text-sm text-ink outline-none placeholder:text-[#c5bebe] focus:ring-2 focus:ring-brand/30 ${
          error ? "ring-2 ring-red-400" : ""
        } ${inputClassName}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
