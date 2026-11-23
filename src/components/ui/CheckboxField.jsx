export default function CheckboxField({ label, checked, onChange, className = "" }) {
  return (
    <label className={`flex items-start gap-2 text-xs text-[#5f5a5a] ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand"
      />
      <span>{label}</span>
    </label>
  );
}
