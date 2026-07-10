import React from "react";
import { DemoScenario } from "../../../../lib/demoScenario";
import { getConsumerProductUrl, isConsumerUrlConfigured } from "../../../../lib/consumer";

interface EventDashboardHeaderProps {
  nonValidUniqueIds: number;
}

export function EventDashboardHeader({ nonValidUniqueIds }: EventDashboardHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          Integrity Events
          <span className="text-[10px] uppercase tracking-wider bg-functional-pending/10 text-functional-pending border border-functional-pending/20 px-2 py-0.5 rounded">
            {DemoScenario.demoDataLabel}
          </span>
        </h1>
        <p className="text-base text-functional-neutral max-w-3xl leading-relaxed">
          Every event is checked against payload integrity, actor trust, and deterministic ESG logic.
        </p>
      </div>
      <div className="flex gap-3 items-center">
        {isConsumerUrlConfigured() ? (
          <a
            href={getConsumerProductUrl(DemoScenario.assetId)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-brand-verification-green text-white rounded-md no-underline font-bold text-base inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-verification-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas cursor-pointer"
          >
            Open this product in Consumer App ↗
          </a>
        ) : (
          <div
            title="Consumer URL not configured"
            className="px-3 py-1 bg-surface-border text-functional-neutral rounded-md font-bold text-base inline-block cursor-not-allowed"
          >
            Consumer App Unavailable
          </div>
        )}
        <div className={`px-3 py-1 rounded-md font-bold text-base border ${nonValidUniqueIds > 0 ? 'bg-functional-alert text-white border-functional-alert' : 'bg-surface-canvas text-brand-deep-charcoal border-surface-border'}`} aria-live="polite">
          Security Counter: {nonValidUniqueIds} Compromised Flow{nonValidUniqueIds !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
