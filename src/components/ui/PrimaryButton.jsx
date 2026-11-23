export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="submit"
      className={`h-12 w-full rounded-md bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
