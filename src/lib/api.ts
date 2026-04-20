import type {
  Launch,
  LaunchQueryParams,
  LaunchQueryResponse,
  LaunchRaw,
  Launchpad,
  Rocket,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SPACEX_API_URL;

const fetchWithRetry = async (
  url: string,
  init?: RequestInit,
  retries = 3,
): Promise<Response> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, init);

    if (res.ok) return res;

    if (res.status !== 429 && res.status < 500) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    if (attempt === retries) {
      throw new Error(`HTTP ${res.status} after ${retries} retries`);
    }

    const delay = Math.min(1000 * 2 ** attempt, 30000);
    await new Promise((r) => setTimeout(r, delay));
  }

  throw new Error("Unexpected retry loop exit");
};

export const queryLaunches = async (
  params: LaunchQueryParams,
): Promise<LaunchQueryResponse> => {
  const res = await fetchWithRetry(`${BASE_URL}/launches/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    next: { revalidate: 60 },
  });
  return res.json() as Promise<LaunchQueryResponse>;
};

export const getLaunch = async (id: string): Promise<LaunchRaw> => {
  const res = await fetchWithRetry(`${BASE_URL}/launches/${id}`, {
    next: { revalidate: 3600 },
  });
  return res.json() as Promise<LaunchRaw>;
};

export const getLaunchPopulated = async (id: string): Promise<Launch> => {
  const res = await fetchWithRetry(`${BASE_URL}/launches/${id}`, {
    next: { revalidate: 3600 },
  });
  const launch = (await res.json()) as LaunchRaw;
  const [rocket, launchpad] = await Promise.all([
    getRocket(launch.rocket),
    getLaunchpad(launch.launchpad),
  ]);
  return { ...launch, rocket, launchpad };
};

export const getRocket = async (id: string): Promise<Rocket> => {
  const res = await fetchWithRetry(`${BASE_URL}/rockets/${id}`, {
    next: { revalidate: 86400 },
  });
  return res.json() as Promise<Rocket>;
};

export const getLaunchpad = async (id: string): Promise<Launchpad> => {
  const res = await fetchWithRetry(`${BASE_URL}/launchpads/${id}`, {
    next: { revalidate: 86400 },
  });
  return res.json() as Promise<Launchpad>;
};
