import React from "react";
import { OverviewClient } from "./OverviewClient";
import { getAggregatedMetrics } from "./actions";

export const metadata = {
  title: "Overview | Eco-Trace Admin",
};

export default function OverviewPage() {
  const initialMetricsPromise = getAggregatedMetrics("30d");

  return (
    <div className="w-full">
      <OverviewClient initialPromise={initialMetricsPromise} />
    </div>
  );
}
