"use client";

import { useEffect, useRef, useCallback } from "react";
import { List, useListRef, type RowComponentProps } from "react-window";
import { LaunchCard } from "./LaunchCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import type { LaunchRaw } from "@/types";

interface RowProps {
  launches: LaunchRaw[];
  favoriteIds: string[];
  onFavoriteToggle: (id: string) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

const Row = ({
  index,
  style,
  launches,
  favoriteIds,
  onFavoriteToggle,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: RowComponentProps<RowProps>) => {
  if (index === launches.length) {
    return (
      <div style={style} className="flex items-center justify-center py-0">
        {isFetchingNextPage ? (
          <div className="w-full">
            <SkeletonCard />
          </div>
        ) : hasNextPage ? (
          <button
            onClick={onLoadMore}
            className="rounded-md border border-space-blue/40 bg-space-dark px-6 py-2 text-sm text-space-silver transition-colors hover:bg-space-blue/30 hover:text-white"
          >
            Load more
          </button>
        ) : null}
      </div>
    );
  }

  const launch = launches[index];
  return (
    <LaunchCard
      launch={launch}
      isFavorite={favoriteIds.includes(launch.id)}
      onFavoriteToggle={onFavoriteToggle}
      style={style}
    />
  );
};

interface VirtualizedLaunchListProps {
  launches: LaunchRaw[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  favoriteIds: string[];
  onFavoriteToggle: (id: string) => void;
}

export const VirtualizedLaunchList = ({
  launches,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  favoriteIds,
  onFavoriteToggle,
}: VirtualizedLaunchListProps) => {
  const listRef = useListRef(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    },
    [hasNextPage, isFetchingNextPage, onLoadMore],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  useEffect(() => {
    if (launches.length === 0) {
      listRef.current?.scrollToRow({ index: 0, behavior: "instant" });
    }
  }, [launches.length, listRef]);

  const rowCount =
    launches.length + (hasNextPage || isFetchingNextPage ? 1 : 0);

  const rowProps: RowProps = {
    launches,
    favoriteIds,
    onFavoriteToggle,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
  };

  return (
    <div className="h-full">
      <List
        listRef={listRef}
        rowComponent={Row}
        rowProps={rowProps}
        rowCount={rowCount}
        rowHeight={100}
        overscanCount={5}
        defaultHeight={600}
        className="space-scrollbar"
        style={{ height: "100%", width: "100%", overflow: "auto" }}
      />
      <div ref={sentinelRef} className="h-1" aria-hidden="true" />
    </div>
  );
};
