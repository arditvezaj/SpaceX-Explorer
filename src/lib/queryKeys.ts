import type { LaunchFilters } from "@/types";

export const queryKeys = {
  launches: {
    all: ["launches"] as const,
    list: (filters: LaunchFilters) => ["launches", "list", filters] as const,
    detail: (id: string) => ["launches", "detail", id] as const,
  },
  rockets: {
    detail: (id: string) => ["rockets", id] as const,
  },
  launchpads: {
    detail: (id: string) => ["launchpads", id] as const,
  },
};
