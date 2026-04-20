import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-8xl font-bold text-space-blue">404</p>
      <div>
        <h1 className="text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-space-muted">
          This mission doesn&apos;t exist in our records.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-md bg-space-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-space-accent/80"
      >
        Back to Launches
      </Link>
    </div>
  );
};

export default NotFound;
