"use client";

import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { getLaunch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useFavorites } from "@/hooks/useFavorites";
import { LaunchCard } from "@/components/launches/LaunchCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

const FavoritesClient = () => {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const results = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: queryKeys.launches.detail(id),
      queryFn: () => getLaunch(id),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const hasError = results.some((r) => r.isError);
  const launches = results.flatMap((r) => (r.data ? [r.data] : []));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Favorites</h1>

      {favoriteIds.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <Rocket className="h-12 w-12 text-space-muted" aria-hidden="true" />
          <p className="text-lg text-space-muted">No favorites saved yet.</p>
          <Link
            href="/"
            className="rounded-md border border-space-blue/40 px-4 py-2 text-sm text-space-silver transition-colors hover:bg-space-blue/30 hover:text-white"
          >
            Browse launches
          </Link>
        </div>
      )}

      {favoriteIds.length > 0 && isLoading && (
        <div className="flex flex-col gap-2">
          {favoriteIds.map((id) => (
            <SkeletonCard key={id} />
          ))}
        </div>
      )}

      {favoriteIds.length > 0 && hasError && !isLoading && (
        <ErrorState message="Some favorites could not be loaded." />
      )}

      {favoriteIds.length > 0 && !isLoading && launches.length > 0 && (
        <div className="flex flex-col gap-2">
          {launches.map((launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              isFavorite={true}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesClient;
