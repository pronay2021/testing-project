import Logo from "./Logo.jsx";

export default function AdminAuthFrame({ title, subtitle, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e6ebed] px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="h-12" />
          <h1 className="mt-6 text-[1.7rem] font-semibold tracking-tight text-ink">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-[#667085]">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </main>
  );
}
