"use client";

import React from "react";

export default function OverviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-surface-card p-6 rounded-lg border border-functional-alert flex flex-col gap-4 max-w-md">
      <h2 className="text-lg font-bold text-functional-alert">Failed to load analytics</h2>
      <p className="text-sm text-functional-neutral">
        We encountered an error while aggregating the macro analytics. {error.message || "Please try again later."}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-brand-deep-charcoal text-surface-card text-sm font-medium rounded-md hover:opacity-90 transition-opacity w-max"
      >
        Retry
      </button>
    </div>
  );
}
