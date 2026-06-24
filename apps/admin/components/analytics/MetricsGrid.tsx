"use client";

import React, { use } from "react";
import { MetricCard } from "./MetricCard";
import type { AggregatedMetrics } from "../../app/dashboard/overview/actions";

interface MetricsGridProps {
  metricsPromise: Promise<AggregatedMetrics>;
}

export function MetricsGrid({ metricsPromise }: MetricsGridProps) {
  const metrics = use(metricsPromise);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <MetricCard 
        title="Total Carbon Footprint" 
        value={`${metrics.totalCarbonFootprint.toLocaleString(undefined, { maximumFractionDigits: 2 })} kgCO2e`} 
        variant="default"
        description="Aggregate emissions from verified events."
      />
      <MetricCard 
        title="Active Assets" 
        value={metrics.activeAssets.toLocaleString()} 
        variant="default"
        description="Total products tracked in the system."
      />
      <MetricCard 
        title="Verified Events" 
        value={metrics.verifiedEvents.toLocaleString()} 
        variant="success"
        description="Valid supply-chain movements recorded."
      />
      <MetricCard 
        title="Integrity Violations" 
        value={metrics.integrityViolations.toLocaleString()} 
        variant={metrics.integrityViolations > 0 ? "alert" : "success"}
        description="Tamper attempts or unauthorized events."
      />
    </div>
  );
}
