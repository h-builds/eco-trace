"use client";

import { useEffect, useState, useTransition } from "react";
import tokens from "../../../../../packages/ui/tokens.json";
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

  const { isLoading, isEngineReady, error, calculateFootprint, verifyIntegrity } = useWasm();
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
        
        events.forEach((event) => {
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

  const handleTamperTest = async (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (!event || !isEngineReady) return;

    showToast("Auditing & Persisting fraud attempt...", "warning");

    const tamperedEnergy = event.energyKwh + 1;
    calculateFootprint([{ energy_kwh: tamperedEnergy, emission_factor: event.emissionFactor }]);
    
    const fraudPayloadForWasm = {
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: event.actor_id,
      timestamp: event.timestamp,
      action_type: event.action_type,
      esg_metadata: { energy_kwh: tamperedEnergy, emission_factor: event.emissionFactor }
    };

    const integrityResult = verifyIntegrity(fraudPayloadForWasm, event.signature, event.publicKey);

    const payload = {
      id: crypto.randomUUID(),
      asset_id: event.asset_id,
      actor_id: event.actor_id,
      timestamp: new Date().toISOString(),
      action_type: event.action_type,
      energy_kwh: tamperedEnergy,
      emission_factor: event.emissionFactor,
      signature: event.signature,
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

  const handleImpersonatorTest = async (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (!event || !isEngineReady) return;

    showToast("Auditing & Persisting impersonation attempt...", "warning");

    const fraudulentActor = "Unregistered Imposter Actor ID";
    
    const fraudPayloadForWasm = {
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: event.timestamp,
      action_type: event.action_type,
      esg_metadata: { energy_kwh: event.energyKwh, emission_factor: event.emissionFactor }
    };

    const integrityResult = verifyIntegrity(fraudPayloadForWasm, event.signature, event.publicKey);

    const payload = {
      id: crypto.randomUUID(),
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: new Date().toISOString(),
      action_type: event.action_type,
      energy_kwh: event.energyKwh,
      emission_factor: event.emissionFactor,
      signature: event.signature,
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

  const { colors, typography, spacing, shadows } = tokens.tokens;

  const bgCanvas = colors.surface.canvas.value;
  const bgCard = colors.surface.card.value;
  const borderColor = colors.surface.border.value;
  const textPrimary = colors.brand["deep-charcoal"].value;

  const validColor = colors.brand["verification-green"].value;
  const warningColor = colors.functional.pending.value;
  const invalidColor = colors.functional.alert.value;

  const fontFamily = typography["font-family"].value;

  const getStatusColor = (status: SupplyChainEvent["status"]) => {
    switch (status) {
      case "VALID":
        return validColor;
      case "WARNING":
      case "UNAUTHORIZED":
        return warningColor;
      case "INVALID":
        return invalidColor;
      default:
        return textPrimary;
    }
  };

  const nonValidCount = events.filter(e => e.status !== "VALID").length;

  return (
    <div
      style={{
        backgroundColor: bgCanvas,
        minHeight: "100vh",
        padding: spacing.scale.value[5] + "px",
        fontFamily,
        color: textPrimary
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.scale.value[4] + "px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: typography.weights.bold.value
          }}
        >
          High-Density Event Log
        </h1>
        <div 
          style={{
            padding: `${spacing.scale.value[1]}px ${spacing.scale.value[3]}px`,
            backgroundColor: nonValidCount > 0 ? invalidColor : bgCanvas,
            color: nonValidCount > 0 ? "#FFFFFF" : textPrimary,
            border: `1px solid ${nonValidCount > 0 ? invalidColor : borderColor}`,
            borderRadius: "8px",
            fontWeight: typography.weights.bold.value,
            fontSize: "14px",
          }}
          aria-live="polite"
        >
          Security Counter: {nonValidCount} Non-Valid Event{nonValidCount !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: spacing.scale.value[4] + "px" }} role="group" aria-label="Event Status Filters">
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
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: typography.weights.medium.value,
              fontSize: "14px",
              transition: "all 0.2s"
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {toastMsg && (
        <div 
          style={{
            padding: spacing.scale.value[3] + "px",
            marginBottom: spacing.scale.value[4] + "px",
            backgroundColor: toastMsg.type === "error" ? invalidColor : warningColor,
            color: "#FFFFFF",
            borderRadius: spacing.scale.value[1] + "px",
            fontWeight: typography.weights.medium.value,
            boxShadow: shadows.subtle.value,
            transition: "opacity 0.3s ease-in-out"
          }}
          role="alert"
        >
          {toastMsg.message}
        </div>
      )}

      <div
        style={{
          backgroundColor: bgCard,
          border: `1px solid ${borderColor}`,
          borderRadius: spacing.scale.value[1] + "px",
          boxShadow: shadows.subtle.value,
          overflow: "hidden"
        }}
      >
        {events.length === 0 && !error ? (
          <div style={{ padding: spacing.scale.value[4] + "px", textAlign: "center", color: textPrimary }}>
            No live events match the filtered criteria from D1 Edge Route.
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left"
            }}
            aria-label="Supply Chain Events Log"
          >
            <thead
              style={{
                backgroundColor: bgCanvas,
                borderBottom: `1px solid ${borderColor}`
              }}
            >
              <tr>
                {["Event ID", "Actor", "Action", "Energy (kWh)", "Footprint (kgCO2e)", "Status", "Actions"].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: spacing.scale.value[3] + "px",
                      fontWeight: typography.weights.medium.value,
                      fontSize: "14px"
                    }}
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                 const currentStatus = validityStatuses[event.id] || "PENDING";
                 return (
                <tr
                  key={event.id}
                  style={{ borderBottom: `1px solid ${borderColor}` }}
                  tabIndex={0}
                  aria-label={`Event ${event.id} by ${event.actor}`}
                >
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>{event.id}</td>
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px", fontFamily: "monospace", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "120px" }} title={event.actor_id}>{event.actor}</td>
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>{event.action}</td>
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>{event.energyKwh}</td>
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>
                    {footprints[event.id] !== undefined ? footprints[event.id].toFixed(2) : "Calculating..."}
                  </td>
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: `${spacing.scale.value[0]}px ${spacing.scale.value[1]}px`,
                        borderRadius: "12px",
                        backgroundColor: getStatusColor(currentStatus),
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: typography.weights.bold.value
                      }}
                      aria-label={`Status: ${currentStatus}`}
                    >
                      {isPending ? "VERIFYING..." : currentStatus}
                    </span>
                  </td>
                  <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => handleTamperTest(event.id)}
                        style={{
                          padding: `${spacing.scale.value[1]}px ${spacing.scale.value[2]}px`,
                          backgroundColor: warningColor,
                          color: textPrimary,
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: typography.weights.bold.value
                        }}
                        title="Tamper Test: Corrupts energyKwh payload data to simulate man-in-the-middle attack"
                      >
                        Tamper Data
                      </button>
                      <button 
                        onClick={() => handleImpersonatorTest(event.id)}
                        style={{
                          padding: `${spacing.scale.value[1]}px ${spacing.scale.value[2]}px`,
                          backgroundColor: invalidColor,
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: typography.weights.bold.value
                        }}
                        title="Imposter Test: Claims to be an unauthorized actor_id, breaking Trust Registry map"
                      >
                        Impersonate
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
