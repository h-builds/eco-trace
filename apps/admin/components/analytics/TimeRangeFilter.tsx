"use client";

import React, { useTransition } from "react";
import type { TimeRange } from "../../app/dashboard/overview/actions";

interface TimeRangeFilterProps {
  currentRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export function TimeRangeFilter({ currentRange, onRangeChange }: TimeRangeFilterProps) {
  const [isPending, startTransition] = useTransition();
  const ranges: TimeRange[] = ["7d", "30d", "90d", "YTD"];

  const handleChange = (range: TimeRange) => {
    startTransition(() => {
      onRangeChange(range);
    });
  };

  return (
    <div className="flex items-center gap-2 bg-surface-canvas p-1 rounded-lg border border-surface-border w-max">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => handleChange(range)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            currentRange === range
              ? "bg-surface-card shadow-elevation-1 text-brand-deep-charcoal"
              : "text-functional-neutral hover:text-brand-deep-charcoal hover:bg-surface-card/50"
          }`}
          disabled={isPending}
        >
          {range}
        </button>
      ))}
      {isPending && <span className="text-xs text-functional-pending px-2 animate-pulse">Loading...</span>}
    </div>
  );
}
