import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 rounded-lg border border-launch-failure/30 bg-launch-failure/10 px-6 py-12 text-center"
    >
      <AlertCircle className="h-10 w-10 text-launch-failure" aria-hidden="true" />
      <p className="text-space-silver">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-space-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-space-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-space-accent"
        >
          Try again
        </button>
      )}
    </div>
  );
};
