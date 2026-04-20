"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import type { LaunchRaw } from "@/types";

interface LaunchCardProps {
  launch: LaunchRaw;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  style?: React.CSSProperties;
}

const getStatusVariant = (
  launch: LaunchRaw,
): "success" | "failure" | "upcoming" | "pending" => {
  if (launch.upcoming) return "upcoming";
  if (launch.success === true) return "success";
  if (launch.success === false) return "failure";
  return "pending";
};

const getStatusLabel = (launch: LaunchRaw): string => {
  if (launch.upcoming) return "Upcoming";
  if (launch.success === true) return "Success";
  if (launch.success === false) return "Failed";
  return "Unknown";
};

export const LaunchCard = ({
  launch,
  isFavorite,
  onFavoriteToggle,
  style,
}: LaunchCardProps) => {
  const formattedDate = format(parseISO(launch.date_utc), "MMM d, yyyy");

  return (
    <div style={style}>
      <Link
        href={`/launches/${launch.id}`}
        className="group flex items-center gap-4 rounded-lg border border-space-blue/30 bg-space-dark p-2.5 transition-colors hover:border-space-accent/60 hover:bg-space-blue/10"
      >
        <div className="relative h-16 w-16 shrink-0">
          {launch.links?.patch?.small ? (
            <Image
              src={launch.links.patch.small}
              alt={`${launch.name} mission patch`}
              fill
              className="object-contain"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded bg-space-blue/20 text-2xl text-space-muted">
              🚀
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate font-semibold text-white group-hover:text-space-accent transition-colors">
            {launch.name}
          </p>
          <p className="text-xs text-space-muted">
            Flight #{launch.flight_number}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(launch)}>
              {getStatusLabel(launch)}
            </Badge>
            <span className="text-xs text-space-muted">{formattedDate}</span>
          </div>
        </div>

        <button
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle(launch.id);
          }}
          className="shrink-0 rounded-full p-2 text-space-muted transition-colors hover:bg-space-blue/30 hover:text-white cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorite ? "fill-launch-failure text-launch-failure" : ""}`}
            aria-hidden="true"
          />
        </button>
      </Link>
    </div>
  );
};
