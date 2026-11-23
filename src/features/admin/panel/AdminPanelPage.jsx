import { overviewStats, readAdminProfile } from "../../../lib/adminPortal.js";

export default function AdminPanelPage() {
  const profile = readAdminProfile();

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white/70 px-5 py-4">
        <p className="text-sm text-[#667085]">Hi, Good Morning</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">{profile.name}</h1>
      </section>
      <section className="rounded-2xl bg-white/80 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-ink">User&apos;s Overview</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {overviewStats.map((stat) => (
            <article key={stat.label} className="rounded-xl bg-[#eceff1] px-3 py-4 text-center">
              <p className={`text-lg ${stat.tone}`}>{stat.mark}</p>
              <p className="mt-2 text-xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs text-[#667085]">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
