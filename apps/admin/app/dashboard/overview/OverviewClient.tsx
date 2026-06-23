"use client";

import React, { useState, useTransition, Suspense, useEffect } from "react";
import { getAggregatedMetrics, type TimeRange, type AggregatedMetrics } from "./actions";
import { TimeRangeFilter } from "../../../components/analytics/TimeRangeFilter";
import { MetricsGrid } from "../../../components/analytics/MetricsGrid";

export function OverviewClient({ initialPromise }: { initialPromise: Promise<AggregatedMetrics> }) {
  const [range, setRange] = useState<TimeRange>("30d");
  const [metricsPromise, setMetricsPromise] = useState<Promise<AggregatedMetrics>>(initialPromise);
  const [isPending, startTransition] = useTransition();

  const handleRangeChange = (newRange: TimeRange) => {
    setRange(newRange);
    startTransition(() => {
      setMetricsPromise(getAggregatedMetrics(newRange));
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-deep-charcoal">Macro Analytics</h1>
          <p className="text-sm text-functional-neutral">Aggregate view of supply chain events and integrity metrics.</p>
        </div>
        <TimeRangeFilter currentRange={range} onRangeChange={handleRangeChange} />
      </div>

      <div className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
        <Suspense fallback={<div className="text-functional-neutral text-sm animate-pulse">Loading metrics...</div>}>
          <MetricsGrid metricsPromise={metricsPromise} />
        </Suspense>
      </div>
    </div>
  );
}
