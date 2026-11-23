import { fieldKey, isFilled, notesKey, questionMissing } from "./steps.js";

function pillClass(active) {
  return `rounded-lg border px-3 py-2 text-left text-sm ${
    active ? "border-[#12B981] bg-[#e7faf3] font-semibold text-[#067a52]" : "border-[#e4e7ec] bg-white text-[#344054] hover:border-[#98a2b3]"
  }`;
}

function OptionBoxes({ options, value, onPick, multiple = false, columns = true }) {
  const selected = multiple ? value : null;
  return (
    <div className={`grid gap-3 ${columns ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {options.map((option) => {
        const active = multiple ? selected.includes(option) : value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            className={`flex min-h-12 items-center gap-3 rounded-md border bg-white px-4 py-3 text-left text-sm text-[#344054] ${
              active ? "border-[#12B981]" : "border-[#d9dee5]"
            }`}
            onClick={() => onPick(option)}
          >
            <span
              className={`grid h-[18px] w-[18px] shrink-0 place-items-center border bg-white ${
                multiple ? "rounded-[4px]" : "rounded-full"
              } ${active ? "border-[#12B981]" : "border-[#c5cdd6]"}`}
            >
              {active ? <span className={`${multiple ? "h-2.5 w-2.5 rounded-[2px]" : "h-2.5 w-2.5 rounded-full"} bg-[#12B981]`} /> : null}
            </span>
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
}

function FieldControl({ question, field, values, onChange }) {
  const key = fieldKey(question, field);
  const value = values[key];
  const label = (
    <span className="mb-2 block text-sm font-medium text-ink">
      {field.label}
      {field.required ? <span className="text-red-500"> *(required)</span> : null}
    </span>
  );

  if (field.type === "readonly") {
    return (
      <div className={field.wide ? "sm:col-span-2" : ""}>
        {label}
        <div className="flex h-11 items-center rounded-lg border border-[#e4e7ec] bg-[#f8fafb] px-3 text-sm text-[#667085]">
          {values.__assessmentId || "Auto-generated"}
        </div>
        {field.hint ? <p className="mt-1 text-xs text-[#98a2b3]">{field.hint}</p> : null}
      </div>
    );
  }

  if (field.type === "text" || field.type === "date") {
    return (
      <label className={`block ${field.wide ? "sm:col-span-2" : ""}`}>
        {label}
        <input
          type={field.type === "date" ? "date" : "text"}
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(key, event.target.value)}
          className="h-11 w-full rounded-lg border border-[#e4e7ec] bg-white px-3 text-sm outline-none placeholder:text-[#b0b7c3] focus:border-[#12B981]"
        />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="block sm:col-span-2">
        {field.label ? label : null}
        <textarea
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(key, event.target.value)}
          className="min-h-20 w-full rounded-lg border border-[#e4e7ec] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#b0b7c3] focus:border-[#12B981]"
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block">
        {label}
        <select
          value={value || ""}
          onChange={(event) => onChange(key, event.target.value)}
          className={`h-11 w-full rounded-lg border border-[#e4e7ec] bg-white px-3 text-sm outline-none focus:border-[#12B981] ${value ? "text-ink" : "text-[#98a2b3]"}`}
        >
          <option value="">{field.placeholder || "Select"}</option>
          {field.options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "radio") {
    const grouped = question.fields.filter((item) => item.type === "radio" || item.type === "checks").length > 1;
    return (
      <div className={question.columns ? "" : "sm:col-span-2"}>
        {grouped && field.label ? <span className="mb-2 block text-sm text-[#667085]">{field.label}</span> : null}
        <OptionBoxes options={field.options} value={value} columns={!question.columns} onPick={(option) => onChange(key, option)} />
      </div>
    );
  }

  if (field.type === "checks") {
    const selected = Array.isArray(value) ? value : [];
    const grouped = question.fields.filter((item) => item.type === "radio" || item.type === "checks").length > 1;
    return (
      <div className="sm:col-span-2">
        {grouped && field.label ? <span className="mb-2 block text-sm text-[#667085]">{field.label}</span> : null}
        <OptionBoxes
          options={field.options}
          value={selected}
          multiple
          onPick={(option) => onChange(key, selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option])}
        />
      </div>
    );
  }

  if (field.type === "scale") {
    return (
      <div className="sm:col-span-2">
        {field.label ? label : null}
        <div className="flex flex-wrap gap-2">
          {field.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`grid h-10 min-w-10 place-items-center rounded-full border px-2 text-sm font-semibold ${
                value === option ? "border-[#12B981] bg-[#12B981] text-white" : "border-[#e4e7ec] bg-white text-[#344054]"
              }`}
              onClick={() => onChange(key, option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-[#98a2b3]">
          <span>{field.captionLeft}</span>
          <span>{field.captionRight}</span>
        </div>
      </div>
    );
  }

  if (field.type === "rank") {
    const ranked = Array.isArray(value) ? value : [];
    function toggle(option) {
      if (ranked.includes(option)) onChange(key, ranked.filter((item) => item !== option));
      else if (ranked.length < field.max) onChange(key, [...ranked, option]);
    }
    function move(index, direction) {
      const next = [...ranked];
      const target = index + direction;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      onChange(key, next);
    }
    return (
      <div className="sm:col-span-2">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-ink">Ranked priorities · drag to reorder</span>
          <span className="text-[#667085]">
            {ranked.length} / {field.max}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {field.options.map((option) => (
            <button key={option} type="button" className={pillClass(ranked.includes(option))} onClick={() => toggle(option)}>
              {ranked.includes(option) ? `${ranked.indexOf(option) + 1}. ${option}` : `+ ${option}`}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-dashed border-[#d0d5dd] bg-[#f8fafb] p-3">
          {ranked.length === 0 ? (
            <p className="text-sm text-[#98a2b3]">Choose up to {field.max}</p>
          ) : (
            <ol className="space-y-2">
              {ranked.map((option, index) => (
                <li key={option} className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-ink">
                    {index + 1}. {option}
                  </span>
                  <span className="flex gap-1">
                    <button type="button" className="rounded border border-[#e4e7ec] px-2 py-1 text-xs" onClick={() => move(index, -1)} aria-label={`Move ${option} up`}>
                      Up
                    </button>
                    <button type="button" className="rounded border border-[#e4e7ec] px-2 py-1 text-xs" onClick={() => move(index, 1)} aria-label={`Move ${option} down`}>
                      Down
                    </button>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }

  if (field.type === "repeatable") {
    const rows = Array.isArray(value) && value.length ? value : [];
    function updateRow(index, text) {
      const next = [...rows];
      next[index] = text;
      onChange(key, next);
    }
    function add(text = "") {
      onChange(key, [...rows, text]);
    }
    return (
      <div className="sm:col-span-2">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-ink">{field.label}</span>
          <button type="button" className="text-sm font-semibold text-[#12B981]" onClick={() => add("")}>
            + {field.addLabel}
          </button>
        </div>
        {field.examples ? (
          <div className="mb-3">
            <p className="text-xs text-[#98a2b3]">Start from an example:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {field.examples.map((example) => (
                <button key={example} type="button" className="rounded-full border border-[#e4e7ec] px-3 py-1 text-xs text-[#344054]" onClick={() => add(example)}>
                  + {example}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="space-y-2">
          {rows.map((row, index) => (
            <input
              key={`${field.name}-${index}`}
              value={row}
              placeholder={field.placeholder}
              onChange={(event) => updateRow(index, event.target.value)}
              className="h-11 w-full rounded-lg border border-[#e4e7ec] px-3 text-sm outline-none focus:border-[#12B981]"
            />
          ))}
          {rows.length === 0 ? <div className="rounded-lg border border-dashed border-[#e4e7ec] px-3 py-4 text-sm text-[#98a2b3]">{field.placeholder}</div> : null}
        </div>
      </div>
    );
  }

  if (field.type === "order") {
    const source = Array.isArray(values[fieldKey(question, { name: field.source })]) ? values[fieldKey(question, { name: field.source })] : [];
    const order = Array.isArray(value) ? value.filter((item) => source.includes(item)) : [];
    const merged = [...order, ...source.filter((item) => !order.includes(item))];
    function move(index, direction) {
      const next = [...merged];
      const target = index + direction;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      onChange(key, next);
    }
    return (
      <div className="sm:col-span-2">
        {label}
        <p className="mb-2 text-xs text-[#98a2b3]">Drag or use the arrows to set the order alerts escalate in.</p>
        {merged.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#d0d5dd] px-3 py-6 text-center text-sm text-[#98a2b3]">{field.placeholder}</div>
        ) : (
          <ol className="space-y-2">
            {merged.map((item, index) => (
              <li key={item} className="flex items-center justify-between rounded-lg border border-[#e4e7ec] px-3 py-2 text-sm">
                <span>
                  {index + 1}. {item}
                </span>
                <span className="flex gap-1">
                  <button type="button" className="rounded border border-[#e4e7ec] px-2 py-1 text-xs" onClick={() => move(index, -1)}>
                    Up
                  </button>
                  <button type="button" className="rounded border border-[#e4e7ec] px-2 py-1 text-xs" onClick={() => move(index, 1)}>
                    Down
                  </button>
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }

  return null;
}

export default function QuestionCard({ question, values, onChange, stacked = false }) {
  const missing = questionMissing(question, values);
  const noteKey = notesKey(question);
  const notesOpen = isFilled(values[noteKey]) || values[`${noteKey}Open`];
  const columns = question.columns === 3 ? "sm:grid-cols-3" : question.columns === 2 ? "sm:grid-cols-2" : "grid-cols-1";

  return (
    <article
      id={question.code}
      className={`scroll-mt-24 rounded-xl border bg-white p-4 shadow-sm sm:p-5 ${missing ? "border-red-300" : "border-[#e6ebef]"} ${question.full ? "lg:col-span-2" : ""}`}
    >
      <div className={stacked ? "" : "lg:grid lg:grid-cols-[240px_1fr] lg:gap-6"}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f2f4f7] px-2 py-0.5 text-xs font-semibold text-[#344054]">{question.code}</span>
            {question.mandatory ? <span className="text-xs font-semibold text-red-500">* Mandatory</span> : null}
          </div>
          <h3 className="mt-2 text-sm font-semibold text-ink sm:text-base">{question.title}</h3>
          {question.hint ? <p className="mt-1 text-xs text-[#98a2b3]">{question.hint}</p> : null}
          {question.detail ? <p className="mt-2 text-xs text-[#667085]">{question.detail}</p> : null}
          {missing ? <p className="mt-2 text-xs font-semibold text-red-500">Needs attention</p> : null}
        </div>
        <div className="mt-4 lg:mt-0">
          <div className={`grid gap-4 ${columns}`}>
            {question.fields.map((field) => (
              <FieldControl key={field.name} question={question} field={field} values={values} onChange={onChange} />
            ))}
          </div>
          {missing && question.attention ? <p className="mt-3 text-xs text-red-500">ⓘ {question.attention}</p> : null}
          {question.notes ? (
            <div className="mt-3">
              <button
                type="button"
                className="text-sm font-semibold text-[#0f766e]"
                onClick={() => onChange(`${noteKey}Open`, !notesOpen)}
              >
                + Add details / observations
              </button>
              {notesOpen ? (
                <textarea
                  value={values[noteKey] || ""}
                  placeholder="Add details / observations"
                  onChange={(event) => onChange(noteKey, event.target.value)}
                  className="mt-2 min-h-20 w-full rounded-lg border border-[#e4e7ec] px-3 py-2 text-sm outline-none focus:border-[#12B981]"
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
