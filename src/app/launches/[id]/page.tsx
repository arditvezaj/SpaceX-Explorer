import { notFound } from "next/navigation";
import { getLaunchPopulated, queryLaunches } from "@/lib/api";
import { LaunchDetailClient } from "@/components/launches/LaunchDetailClient";

export const revalidate = 3600;

export const generateStaticParams = async () => {
  const res = await queryLaunches({
    query: {},
    options: {
      sort: { date_utc: "desc" },
      select: ["id"],
      page: 1,
      limit: 20,
    },
  });
  return res.docs.map((l) => ({ id: l.id }));
};

interface Props {
  params: Promise<{ id: string }>;
}

const LaunchDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  let launch;
  try {
    launch = await getLaunchPopulated(id);
  } catch {
    notFound();
  }

  return (
    <LaunchDetailClient
      launch={launch}
      rocket={launch.rocket}
      launchpad={launch.launchpad}
    />
  );
};

export default LaunchDetailPage;
