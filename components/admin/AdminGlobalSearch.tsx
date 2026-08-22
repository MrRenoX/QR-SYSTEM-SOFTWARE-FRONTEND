"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchAdmin, type SearchResultGroup } from "@/lib/admin/globalSearch";
import type { AdminRole } from "@/types/admin/auth";

const DEBOUNCE_MS = 300;

export default function AdminGlobalSearch({ role, className = "" }: { role: AdminRole; className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<SearchResultGroup[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setGroups([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      searchAdmin(trimmed, role).then((result) => {
        setGroups(result);
        setLoading(false);
      });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [query, role]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goTo(href: string, label: string) {
    setOpen(false);
    setQuery("");
    router.push(`${href}?q=${encodeURIComponent(label)}`);
  }

  const trimmed = query.trim();
  const showDropdown = open && trimmed.length >= 2;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-admin-faint"
        aria-hidden="true"
      />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search anything..."
        aria-label="Search anything"
        className="h-10 w-full rounded-xl border border-admin-border bg-white pl-9 pr-3 text-[13.5px] text-admin-text placeholder:text-admin-faint focus:border-admin-accent focus:outline-none focus:ring-2 focus:ring-admin-accent/20"
      />

      {showDropdown && (
        <div
          role="listbox"
          className="absolute left-0 top-11 z-50 w-80 max-w-[calc(100vw-2rem)] animate-fade-in overflow-hidden rounded-2xl border border-admin-border bg-white shadow-2xl"
        >
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <p className="px-4 py-6 text-center text-[13px] text-admin-muted">Searching…</p>
            ) : groups.length === 0 ? (
              <p className="px-4 py-6 text-center text-[13px] text-admin-muted">
                No results for &ldquo;{trimmed}&rdquo;
              </p>
            ) : (
              groups.map((group) => (
                <div key={group.key} className="border-b border-admin-border py-1.5 last:border-0">
                  <p className="px-4 pb-1 pt-1.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-admin-faint">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(group.href, item.label)}
                      className="flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left hover:bg-admin-bg"
                    >
                      <span className="truncate text-[13px] font-medium text-admin-text">{item.label}</span>
                      {item.sublabel && (
                        <span className="truncate text-[11.5px] text-admin-muted">{item.sublabel}</span>
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
