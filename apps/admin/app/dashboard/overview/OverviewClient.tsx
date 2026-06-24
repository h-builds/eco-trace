"use client";

import React, { useState, useTransition, Suspense, useEffect } from "react";
import Link from "next/link";
import { getAggregatedMetrics, type TimeRange, type AggregatedMetrics } from "./actions";
import { TimeRangeFilter } from "../../../components/analytics/TimeRangeFilter";
import { MetricsGrid } from "../../../components/analytics/MetricsGrid";
import { DemoScenario } from "../../../lib/demoScenario";

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

  const consumerUrl = process.env.NEXT_PUBLIC_CONSUMER_URL || "#";
  const consumerHref = consumerUrl !== "#" ? `${consumerUrl}?asset=${DemoScenario.assetId}` : "#";

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      <section className="flex flex-col gap-2 bg-surface-card p-8 rounded-lg border border-surface-border shadow-sm">
        <h1 className="text-xl md:text-3xl font-bold text-brand-deep-charcoal flex items-center gap-3">
          Auditor Workstation
          <span className="text-[10px] uppercase tracking-wider bg-functional-pending/10 text-functional-pending border border-functional-pending/20 px-2 py-0.5 rounded-pill font-medium">
            {DemoScenario.demoDataLabel}
          </span>
        </h1>
        <p className="text-lg text-functional-neutral max-w-3xl">
          Govern trusted supply-chain claims, verify event integrity, and export audit-ready evidence.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 flex flex-col gap-4 bg-surface-card p-6 rounded-lg border border-surface-border shadow-sm">
          <div className="flex justify-between items-start">
             <h2 className="text-xl font-bold text-brand-deep-charcoal">Demo Scenario: {DemoScenario.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-functional-neutral uppercase tracking-wider">Asset ID</span>
              <span className="font-medium text-sm text-brand-deep-charcoal">{DemoScenario.assetId}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-functional-neutral uppercase tracking-wider">Product</span>
              <span className="font-medium text-sm text-brand-deep-charcoal">{DemoScenario.productName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-functional-neutral uppercase tracking-wider">Origin</span>
              <span className="font-medium text-sm text-brand-deep-charcoal">{DemoScenario.trustedSupplier}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-functional-neutral uppercase tracking-wider">Logistics</span>
              <span className="font-medium text-sm text-brand-deep-charcoal">{DemoScenario.logisticsActor}</span>
            </div>
          </div>
          <div className="mt-4 p-4 bg-brand-verification-green/5 border border-brand-verification-green/20 rounded-lg">
             <p className="text-sm text-brand-deep-charcoal">
               This simulated journey follows {DemoScenario.productName.toLowerCase()} from origin to consumer, demonstrating how cryptographic verification protects supply-chain integrity at every step.
             </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 bg-surface-card p-6 rounded-lg border border-surface-border shadow-sm">
          <h2 className="text-lg font-bold text-brand-deep-charcoal">Quick Links</h2>
          <nav className="flex flex-col gap-3 h-full justify-center">
            <Link href="/dashboard/entities" className="group flex items-center justify-between p-3 rounded-lg border border-surface-border hover:border-brand-verification-green hover:bg-brand-verification-green/5 transition-colors">
              <span className="font-medium text-sm text-brand-deep-charcoal group-hover:text-brand-verification-green transition-colors">Trusted Actors & Assets</span>
              <span className="text-functional-neutral group-hover:text-brand-verification-green transition-colors">→</span>
            </Link>
            <Link href="/dashboard/events" className="group flex items-center justify-between p-3 rounded-lg border border-surface-border hover:border-brand-verification-green hover:bg-brand-verification-green/5 transition-colors">
              <span className="font-medium text-sm text-brand-deep-charcoal group-hover:text-brand-verification-green transition-colors">Integrity Events</span>
              <span className="text-functional-neutral group-hover:text-brand-verification-green transition-colors">→</span>
            </Link>
            <Link href="/dashboard/compliance" className="group flex items-center justify-between p-3 rounded-lg border border-surface-border hover:border-brand-verification-green hover:bg-brand-verification-green/5 transition-colors">
              <span className="font-medium text-sm text-brand-deep-charcoal group-hover:text-brand-verification-green transition-colors">Compliance Export</span>
              <span className="text-functional-neutral group-hover:text-brand-verification-green transition-colors">→</span>
            </Link>
            <a 
              href={consumerHref} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-lg bg-brand-deep-charcoal text-white hover:bg-brand-verification-green transition-colors mt-auto"
            >
              <span className="font-medium text-sm">Consumer Verification App</span>
              <span>↗</span>
            </a>
          </nav>
        </section>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-brand-deep-charcoal">Macro Analytics</h2>
          <TimeRangeFilter currentRange={range} onRangeChange={handleRangeChange} />
        </div>

        <div className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
          <Suspense fallback={<div className="text-functional-neutral text-sm animate-pulse">Loading metrics...</div>}>
            <MetricsGrid metricsPromise={metricsPromise} />
          </Suspense>
        </div>
      </section>

      <section className="mt-4 bg-functional-pending/5 border border-functional-pending/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-brand-deep-charcoal mb-2">Why this matters in 2026</h3>
        <p className="text-sm text-functional-neutral leading-relaxed max-w-4xl">
          In an era of AI-generated claims and wrapper SaaS, the challenge isn't creating data—it's proving it. 
          This architecture demonstrates real enterprise verification, establishing strong trust boundaries and governance. 
          By combining role-based access, cryptographic signatures (Ed25519), and deterministic edge validation, 
          Eco Trace ensures that supply-chain events are auditable, immutable, and trustworthy from origin to consumer.
        </p>
      </section>
    </div>
  );
}
