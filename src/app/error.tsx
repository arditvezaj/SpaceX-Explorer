"use client";

import { ErrorState } from "@/components/ui/ErrorState";

const GlobalError = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <ErrorState
          message="An unexpected error occurred. Please try again."
          onRetry={reset}
        />
      </div>
    </div>
  );
};

export default GlobalError;
