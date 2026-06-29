"use client";

import React, { useEffect, useState, useTransition } from "react";
import { tokens } from "@eco-trace/ui";
import { useWasm } from "../../../hooks/useWasm";
import { DemoScenario } from "../../../lib/demoScenario";
import { getConsumerProductUrl, isConsumerUrlConfigured } from "../../../lib/consumer";
export interface SupplyChainEvent {
  id: string;
  actor: string;
  action: string;
  energyKwh: number;
  emissionFactor: number;
  status: "VALID" | "WARNING" | "INVALID" | "PENDING" | "UNAUTHORIZED";
  signature: string;
  publicKey: string;
  event_id: string;
  asset_id: string;
  actor_id: string;
  timestamp: string;
  action_type: string;
}

const getReadableActionLabel = (action: string, status: SupplyChainEvent["status"]) => {
  if (status === "INVALID") return "Tamper attempt detected";
  if (status === "UNAUTHORIZED") return "Unauthorized actor blocked";
  switch(action) {
    case "ORIGIN": return "Origin registered";
    case "TRANSFORM": return "Processing completed";
    case "TRANSPORT": return "Transport verified";
    case "AUDIT": return "Audit reviewed";
    default: return action;
  }
};

export default function EventLogPage() {
  const [events, setEvents] = useState<SupplyChainEvent[]>([]);
  const [footprints, setFootprints] = useState<Record<string, number>>({});
  const [validityStatuses, setValidityStatuses] = useState<Record<string, SupplyChainEvent["status"]>>({});
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
  
  const [filter, setFilter] = useState<"ALL" | "INVALID" | "UNAUTHORIZED">("ALL");

  const { isLoading, isEngineReady, error, calculateFootprint, verifyIntegrity, generateUntrustedSignature } = useWasm();
  const [isPending, startTransition] = useTransition();

  const fetchEvents = async () => {
    try {
      const url = filter === "ALL" ? "/api/events" : `/api/events?status=${filter}`;
      const eventResponse = await fetch(url);
      if (!eventResponse.ok) throw new Error("Failed to fetch events from D1");
      const retrievedEvents: SupplyChainEvent[] = await eventResponse.json();
      setEvents(retrievedEvents);
    } catch (err) {
      console.error(err);
      setToastMsg({ message: "Failed to load events from D1.", type: "error" });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  useEffect(() => {
    if (isEngineReady && !error && events.length > 0) {
      startTransition(() => {
        const newFootprints: Record<string, number> = {};
        const newStatuses: Record<string, SupplyChainEvent["status"]> = {};
        
        events.forEach((event: SupplyChainEvent) => {
          const footprintCalculation = calculateFootprint([
            { energy_kwh: event.energyKwh, emission_factor: event.emissionFactor }
          ]);
          if (!footprintCalculation.error) {
            newFootprints[event.id] = footprintCalculation.result;
          }

          const verificationPayload = {
            event_id: event.event_id,
            asset_id: event.asset_id,
            actor_id: event.actor_id,
            timestamp: event.timestamp,
            action_type: event.action_type,
            esg_metadata: {
              energy_kwh: event.energyKwh,
              emission_factor: event.emissionFactor
            }
          };

          const integrityVerification = verifyIntegrity(verificationPayload, event.signature, event.publicKey);
          
          if (integrityVerification.status === "VALID") {
            newStatuses[event.id] = "VALID";
          } else if (integrityVerification.status === "UNAUTHORIZED") {
            newStatuses[event.id] = "UNAUTHORIZED";
          } else {
            if (integrityVerification.error) console.error("Wasm Integrity Error:", integrityVerification.error);
            newStatuses[event.id] = "INVALID";
          }
        });

        setFootprints(newFootprints);
        setValidityStatuses(newStatuses);
      });
    }
  }, [isEngineReady, error, events, calculateFootprint, verifyIntegrity]);

  const showToast = (message: string, type: "success" | "warning" | "error") => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleTamperTest = async (event: SupplyChainEvent) => {
    if (!isEngineReady) return;
    showToast("Auditing & Persisting fraud attempt...", "warning");

    const tamperedEnergy = event.energyKwh + 1;
    const ts = new Date().toISOString();
    
    const fraudPayloadForWasm = {
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: event.actor_id,
      timestamp: ts,
      action_type: event.action_type,
      esg_metadata: { energy_kwh: tamperedEnergy, emission_factor: event.emissionFactor }
    };

    const tamperedVerification = verifyIntegrity(fraudPayloadForWasm, event.signature, event.publicKey);

    const persistencePayload = {
      id: crypto.randomUUID(),
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: event.actor_id,
      timestamp: ts,
      action_type: event.action_type,
      energy_kwh: tamperedEnergy,
      emission_factor: event.emissionFactor,
      signature: event.signature,
      public_key: event.publicKey,
      integrity_status: tamperedVerification.status
    };

    try {
      const persistenceResponse = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persistencePayload)
      });
      if (!persistenceResponse.ok) throw new Error("Failed to persist");
      showToast(`Audited and Persisted: ${tamperedVerification.status}`, "error");
      fetchEvents();
    } catch (err) {
      console.error(err);
      showToast("Failed to persist tamper event to D1", "error");
    }
  };

  const handleImpersonatorTest = async (event: SupplyChainEvent) => {
    if (!generateUntrustedSignature) return;
    showToast("Auditing & Persisting impersonation attempt bridging Go generation...", "warning");

    const fraudulentActor = "Unregistered Imposter Actor ID";
    const ts = new Date().toISOString();
    
    const fraudPayloadForWasm = {
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: ts,
      action_type: event.action_type,
      esg_metadata: { energy_kwh: event.energyKwh, emission_factor: event.emissionFactor }
    };

    const impersonationOutcome = generateUntrustedSignature(fraudPayloadForWasm);
    if (!impersonationOutcome || impersonationOutcome.status !== "VALID" || !impersonationOutcome.signature || !impersonationOutcome.publicKey) {
      showToast("Failed to simulate trusted math locally", "error");
      return;
    }

    const spoofedVerification = verifyIntegrity(fraudPayloadForWasm, impersonationOutcome.signature, impersonationOutcome.publicKey);

    const spoofedPersistencePayload = {
      id: crypto.randomUUID(),
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: ts,
      action_type: event.action_type,
      energy_kwh: event.energyKwh,
      emission_factor: event.emissionFactor,
      signature: impersonationOutcome.signature,
      public_key: impersonationOutcome.publicKey,
      integrity_status: spoofedVerification.status
    };

    try {
      const spoofedPersistenceResponse = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spoofedPersistencePayload)
      });
      if (!spoofedPersistenceResponse.ok) throw new Error("Failed to persist");
      showToast(`Audited and Persisted: ${spoofedVerification.status}`, "error");
      fetchEvents();
    } catch (err) {
      console.error(err);
      showToast("Failed to persist impersonation event to D1", "error");
    }
  };

  const groupedEvents: Record<string, SupplyChainEvent[]> = {};
  events.forEach((e: SupplyChainEvent) => {
    if (!groupedEvents[e.event_id]) groupedEvents[e.event_id] = [];
    groupedEvents[e.event_id].push(e);
  });
  
  Object.keys(groupedEvents).forEach(key => {
    groupedEvents[key].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  });

  const nonValidUniqueIds = new Set(events.filter((e: SupplyChainEvent) => e.status !== "VALID").map((e: SupplyChainEvent) => e.event_id)).size;

  return (
    <div className="bg-surface-canvas min-h-screen p-8 font-sans text-brand-deep-charcoal">
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

      <div className="flex gap-6 mb-6 items-stretch">
        <div className="bg-surface-card border border-surface-border p-6 rounded-md flex-1">
          <h3 className="text-base font-bold mb-2">Ed25519 Integrity Verification</h3>
          <p className="text-sm text-functional-neutral leading-relaxed max-w-2xl">
            Event payloads are cryptographically signed at origin using Ed25519 (a fast, secure public-key signature system). This workstation runs a local Go/Wasm engine to recalculate hashes, verify signatures, and check actors against the trusted registry in real-time. Any manipulation breaks the mathematical proof.
          </p>
        </div>

        <div className="bg-surface-card border border-surface-border p-6 rounded-md flex flex-col gap-2 min-w-[200px]">
          <h3 className="text-sm font-bold text-functional-neutral uppercase tracking-wider">Integrity Status Legend</h3>
          <p className="text-[11px] text-functional-neutral mb-1">
            The Integrity Status indicates whether an event's cryptographic signature and actor authorization are valid.
          </p>
          <div className="flex gap-2 flex-wrap">
            {(["VALID", "WARNING", "INVALID", "UNAUTHORIZED"] as const).map((status) => {
              const bgClass = status === "VALID" ? "bg-brand-verification-green" : status === "INVALID" ? "bg-functional-alert" : "bg-functional-pending";
              return (
                <span key={status} className={`inline-block px-2 py-1 rounded-full ${bgClass} text-white text-xs font-bold`}>
                  {status}
                </span>
              );
            })}
          </div>
        </div>
      </div>

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

      <div className="bg-surface-card border border-surface-border rounded-md shadow-subtle overflow-hidden">
        {error ? (
          <div className="p-6 text-center text-functional-alert font-medium bg-functional-alert/10">
            Integrity Verification Unavailable. The Go/Wasm bridge failed to load: {error}
          </div>
        ) : Object.keys(groupedEvents).length === 0 ? (
          <div className="p-6 text-center text-brand-deep-charcoal flex flex-col items-center gap-2">
            <span className="font-medium text-lg">No demo data found.</span>
            <span className="text-sm text-functional-neutral">Please run the seed script <code className="bg-surface-canvas border border-surface-border px-1.5 py-0.5 rounded">npx tsx lib/seed.ts</code> to populate the scenario.</span>
          </div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-canvas border-b border-surface-border">
              <tr>
                {["Event ID", "Actor", "Action", "Energy (kWh)", "Footprint (kgCO2e)", "Status", "Actions"].map((header) => (
                  <th key={header} className="p-3 font-medium text-base" scope="col">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedEvents).map(([eventGroupKey, threadLogs]) => {
                const primaryEvent = threadLogs[0];
                const auditHistory = threadLogs.slice(1);
                const currentStatus = validityStatuses[primaryEvent.id] || "PENDING";
                
                const statusBg = currentStatus === "VALID" ? "bg-brand-verification-green" : currentStatus === "INVALID" ? "bg-functional-alert" : "bg-functional-pending";

                return (
                  <React.Fragment key={eventGroupKey}>
                    <tr className="border-b border-surface-border">
                      <td className="p-3 text-base">
                        <div className="font-bold">{primaryEvent.event_id}</div>
                        <div className="text-xs text-functional-neutral mt-1">LOG ID: {primaryEvent.id.substring(0,8)}...</div>
                      </td>
                      <td className="p-3 text-base font-mono text-ellipsis overflow-hidden whitespace-nowrap max-w-[120px]" title={primaryEvent.actor_id}>{primaryEvent.actor}</td>
                      <td className="p-3 text-base">{getReadableActionLabel(primaryEvent.action, currentStatus)}</td>
                      <td className="p-3 text-base">{primaryEvent.energyKwh}</td>
                      <td className="p-3 text-base">
                        <div>{footprints[primaryEvent.id] !== undefined ? footprints[primaryEvent.id].toFixed(2) : "Calculating..."}</div>
                        <div className="text-xs mt-1 bg-surface-canvas px-1 py-0.5 rounded-sm inline-block text-functional-neutral">
                          {"$$CF_{total} = \\sum (E_i \\times EF_i)$$"}
                        </div>
                      </td>
                      <td className="p-3 text-base">
                        <span className={`inline-block px-2 py-1 rounded-full text-white text-sm font-bold ${statusBg}`}>
                          {isPending ? "VERIFYING..." : currentStatus}
                        </span>
                      </td>
                      <td className="p-3 text-base">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleTamperTest(primaryEvent)}
                            className="px-2 py-1 bg-functional-pending text-brand-deep-charcoal border-none rounded-sm cursor-pointer text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-functional-pending focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
                          >
                            Tamper Data
                          </button>
                          <button 
                            onClick={() => handleImpersonatorTest(primaryEvent)}
                            className="px-2 py-1 bg-functional-alert text-white border-none rounded-sm cursor-pointer text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-functional-alert focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
                          >
                            Impersonate
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {auditHistory.length > 0 && (
                      <tr className="bg-surface-canvas">
                        <td colSpan={7} className="p-0">
                          <details className="w-full">
                            <summary className="p-2 pl-6 cursor-pointer text-sm font-medium text-functional-alert focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-functional-alert">
                              View {auditHistory.length} Audit History Record{auditHistory.length !== 1 ? "s" : ""}
                            </summary>
                            <table className="w-full m-0 border-t border-surface-border">
                              <tbody>
                                {auditHistory.map(auditLog => {
                                  const auditStatus = validityStatuses[auditLog.id] || "PENDING";
                                  const auditStatusBg = auditStatus === "VALID" ? "bg-brand-verification-green" : auditStatus === "INVALID" ? "bg-functional-alert" : "bg-functional-pending";
                                  return (
                                    <tr key={auditLog.id} className="border-b border-dotted border-surface-border">
                                      <td className="p-2 pl-8 text-sm text-functional-neutral">...{auditLog.id.substring(auditLog.id.length-8)}</td>
                                      <td className="p-2 text-sm font-mono">{auditLog.actor}</td>
                                      <td className="p-2 text-sm text-functional-neutral">{getReadableActionLabel(auditLog.action, auditStatus)}</td>
                                      <td className="p-2 text-sm text-functional-neutral">{auditLog.energyKwh}</td>
                                      <td className="p-2 text-sm text-functional-neutral italic">Persisted at: {new Date(auditLog.timestamp).toLocaleTimeString()}</td>
                                      <td className="p-2 text-sm">
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-white font-bold ${auditStatusBg}`}>
                                          {auditStatus}
                                        </span>
                                      </td>
                                      <td className="p-2 text-sm text-functional-neutral">Historical Write</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </details>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
