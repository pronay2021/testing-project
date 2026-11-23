import { Link, useParams } from "react-router-dom";
import { readUsers } from "../../../lib/users.js";

export default function UserDetailPage() {
  const { id } = useParams();
  const user = readUsers().find((item) => item.id === id);

  if (!user) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink">User not found</h1>
        <Link to="/admin/users" className="mt-4 inline-block text-sm font-semibold text-brand">
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">User detail</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold text-ink">{user.name}</h1>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-[#667085]">Email</dt>
          <dd className="font-semibold text-ink">{user.email}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[#667085]">Role</dt>
          <dd className="font-semibold text-ink">{user.role}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[#667085]">Status</dt>
          <dd className="font-semibold text-ink">{user.status}</dd>
        </div>
      </dl>
      <Link to="/admin/users" className="mt-6 inline-block text-sm font-semibold text-brand">
        Back to users
      </Link>
    </article>
  );
}
