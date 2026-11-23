import { useState } from "react";
import { readApiKey, saveApiKey } from "../../../lib/adminPortal.js";

export default function SettingsPage() {
  const [key, setKey] = useState(readApiKey);
  const [saved, setSaved] = useState(false);

  return (
    <section className="rounded-2xl bg-white/80 p-4 sm:p-5">
      <h1 className="text-lg font-semibold text-ink">Update Your Api Key</h1>
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          saveApiKey(key.trim());
          setSaved(true);
        }}
      >
        <input
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            setSaved(false);
          }}
          placeholder="Enter your api key here"
          className="h-11 flex-1 rounded-md bg-[#e7eef8] px-4 text-sm outline-none"
        />
        <button type="submit" className="h-11 rounded-md bg-[#12B981] px-6 text-sm font-semibold text-white">
          Save
        </button>
      </form>
      {saved ? <p className="mt-3 text-sm text-emerald-700">API key saved.</p> : null}
    </section>
  );
}
