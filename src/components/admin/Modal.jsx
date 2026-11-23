export default function Modal({ title, onClose, children, className = "max-w-md" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center">
      <button type="button" aria-label="Close dialog" className="absolute inset-0" onClick={onClose} />
      <section className={`relative w-full rounded-2xl bg-[#f7f7f5] p-5 shadow-xl ${className}`}>
        <div className="flex items-start justify-between gap-3">
          <h2 className="w-full text-center text-lg font-semibold text-ink">{title}</h2>
          <button type="button" onClick={onClose} className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full text-[#667085] hover:bg-black/5" aria-label="Close">
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
