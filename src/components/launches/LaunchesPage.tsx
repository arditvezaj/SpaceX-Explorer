"use client";

import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { VirtualizedLaunchList } from "./VirtualizedLaunchList";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useLaunches } from "@/hooks/useLaunches";
import { useFavorites } from "@/hooks/useFavorites";
import type { LaunchFilters } from "@/types";

const DEFAULT_FILTERS: LaunchFilters = {
  upcoming: "all",
  success: "all",
  search: "",
  sortField: "date_utc",
  sortDir: "desc",
};

export const LaunchesPage = () => {
  const [filters, setFilters] = useState<LaunchFilters>(DEFAULT_FILTERS);
  const { favoriteIds, toggleFavorite } = useFavorites();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useLaunches(filters);

  const launches = data?.pages.flatMap((p) => p.docs) ?? [];
  const totalDocs = data?.pages[0]?.totalDocs ?? 0;

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="mx-auto flex h-[calc(100svh-61px)] w-full max-w-6xl flex-col gap-4 overflow-hidden px-4 py-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-white">Launches</h1>
        {!isLoading && !isError && (
          <p className="text-sm text-space-muted" aria-live="polite" aria-atomic="true">
            {launches.length} of {totalDocs.toLocaleString()} missions
          </p>
        )}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading
          ? "Loading launches…"
          : isError
            ? "Failed to load launches."
            : `${launches.length} launches loaded.`}
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {isLoading && (
        <div className="flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 flex items-center">
              <div className="w-full">
                <SkeletonCard />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          message={error instanceof Error ? error.message : "Failed to load launches."}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && launches.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <p className="text-lg text-space-muted">No launches found.</p>
          <button
            onClick={clearFilters}
            className="rounded-md border border-space-blue/40 px-4 py-2 text-sm cursor-pointer text-space-silver transition-colors hover:bg-space-blue/30 hover:text-white"
          >
            Clear filters
          </button>
        </div>
      )}

      {!isLoading && !isError && launches.length > 0 && (
        <div className="flex-1 min-h-0">
          <VirtualizedLaunchList
            launches={launches}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
          />
        </div>
      )}
    </div>
  );
};
