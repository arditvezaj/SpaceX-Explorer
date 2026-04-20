import { Skeleton, SkeletonText, SkeletonImage } from "@/components/ui/Skeleton";

const LaunchDetailLoading = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Skeleton className="mb-6 h-4 w-24" />

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <Skeleton className="h-36 w-36 shrink-0 self-center rounded-full sm:self-start" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-20 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Skeleton className="mb-3 h-6 w-36" />
        <SkeletonText lines={4} />
      </div>

      <div className="mb-8">
        <Skeleton className="mb-3 h-6 w-20" />
        <SkeletonImage className="rounded-lg" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-52 rounded-lg" />
        <Skeleton className="h-52 rounded-lg" />
      </div>
    </div>
  );
};

export default LaunchDetailLoading;
