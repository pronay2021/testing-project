export default function Avatar({ name, className = "h-11 w-11 text-sm" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#f4efe6,#c5b49a_42%,#8d9a86)] font-semibold text-white shadow-inner ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
