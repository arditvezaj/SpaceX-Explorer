export interface Rocket {
  id: string;
  name: string;
  type: string;
  description: string;
  height: { meters: number | null; feet: number | null };
  diameter: { meters: number | null; feet: number | null };
  mass: { kg: number | null; lb: number | null };
  first_flight: string | null;
  country: string;
  company: string;
  success_rate_pct: number | null;
  flickr_images: string[];
}

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  status: string;
}

export interface LaunchRaw {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  flight_number: number;
  tbd: boolean;
  net: boolean;
  window: number | null;
  auto_update: boolean;
  launch_library_id: string | null;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  fairings: {
    reused: boolean | null;
    recovery_attempt: boolean | null;
    recovered: boolean | null;
    ships: string[];
  } | null;
  failures: { time: number; altitude: number | null; reason: string }[];
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  cores: {
    core: string;
    flight: number;
    gridfins: boolean | null;
    legs: boolean | null;
    reused: boolean | null;
    landing_attempt: boolean | null;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
  }[];
  links: {
    patch: { small: string | null; large: string | null };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: { small: string[]; original: string[] };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  rocket: string;
  launchpad: string;
}

export interface Launch extends Omit<LaunchRaw, "rocket" | "launchpad"> {
  rocket: Rocket;
  launchpad: Launchpad;
}

export interface LaunchFilters {
  upcoming: "all" | "upcoming" | "past";
  success: "all" | "success" | "failure";
  search: string;
  sortField: "date_utc" | "name";
  sortDir: "asc" | "desc";
  dateFrom?: string;
  dateTo?: string;
}

export interface LaunchQueryParams {
  query: Record<string, unknown>;
  options: {
    sort?: Record<string, "asc" | "desc">;
    select?: string[];
    page: number;
    limit: number;
  };
}

export interface LaunchQueryResponse {
  docs: LaunchRaw[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
