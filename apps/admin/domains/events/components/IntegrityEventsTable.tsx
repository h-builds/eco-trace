import React from "react";
import { SupplyChainEvent } from "../types";

const getReadableActionLabel = (action: string, status: SupplyChainEvent["integrity_status"]) => {
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

interface IntegrityEventsTableProps {
  error: string | null;
  groupedEventEntries: [string, SupplyChainEvent[]][];
  validityStatuses: Map<string, SupplyChainEvent["integrity_status"]>;
  footprints: Map<string, number>;
  isPending: boolean;
  onTamperTest: (event: SupplyChainEvent) => void;
  onImpersonatorTest: (event: SupplyChainEvent) => void;
}

export function IntegrityEventsTable({
  error,
  groupedEventEntries,
  validityStatuses,
  footprints,
  isPending,
  onTamperTest,
  onImpersonatorTest
}: IntegrityEventsTableProps) {
  if (error) {
    return (
      <div className="bg-surface-card border border-surface-border rounded-md shadow-subtle overflow-hidden">
        <div className="p-6 text-center text-functional-alert font-medium bg-functional-alert/10">
          Integrity Verification Unavailable. The Go/Wasm bridge failed to load: {error}
        </div>
      </div>
    );
  }

  if (groupedEventEntries.length === 0) {
    return (
      <div className="bg-surface-card border border-surface-border rounded-md shadow-subtle overflow-hidden">
        <div className="p-6 text-center text-brand-deep-charcoal flex flex-col items-center gap-2">
          <span className="font-medium text-lg">No demo data found.</span>
          <span className="text-sm text-functional-neutral">Please run the seed script <code className="bg-surface-canvas border border-surface-border px-1.5 py-0.5 rounded">npx tsx lib/seed.ts</code> to populate the scenario.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-card border border-surface-border rounded-md shadow-subtle overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead className="bg-surface-canvas border-b border-surface-border">
          <tr>
            {["Event ID", "Actor", "Action", "Energy (kWh)", "Footprint (kgCO2e)", "Status", "Actions"].map((header) => (
              <th key={header} className="p-3 font-medium text-base" scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupedEventEntries.map(([eventGroupKey, threadLogs]) => {
            const primaryEvent = threadLogs[0];
            const auditHistory = threadLogs.slice(1);
            const currentStatus = validityStatuses.get(primaryEvent.id) || "PENDING";
            const primaryFootprint = footprints.get(primaryEvent.id);
            
            const statusBg = currentStatus === "VALID" ? "bg-brand-verification-green" : currentStatus === "INVALID" ? "bg-functional-alert" : "bg-functional-pending";

            return (
              <React.Fragment key={eventGroupKey}>
                <tr className="border-b border-surface-border">
                  <td className="p-3 text-base">
                    <div className="font-bold">{primaryEvent.event_id}</div>
                    <div className="text-xs text-functional-neutral mt-1">LOG ID: {primaryEvent.id.substring(0,8)}...</div>
                  </td>
                  <td className="p-3 text-base font-mono text-ellipsis overflow-hidden whitespace-nowrap max-w-[120px]" title={primaryEvent.actor_id}>{primaryEvent.actor_id}</td>
                  <td className="p-3 text-base">{getReadableActionLabel(primaryEvent.action_type, currentStatus)}</td>
                  <td className="p-3 text-base">{primaryEvent.esg_metadata.energy_kwh}</td>
                  <td className="p-3 text-base">
                    <div>{primaryFootprint !== undefined ? primaryFootprint.toFixed(2) : "Calculating..."}</div>
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
                        onClick={() => onTamperTest(primaryEvent)}
                        className="px-2 py-1 bg-functional-pending text-brand-deep-charcoal border-none rounded-sm cursor-pointer text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-functional-pending focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
                      >
                        Tamper Data
                      </button>
                      <button 
                        onClick={() => onImpersonatorTest(primaryEvent)}
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
                              const auditStatus = validityStatuses.get(auditLog.id) || "PENDING";
                              const auditStatusBg = auditStatus === "VALID" ? "bg-brand-verification-green" : auditStatus === "INVALID" ? "bg-functional-alert" : "bg-functional-pending";
                              return (
                                <tr key={auditLog.id} className="border-b border-dotted border-surface-border">
                                  <td className="p-2 pl-8 text-sm text-functional-neutral">...{auditLog.id.substring(auditLog.id.length-8)}</td>
                                  <td className="p-2 text-sm font-mono">{auditLog.actor_id}</td>
                                  <td className="p-2 text-sm text-functional-neutral">{getReadableActionLabel(auditLog.action_type, auditStatus)}</td>
                                  <td className="p-2 text-sm text-functional-neutral">{auditLog.esg_metadata.energy_kwh}</td>
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
    </div>
  );
}
