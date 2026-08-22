import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        <AlertTriangle size={22} aria-hidden="true" />
      </span>
      <p className="mt-3 text-[13.5px] font-medium text-admin-text">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl border border-admin-border bg-white px-4 py-2 text-[13px] font-semibold text-admin-text transition-colors hover:border-admin-accent/40"
        >
          Try again
        </button>
      )}
    </div>
  );
}
