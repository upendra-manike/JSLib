import { useState, useCallback, useEffect } from 'react';

export interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

/**
 * Hook for error boundary functionality.
 * Solves: "React error boundaries missing or misused, resulting in UI crash rather than graceful fallback"
 */
export function useErrorBoundary(): ErrorBoundaryState & {
  resetError: () => void;
  captureError: (error: Error) => void;
} {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((err: Error) => {
    setError(err);
  }, []);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(new Error(event.message));
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      setError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason))
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return {
    error,
    hasError: error !== null,
    resetError,
    captureError,
  };
}

