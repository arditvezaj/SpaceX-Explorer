"use client";

import { useQuery } from "@tanstack/react-query";
import { getLaunchpad } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export const useLaunchpad = (id: string | undefined) => {
  return useQuery({
    queryKey: id ? queryKeys.launchpads.detail(id) : (["launchpads", "disabled"] as const),
    queryFn: () => getLaunchpad(id as string),
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
