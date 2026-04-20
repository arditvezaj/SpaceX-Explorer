"use client";

import { useQuery } from "@tanstack/react-query";
import { getRocket } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export const useRocket = (id: string | undefined) => {
  return useQuery({
    queryKey: id ? queryKeys.rockets.detail(id) : (["rockets", "disabled"] as const),
    queryFn: () => getRocket(id as string),
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
