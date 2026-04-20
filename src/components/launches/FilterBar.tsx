"use client";

import { useRef, useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import type { LaunchFilters } from "@/types";

interface FilterBarProps {
  filters: LaunchFilters;
  onChange: (filters: LaunchFilters) => void;
}

export const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const [search, setSearch] = useState(filters.search);
  const [dateOpen, setDateOpen] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange({ ...filters, search: value });
    }, 400);
  };

  const set = (patch: Partial<LaunchFilters>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-space-blue/30 bg-space-dark p-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-space-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          aria-label="Search missions"
          placeholder="Search missions…"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-md border border-space-blue/40 bg-space-black py-2 pl-9 pr-3 text-sm text-white placeholder:text-space-muted focus:border-space-accent focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <fieldset>
          <legend className="sr-only">Filter by status</legend>
          <div className="flex rounded-md border border-space-blue/40 overflow-hidden">
            {(["all", "upcoming", "past"] as const).map((val) => (
              <button
                key={val}
                onClick={() => set({ upcoming: val })}
                aria-pressed={filters.upcoming === val}
                className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer ${
                  filters.upcoming === val
                    ? "bg-space-accent text-white"
                    : "bg-space-black text-space-silver hover:bg-space-blue/30"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="sr-only">Filter by outcome</legend>
          <div className="flex rounded-md border border-space-blue/40 overflow-hidden">
            {(["all", "success", "failure"] as const).map((val) => (
              <button
                key={val}
                onClick={() => set({ success: val })}
                aria-pressed={filters.success === val}
                className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer ${
                  filters.success === val
                    ? "bg-space-accent text-white"
                    : "bg-space-black text-space-silver hover:bg-space-blue/30"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </fieldset>

        <select
          aria-label="Sort launches"
          value={`${filters.sortField}:${filters.sortDir}`}
          onChange={(e) => {
            const [sortField, sortDir] = e.target.value.split(":") as [
              LaunchFilters["sortField"],
              LaunchFilters["sortDir"],
            ];
            set({ sortField, sortDir });
          }}
          className="rounded-md border border-space-blue/40 bg-space-black px-3 cursor-pointer py-1.5 text-xs text-space-silver focus:border-space-accent focus:outline-none"
        >
          <option value="date_utc:desc">Newest first</option>
          <option value="date_utc:asc">Oldest first</option>
          <option value="name:asc">Name A-Z</option>
          <option value="name:desc">Name Z-A</option>
        </select>

        <button
          onClick={() => setDateOpen((o) => !o)}
          aria-expanded={dateOpen}
          className="flex items-center gap-1 rounded-md border cursor-pointer border-space-blue/40 bg-space-black px-3 py-1.5 text-xs text-space-silver hover:bg-space-blue/30 transition-colors"
        >
          Date range
          {dateOpen ? (
            <ChevronUp className="h-3 w-3" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          )}
        </button>
      </div>

      {dateOpen && (
        <div className="flex flex-wrap gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-space-muted">From</span>
            <input
              type="date"
              value={filters.dateFrom ?? ""}
              onChange={(e) => set({ dateFrom: e.target.value || undefined })}
              className="rounded-md border border-space-blue/40 bg-space-black cursor-pointer px-3 py-1.5 text-xs text-space-silver focus:border-space-accent focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-space-muted">To</span>
            <input
              type="date"
              value={filters.dateTo ?? ""}
              onChange={(e) => set({ dateTo: e.target.value || undefined })}
              className="rounded-md border border-space-blue/40 bg-space-black cursor-pointer px-3 py-1.5 text-xs text-space-silver focus:border-space-accent focus:outline-none"
            />
          </label>
          {(filters.dateFrom || filters.dateTo) && (
            <button
              onClick={() => set({ dateFrom: undefined, dateTo: undefined })}
              className="self-end rounded-md px-3 py-1.5 text-xs text-space-muted cursor-pointer hover:text-white transition-colors"
            >
              Clear dates
            </button>
          )}
        </div>
      )}
    </div>
  );
};
