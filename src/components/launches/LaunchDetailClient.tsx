"use client";

import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Globe,
  MapPin,
  Rocket as RocketIcon,
  Heart,
  TvMinimalPlay,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ImageGallery } from "./ImageGallery";
import { useFavorites } from "@/hooks/useFavorites";
import type { Launch, Rocket, Launchpad } from "@/types";

interface LaunchDetailClientProps {
  launch: Launch;
  rocket: Rocket;
  launchpad: Launchpad;
}

const getStatusVariant = (
  launch: Launch,
): "success" | "failure" | "upcoming" | "pending" => {
  if (launch.upcoming) return "upcoming";
  if (launch.success === true) return "success";
  if (launch.success === false) return "failure";
  return "pending";
};

export const LaunchDetailClient = ({
  launch,
  rocket,
  launchpad,
}: LaunchDetailClientProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(launch.id);

  const formattedDate = format(
    parseISO(launch.date_utc),
    "MMMM d, yyyy 'at' HH:mm 'UTC'",
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-space-muted transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All launches
      </Link>

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative h-36 w-36 shrink-0 self-center sm:self-start">
          {launch.links?.patch?.large ? (
            <Image
              src={launch.links.patch.large}
              alt={`${launch.name} mission patch`}
              fill
              className="object-contain"
              sizes="144px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-space-blue/20 text-5xl">
              🚀
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-white">{launch.name}</h1>
              <p className="mt-1 text-space-muted">Flight #{launch.flight_number}</p>
            </div>
            <button
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={favorited}
              onClick={() => toggleFavorite(launch.id)}
              className="shrink-0 rounded-full p-2 transition-colors hover:bg-space-blue/30 cursor-pointer"
            >
              <Heart
                className={`h-6 w-6 transition-colors ${favorited ? "fill-launch-failure text-launch-failure" : "text-space-muted hover:text-white"}`}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={getStatusVariant(launch)}>
              {launch.upcoming
                ? "Upcoming"
                : launch.success
                  ? "Success"
                  : launch.success === false
                    ? "Failed"
                    : "Unknown"}
            </Badge>
            <span className="text-sm text-space-silver">{formattedDate}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {launch.links.webcast && (
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-red-600/20 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-600/30"
              >
                <TvMinimalPlay className="h-3.5 w-3.5" aria-hidden="true" />
                Watch
              </a>
            )}
            {launch.links.article && (
              <a
                href={launch.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-space-blue/40 px-3 py-1.5 text-xs text-space-silver transition-colors hover:bg-space-blue/20"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Article
              </a>
            )}
            {launch.links.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-space-blue/40 px-3 py-1.5 text-xs text-space-silver transition-colors hover:bg-space-blue/20"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                Wikipedia
              </a>
            )}
            {launch.links.presskit && (
              <a
                href={launch.links.presskit}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-space-blue/40 px-3 py-1.5 text-xs text-space-silver transition-colors hover:bg-space-blue/20"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Press kit
              </a>
            )}
          </div>
        </div>
      </div>

      {launch.details && (
        <section aria-labelledby="details-heading" className="mb-8">
          <h2 id="details-heading" className="mb-3 text-lg font-semibold text-white">
            Mission Details
          </h2>
          <p className="leading-7 text-space-silver">{launch.details}</p>
        </section>
      )}

      {launch.links.flickr.original.length > 0 && (
        <section aria-labelledby="gallery-heading" className="mb-8">
          <h2 id="gallery-heading" className="mb-3 text-lg font-semibold text-white">
            Photos
          </h2>
          <ImageGallery images={launch.links.flickr.original} missionName={launch.name} />
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <section
          aria-labelledby="rocket-heading"
          className="rounded-lg border border-space-blue/30 bg-space-dark p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <RocketIcon className="h-5 w-5 text-space-accent" aria-hidden="true" />
            <h2 id="rocket-heading" className="font-semibold text-white">Rocket</h2>
          </div>
          <p className="text-lg font-bold text-white">{rocket.name}</p>
          <p className="mt-0.5 text-xs text-space-muted capitalize">{rocket.type}</p>
          {rocket.description && (
            <p className="mt-3 text-sm leading-6 text-space-silver line-clamp-4">
              {rocket.description}
            </p>
          )}
          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {rocket.first_flight && (
              <>
                <dt className="text-space-muted">First flight</dt>
                <dd className="text-space-silver">{rocket.first_flight}</dd>
              </>
            )}
            {rocket.success_rate_pct !== null && (
              <>
                <dt className="text-space-muted">Success rate</dt>
                <dd className="text-space-silver">{rocket.success_rate_pct}%</dd>
              </>
            )}
            {rocket.height.meters !== null && (
              <>
                <dt className="text-space-muted">Height</dt>
                <dd className="text-space-silver">{rocket.height.meters} m</dd>
              </>
            )}
            {rocket.mass.kg !== null && (
              <>
                <dt className="text-space-muted">Mass</dt>
                <dd className="text-space-silver">{rocket.mass.kg.toLocaleString()} kg</dd>
              </>
            )}
          </dl>
        </section>

        <section
          aria-labelledby="launchpad-heading"
          className="rounded-lg border border-space-blue/30 bg-space-dark p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-space-accent" aria-hidden="true" />
            <h2 id="launchpad-heading" className="font-semibold text-white">Launch Site</h2>
          </div>
          <p className="text-lg font-bold text-white">{launchpad.name}</p>
          <p className="mt-0.5 text-xs text-space-muted">{launchpad.full_name}</p>
          <p className="mt-1 text-sm text-space-silver">
            {launchpad.locality}, {launchpad.region}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <dt className="text-space-muted">Attempts</dt>
            <dd className="text-space-silver">{launchpad.launch_attempts}</dd>
            <dt className="text-space-muted">Successes</dt>
            <dd className="text-space-silver">{launchpad.launch_successes}</dd>
            <dt className="text-space-muted">Status</dt>
            <dd className="capitalize text-space-silver">
              {launchpad.status.replace(/_/g, " ")}
            </dd>
          </dl>
        </section>
      </div>
    </div>
  );
};
