"use client";

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

/** A single labeled <select> filter, styled to match SearchBar/FilterBar. */
export default function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
      className="h-10 rounded-xl border border-admin-border bg-white px-3 text-[13.5px] text-admin-text focus:border-admin-accent focus:outline-none focus:ring-2 focus:ring-admin-accent/20"
    >
      <option value="All">{label}: All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
