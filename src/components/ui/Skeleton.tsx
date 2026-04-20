interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded bg-space-blue/40 ${className}`}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div
      className="flex items-center gap-4 rounded-lg border border-space-blue/30 bg-space-dark p-2.5"
      aria-hidden="true"
    >
      <Skeleton className="h-16 w-16 shrink-0 rounded" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
    </div>
  );
};

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
};

export const SkeletonImage = ({ className = "" }: { className?: string }) => {
  return <Skeleton className={`aspect-video w-full ${className}`} />;
};
