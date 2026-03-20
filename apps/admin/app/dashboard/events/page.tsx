"use client";

import React, { useEffect, useState, useTransition } from "react";
import { tokens } from "@eco-trace/ui";
import { useWasm } from "../../../hooks/useWasm";

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
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch events from D1");
      const data: SupplyChainEvent[] = await res.json();
      setEvents(data);
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
          const result = calculateFootprint([
            { energy_kwh: event.energyKwh, emission_factor: event.emissionFactor }
          ]);
          if (!result.error) {
            newFootprints[event.id] = result.result;
          }

          const payload = {
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

          const integrityResult = verifyIntegrity(payload, event.signature, event.publicKey);
          
          if (integrityResult.status === "VALID") {
            newStatuses[event.id] = "VALID";
          } else if (integrityResult.status === "UNAUTHORIZED") {
            newStatuses[event.id] = "UNAUTHORIZED";
          } else {
            if (integrityResult.error) console.error("Wasm Integrity Error:", integrityResult.error);
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

    const integrityResult = verifyIntegrity(fraudPayloadForWasm, event.signature, event.publicKey);

    const payload = {
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
      integrity_status: integrityResult.status
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to persist");
      showToast(`Audited and Persisted: ${integrityResult.status}`, "error");
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

    const spoofResult = generateUntrustedSignature(fraudPayloadForWasm);
    if (!spoofResult || spoofResult.status !== "VALID" || !spoofResult.signature || !spoofResult.publicKey) {
      showToast("Failed to simulate trusted math locally", "error");
      return;
    }

    const integrityResult = verifyIntegrity(fraudPayloadForWasm, spoofResult.signature, spoofResult.publicKey);

    const payload = {
      id: crypto.randomUUID(),
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: ts,
      action_type: event.action_type,
      energy_kwh: event.energyKwh,
      emission_factor: event.emissionFactor,
      signature: spoofResult.signature,
      public_key: spoofResult.publicKey,
      integrity_status: integrityResult.status
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to persist");
      showToast(`Audited and Persisted: ${integrityResult.status}`, "error");
      fetchEvents();
    } catch (err) {
      console.error(err);
      showToast("Failed to persist impersonation event to D1", "error");
    }
  };

  const { colors, typography, spacing, shadows, radii } = tokens.tokens;
  const fontSizes = typography.sizes;

  const bgCanvas = colors.surface.canvas.value;
  const bgCard = colors.surface.card.value;
  const borderColor = colors.surface.border.value;
  const textPrimary = colors.brand["deep-charcoal"].value;

  const validColor = colors.brand["verification-green"].value;
  const warningColor = colors.functional.pending.value;
  const invalidColor = colors.functional.alert.value;
  const neutralColor = colors.functional.neutral.value;

  const fontFamily = typography["font-family"].value;

  const getStatusColor = (status: SupplyChainEvent["status"]) => {
    switch (status) {
      case "VALID": return validColor;
      case "WARNING":
      case "UNAUTHORIZED": return warningColor;
      case "INVALID": return invalidColor;
      default: return textPrimary;
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
    <div style={{ backgroundColor: bgCanvas, minHeight: "100vh", padding: spacing.scale.value[5] + "px", fontFamily, color: textPrimary }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.scale.value[4] + "px" }}>
        <h1 style={{ fontSize: fontSizes.xl.value, fontWeight: typography.weights.bold.value }}>High-Density Event Log</h1>
        <div style={{
          padding: `${spacing.scale.value[1]}px ${spacing.scale.value[3]}px`,
          backgroundColor: nonValidUniqueIds > 0 ? invalidColor : bgCanvas,
          color: nonValidUniqueIds > 0 ? "#FFFFFF" : textPrimary,
          border: `1px solid ${nonValidUniqueIds > 0 ? invalidColor : borderColor}`,
          borderRadius: radii.md.value,
          fontWeight: typography.weights.bold.value,
          fontSize: fontSizes.md.value,
        }} aria-live="polite">
          Security Counter: {nonValidUniqueIds} Compromised Flow{nonValidUniqueIds !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={{ display: "flex", gap: spacing.scale.value[1] + "px", marginBottom: spacing.scale.value[4] + "px" }} role="group">
        {[
          { label: "All Events", value: "ALL" },
          { label: "Integrity Failures (INVALID)", value: "INVALID" },
          { label: "Identity Alerts (UNAUTHORIZED)", value: "UNAUTHORIZED" }
        ].map((btn) => (
          <button
            key={btn.value}
            aria-pressed={filter === btn.value}
            onClick={() => setFilter(btn.value as "ALL" | "INVALID" | "UNAUTHORIZED")}
            style={{
              padding: `${spacing.scale.value[2]}px ${spacing.scale.value[3]}px`,
              backgroundColor: filter === btn.value ? textPrimary : bgCanvas,
              color: filter === btn.value ? bgCanvas : textPrimary,
              border: `1px solid ${filter === btn.value ? textPrimary : borderColor}`,
              borderRadius: radii.pill.value,
              cursor: "pointer",
              fontWeight: typography.weights.medium.value,
              fontSize: fontSizes.md.value,
              transition: "all 0.2s"
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {toastMsg && (
        <div style={{
          padding: spacing.scale.value[3] + "px",
          marginBottom: spacing.scale.value[4] + "px",
          backgroundColor: toastMsg.type === "error" ? invalidColor : warningColor,
          color: "#FFFFFF",
          borderRadius: spacing.scale.value[1] + "px",
          fontWeight: typography.weights.medium.value,
          boxShadow: shadows.subtle.value,
          transition: "opacity 0.3s ease-in-out"
        }} role="alert">
          {toastMsg.message}
        </div>
      )}

      <div style={{
        backgroundColor: bgCard,
        border: `1px solid ${borderColor}`,
        borderRadius: spacing.scale.value[1] + "px",
        boxShadow: shadows.subtle.value,
        overflow: "hidden"
      }}>
        {Object.keys(groupedEvents).length === 0 && !error ? (
          <div style={{ padding: spacing.scale.value[4] + "px", textAlign: "center", color: textPrimary }}>
            No live events match the filtered criteria from D1 Edge Route.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: bgCanvas, borderBottom: `1px solid ${borderColor}` }}>
              <tr>
                {["Event ID", "Actor", "Action", "Energy (kWh)", "Footprint (kgCO2e)", "Status", "Actions"].map((header) => (
                  <th key={header} style={{ padding: spacing.scale.value[3] + "px", fontWeight: typography.weights.medium.value, fontSize: fontSizes.md.value }} scope="col">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedEvents).map(([eventGroupKey, threadLogs]) => {
                const primaryEvent = threadLogs[0];
                const auditHistory = threadLogs.slice(1);
                const currentStatus = validityStatuses[primaryEvent.id] || "PENDING";

                return (
                  <React.Fragment key={eventGroupKey}>
                    <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value }}>
                        <div style={{ fontWeight: typography.weights.bold.value }}>{primaryEvent.event_id}</div>
                        <div style={{ fontSize: fontSizes.xs.value, color: neutralColor, marginTop: spacing.scale.value[0] + "px" }}>LOG ID: {primaryEvent.id.substring(0,8)}...</div>
                      </td>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value, fontFamily: "monospace", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "120px" }} title={primaryEvent.actor_id}>{primaryEvent.actor}</td>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value }}>{primaryEvent.action}</td>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value }}>{primaryEvent.energyKwh}</td>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value }}>
                        <div>{footprints[primaryEvent.id] !== undefined ? footprints[primaryEvent.id].toFixed(2) : "Calculating..."}</div>
                        <div style={{ fontSize: fontSizes.xs.value, marginTop: spacing.scale.value[0] + "px", backgroundColor: bgCanvas, padding: "2px 4px", borderRadius: radii.sm.value, display: "inline-block", color: neutralColor }}>
                          {"$$CF_{total} = \\sum (E_i \\times EF_i)$$"}
                        </div>
                      </td>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value }}>
                        <span style={{ display: "inline-block", padding: `${spacing.scale.value[0]}px ${spacing.scale.value[1]}px`, borderRadius: radii.lg.value, backgroundColor: getStatusColor(currentStatus), color: "#FFFFFF", fontSize: fontSizes.sm.value, fontWeight: typography.weights.bold.value }}>
                          {isPending ? "VERIFYING..." : currentStatus}
                        </span>
                      </td>
                      <td style={{ padding: spacing.scale.value[3] + "px", fontSize: fontSizes.md.value }}>
                        <div style={{ display: "flex", gap: spacing.scale.value[1] + "px" }}>
                          <button 
                            onClick={() => handleTamperTest(primaryEvent)}
                            style={{ padding: `${spacing.scale.value[1]}px ${spacing.scale.value[2]}px`, backgroundColor: warningColor, color: textPrimary, border: "none", borderRadius: radii.sm.value, cursor: "pointer", fontSize: fontSizes.sm.value, fontWeight: typography.weights.bold.value }}
                          >
                            Tamper Data
                          </button>
                          <button 
                            onClick={() => handleImpersonatorTest(primaryEvent)}
                            style={{ padding: `${spacing.scale.value[1]}px ${spacing.scale.value[2]}px`, backgroundColor: invalidColor, color: "#FFFFFF", border: "none", borderRadius: radii.sm.value, cursor: "pointer", fontSize: fontSizes.sm.value, fontWeight: typography.weights.bold.value }}
                          >
                            Impersonate
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {auditHistory.length > 0 && (
                      <tr style={{ backgroundColor: bgCanvas }}>
                        <td colSpan={7} style={{ padding: "0" }}>
                          <details style={{ width: "100%" }}>
                            <summary style={{ padding: spacing.scale.value[2] + "px", paddingLeft: spacing.scale.value[4] + "px", cursor: "pointer", fontSize: fontSizes.sm.value, fontWeight: typography.weights.medium.value, color: invalidColor }}>
                              View {auditHistory.length} Audit History Record{auditHistory.length !== 1 ? "s" : ""}
                            </summary>
                            <table style={{ width: "100%", margin: "0", borderTop: `1px solid ${borderColor}` }}>
                              <tbody>
                                {auditHistory.map(auditLog => {
                                  const auditStatus = validityStatuses[auditLog.id] || "PENDING";
                                  return (
                                    <tr key={auditLog.id} style={{ borderBottom: `1px dotted ${borderColor}` }}>
                                      <td style={{ padding: spacing.scale.value[2] + "px", paddingLeft: spacing.scale.value[5] + "px", fontSize: fontSizes.sm.value, color: neutralColor }}>...{auditLog.id.substring(auditLog.id.length-8)}</td>
                                      <td style={{ padding: spacing.scale.value[2] + "px", fontSize: fontSizes.sm.value, fontFamily: "monospace" }}>{auditLog.actor}</td>
                                      <td style={{ padding: spacing.scale.value[2] + "px", fontSize: fontSizes.sm.value, color: neutralColor }}>{auditLog.action}</td>
                                      <td style={{ padding: spacing.scale.value[2] + "px", fontSize: fontSizes.sm.value, color: neutralColor }}>{auditLog.energyKwh}</td>
                                      <td style={{ padding: spacing.scale.value[2] + "px", fontSize: fontSizes.sm.value, color: neutralColor, fontStyle: "italic" }}>Persisted at: {new Date(auditLog.timestamp).toLocaleTimeString()}</td>
                                      <td style={{ padding: spacing.scale.value[2] + "px", fontSize: fontSizes.sm.value }}>
                                        <span style={{ display: "inline-block", padding: "2px 6px", borderRadius: radii.lg.value, backgroundColor: getStatusColor(auditStatus), color: "#FFFFFF", fontWeight: typography.weights.bold.value }}>
                                          {auditStatus}
                                        </span>
                                      </td>
                                      <td style={{ padding: spacing.scale.value[2] + "px", fontSize: fontSizes.sm.value, color: neutralColor }}>Historical Write</td>
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
