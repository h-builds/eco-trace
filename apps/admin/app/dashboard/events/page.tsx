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

const initialMockEvents: SupplyChainEvent[] = [
  {
    "action": "Material Extraction",
    "action_type": "ORIGIN",
    "actor": "Supplier A",
    "actor_id": "Supplier A",
    "asset_id": "ASSET-123",
    "emissionFactor": 0.5,
    "energyKwh": 120,
    "event_id": "EVT-001",
    "id": "EVT-001",
    "publicKey": "67ba633ae4996577363c1ff63209308a748f1a386d23989c2a80804f8766d485",
    "signature": "656bb2b49bce05409a739ad40dbd17e089e5332b9ab9449d7981a6ebbc5ec20be3c092f6480983941921a7292fa8388d858167cadf472046b3133a95e838390b",
    "status": "VALID",
    "timestamp": "2026-03-19T06:50:51Z"
  },
  {
    "action": "Transport",
    "action_type": "TRANSPORT",
    "actor": "Factory B",
    "actor_id": "Factory B",
    "asset_id": "ASSET-123",
    "emissionFactor": 0.8,
    "energyKwh": 300,
    "event_id": "EVT-002",
    "id": "EVT-002",
    "publicKey": "6323e759f5a527dfc3bbfa4ac2890cace776f05fc04055a83a89641458e2999c",
    "signature": "94e5bd722913963dfd9a13519c259d545a19e0f0fb8ff5b4863f83f6d8e3c2f80b589593f9c913941f311159bbe8c2c79f5ce3fc9d6c9252d30dfdc9c8b6050a",
    "status": "VALID",
    "timestamp": "2026-03-19T06:50:51Z"
  },
  {
    "action": "Manufacturing",
    "action_type": "TRANSFORM",
    "actor": "Supplier A",
    "actor_id": "Supplier A",
    "asset_id": "ASSET-123",
    "emissionFactor": 0.6,
    "energyKwh": 1500,
    "event_id": "EVT-003",
    "id": "EVT-003",
    "publicKey": "67ba633ae4996577363c1ff63209308a748f1a386d23989c2a80804f8766d485",
    "signature": "9751bdf1c255b2b1e6f1ff7983ce1a7e1fdfae7a36ab3473d656501c245a7777cf89e681d5be07d2e3d5811ac1483d123cbcdc0feb2c58b6fb5c565cd48be002",
    "status": "VALID",
    "timestamp": "2026-03-19T06:50:51Z"
  },
  {
    "action": "Shipping",
    "action_type": "TRANSPORT",
    "actor": "Factory B",
    "actor_id": "Factory B",
    "asset_id": "ASSET-123",
    "emissionFactor": 1.2,
    "energyKwh": 400,
    "event_id": "EVT-004",
    "id": "EVT-004",
    "publicKey": "6323e759f5a527dfc3bbfa4ac2890cace776f05fc04055a83a89641458e2999c",
    "signature": "473eac6ee0766f40abd870bcd37c5570fb8ff2cf9f45a9bc28cbea6ac64520a8887c6030bae2664aeee508f420f0c9ad403f2ec72bb4a002803b56fd4f934d0b",
    "status": "VALID",
    "timestamp": "2026-03-19T06:50:51Z"
  },
  {
    "action": "Storage",
    "action_type": "TRANSFORM",
    "actor": "Logistics D",
    "actor_id": "Logistics D",
    "asset_id": "ASSET-123",
    "emissionFactor": 0.3,
    "energyKwh": 50,
    "event_id": "EVT-005",
    "id": "EVT-005",
    "publicKey": "442bfed509de6510003d972c1e41ddedd6d52d2cc03c34c3a0b17a1c9c9ee753",
    "signature": "1be68190b99cc6e6142b6d7522b2b4c0478b451cb00d038a7fb8cb8b89ae2daabf3ecb158a1f3bec5a22d64dd0cb2e3c295d2b7c718ef52bbbce4eb99605e202",
    "status": "VALID",
    "timestamp": "2026-03-19T06:50:51Z"
  }
];

export default function EventLogPage() {
  const [events, setEvents] = useState<SupplyChainEvent[]>(initialMockEvents);
  const [footprints, setFootprints] = useState<Record<string, number>>({});
  const [validityStatuses, setValidityStatuses] = useState<Record<string, SupplyChainEvent["status"]>>({});
  
  const { isLoading, isEngineReady, error, calculateFootprint, verifyIntegrity } = useWasm();
  const [isPending, startTransition] = useTransition();

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
          console.log(`Debug [${event.id}]:`, { payload, sig: event.signature, pub: event.publicKey, res: integrityResult });
          
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

  const handleTamperTest = (eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId 
        ? { ...e, energyKwh: e.energyKwh + 1 }
        : e
    ));
  };

  const handleImpersonatorTest = (eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId 
        ? { ...e, actor_id: "Unregistered Imposter Actor ID" }
        : e
    ));
  };

  // UI Tokens extraction
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
      <h1
        style={{
          fontSize: "24px",
          fontWeight: typography.weights.bold.value,
          marginBottom: spacing.scale.value[4] + "px"
        }}
      >
        High-Density Event Log
      </h1>

      <div
        style={{
          backgroundColor: bgCard,
          border: `1px solid ${borderColor}`,
          borderRadius: spacing.scale.value[1] + "px",
          boxShadow: shadows.subtle.value,
          overflow: "hidden"
        }}
      >
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
      </div>
    </div>
  );
}
