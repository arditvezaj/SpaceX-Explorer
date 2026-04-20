"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryLaunches } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { LaunchFilters, LaunchQueryParams } from "@/types";

const LIST_SELECT = [
  "id",
  "name",
  "date_utc",
  "success",
  "upcoming",
  "flight_number",
  "links",
  "rocket",
  "launchpad",
];

const buildQueryParams = (
  filters: LaunchFilters,
  page: number,
): LaunchQueryParams => {
  const query: Record<string, unknown> = {};

  const upcomingMap = { upcoming: true, past: false } as const;
  if (filters.upcoming in upcomingMap)
    query.upcoming = upcomingMap[filters.upcoming as keyof typeof upcomingMap];

  const successMap = { success: true, failure: false } as const;
  if (filters.success in successMap)
    query.success = successMap[filters.success as keyof typeof successMap];

  if (filters.search.length >= 2) {
    query.name = { $regex: filters.search, $options: "i" };
  }

  if (filters.dateFrom || filters.dateTo) {
    const dateFilter: Record<string, string> = {};
    if (filters.dateFrom) {
      const d = new Date(filters.dateFrom);
      if (!isNaN(d.getTime())) dateFilter.$gte = d.toISOString();
    }
    if (filters.dateTo) {
      const d = new Date(filters.dateTo);
      if (!isNaN(d.getTime())) dateFilter.$lte = d.toISOString();
    }
    if (Object.keys(dateFilter).length > 0) query.date_utc = dateFilter;
  }

  return {
    query,
    options: {
      sort: { [filters.sortField]: filters.sortDir },
      select: LIST_SELECT,
      page,
      limit: 20,
    },
  };
};

export const useLaunches = (filters: LaunchFilters) => {
  return useInfiniteQuery({
    queryKey: queryKeys.launches.list(filters),
    queryFn: ({ pageParam }) =>
      queryLaunches(buildQueryParams(filters, pageParam as number)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    staleTime: 60 * 1000,
  });
};
