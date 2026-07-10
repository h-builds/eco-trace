"use client";

import React, { useState } from "react";
import { DemoScenario } from "../../../lib/demoScenario";
import { useEvents } from "../../../domains/events/hooks/useEvents";
import { useEventTampering } from "../../../domains/events/hooks/useEventTampering";
import { EventDashboardHeader } from "../../../domains/events/components/EventDashboardHeader";
import { IntegrityLegend } from "../../../domains/events/components/IntegrityLegend";
import { IntegrityEventsTable } from "../../../domains/events/components/IntegrityEventsTable";
import { SupplyChainEvent } from "../../../domains/events/types";

export default function EventLogPage() {
  const [filter, setFilter] = useState<"ALL" | "INVALID" | "UNAUTHORIZED">("ALL");
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const {
    events,
    footprints,
    validityStatuses,
    isPending,
    isEngineReady,
    error,
    generateUntrustedSignature,
    verifyIntegrity,
    fetchEvents
  } = useEvents(filter);

  const showToast = (message: string, type: "success" | "warning" | "error") => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const { handleTamperTest, handleImpersonatorTest } = useEventTampering(
    isEngineReady,
    verifyIntegrity,
    generateUntrustedSignature,
    fetchEvents,
    showToast
  );

  const groupedEvents = new Map<string, SupplyChainEvent[]>();
  events.forEach((e: SupplyChainEvent) => {
    const existingEvents = groupedEvents.get(e.event_id);
    if (existingEvents) {
      existingEvents.push(e);
    } else {
      groupedEvents.set(e.event_id, [e]);
    }
  });
  
  groupedEvents.forEach(threadLogs => {
    threadLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  });

  const groupedEventEntries = Array.from(groupedEvents.entries());
  const nonValidUniqueIds = new Set(events.filter((e: SupplyChainEvent) => e.integrity_status !== "VALID").map((e: SupplyChainEvent) => e.event_id)).size;

  return (
    <div className="bg-surface-canvas min-h-screen p-8 font-sans text-brand-deep-charcoal">
      <EventDashboardHeader nonValidUniqueIds={nonValidUniqueIds} />
      
      <IntegrityLegend />

      <div className="flex gap-1 mb-6" role="group">
        {[
          { label: "All Events", value: "ALL" },
          { label: "Integrity Failures (INVALID)", value: "INVALID" },
          { label: "Identity Alerts (UNAUTHORIZED)", value: "UNAUTHORIZED" }
        ].map((btn) => {
          const isActive = filter === btn.value;
          return (
             <button
              key={btn.value}
              aria-pressed={isActive}
              onClick={() => setFilter(btn.value as "ALL" | "INVALID" | "UNAUTHORIZED")}
              className={`px-3 py-2 rounded-full cursor-pointer font-medium text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep-charcoal focus-visible:ring-offset-1 focus-visible:ring-offset-surface-canvas ${isActive ? 'bg-brand-deep-charcoal text-surface-canvas border border-brand-deep-charcoal' : 'bg-surface-canvas text-brand-deep-charcoal border border-surface-border hover:bg-surface-border'}`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {toastMsg && (
        <div className={`p-3 mb-6 text-white rounded font-medium shadow-subtle transition-opacity duration-300 ${toastMsg.type === "error" ? "bg-functional-alert" : "bg-functional-pending"}`} role="alert">
          {toastMsg.message}
        </div>
      )}

      <div className="mb-4 px-6 py-2 bg-functional-pending/5 border-l-4 border-brand-verification-green rounded-md">
        <h2 className="text-base font-bold flex items-center gap-2">
          Canonical Product Journey: {DemoScenario.productName}
        </h2>
        <p className="text-sm text-functional-neutral mt-1">Chronological event trail bound to {DemoScenario.assetId}</p>
      </div>

      <IntegrityEventsTable
        error={error}
        groupedEventEntries={groupedEventEntries}
        validityStatuses={validityStatuses}
        footprints={footprints}
        isPending={isPending}
        onTamperTest={handleTamperTest}
        onImpersonatorTest={handleImpersonatorTest}
      />
    </div>
  );
}
