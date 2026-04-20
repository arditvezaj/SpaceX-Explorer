"use client";

import { useQuery } from "@tanstack/react-query";
import { getLaunch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { LaunchRaw } from "@/types";

export const useLaunch = (id: string, initialData?: LaunchRaw) => {
  return useQuery({
    queryKey: queryKeys.launches.detail(id),
    queryFn: () => getLaunch(id),
    staleTime: 5 * 60 * 1000,
    initialData,
  });
};
