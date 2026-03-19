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
  status: "VALID" | "WARNING" | "INVALID" | "PENDING" | "UNAUTHORIZED_ACTOR";
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
    "id": "EVT-001",
    "actor": "Supplier A",
    "action": "Material Extraction",
    "energyKwh": 120,
    "emissionFactor": 0.5,
    "status": "VALID",
    "signature": "379237c4430819e1f0d8f6b2503d68f46d87799c91b22450d14a7c1a352beaaaa786c4c2fee338ee7910e51845d5cb6928a4cda684475c2a58ec03cc721b950c",
    "publicKey": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "event_id": "EVT-001",
    "asset_id": "ASSET-123",
    "actor_id": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "timestamp": "2026-03-19T02:22:07Z",
    "action_type": "ORIGIN"
  },
  {
    "id": "EVT-002",
    "actor": "Supplier B",
    "action": "Transport",
    "energyKwh": 300,
    "emissionFactor": 0.8,
    "status": "VALID",
    "signature": "f10f6c431cc60658baab0bdb6b90ed38cf23e558c02ad678d6a13aa20c45ff76cf0975c90fff92bf3624d480cd6abc1445ae9c1baf35cbdea8fef00a49cd0e0a",
    "publicKey": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "event_id": "EVT-002",
    "asset_id": "ASSET-123",
    "actor_id": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "timestamp": "2026-03-19T02:22:07Z",
    "action_type": "TRANSPORT"
  },
  {
    "id": "EVT-003",
    "actor": "Factory C",
    "action": "Manufacturing",
    "energyKwh": 1500,
    "emissionFactor": 0.6,
    "status": "VALID",
    "signature": "2d5e1288a86493a2120554e46f5a4afe8093178ee447297df05da3b4e469352b5d48a946eb51dac687cb89bb6608b5c497814f0ea187d392f53a3ee56bbc2b07",
    "publicKey": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "event_id": "EVT-003",
    "asset_id": "ASSET-123",
    "actor_id": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "timestamp": "2026-03-19T02:22:07Z",
    "action_type": "TRANSFORM"
  },
  {
    "id": "EVT-004",
    "actor": "Logistics D",
    "action": "Shipping",
    "energyKwh": 400,
    "emissionFactor": 1.2,
    "status": "VALID",
    "signature": "625538f689b55a7c9f0ad82f722f9247f85da9193f784f79b9d2a6aaaa6cd9ef00fdf53da1d92ecda311a8d86c859933452c9c0d0f6b1cd0176548f7fc0dff06",
    "publicKey": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "event_id": "EVT-004",
    "asset_id": "ASSET-123",
    "actor_id": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "timestamp": "2026-03-19T02:22:07Z",
    "action_type": "TRANSPORT"
  },
  {
    "id": "EVT-005",
    "actor": "Warehouse E",
    "action": "Storage",
    "energyKwh": 50,
    "emissionFactor": 0.3,
    "status": "VALID",
    "signature": "14d1eca579893bcc7b6e36999811f3a42b149e43da63a6cc210aef7f5899e9e5d9667b62dc25e943049736d27c9b1bd94ad666d0a8ce5f88fb3eeb08b2719807",
    "publicKey": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "event_id": "EVT-005",
    "asset_id": "ASSET-123",
    "actor_id": "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10",
    "timestamp": "2026-03-19T02:22:07Z",
    "action_type": "TRANSFORM"
  }
];

export default function EventLogPage() {
  const [events, setEvents] = useState<SupplyChainEvent[]>(initialMockEvents);
  const [footprints, setFootprints] = useState<Record<string, number>>({});
  const [validityStatuses, setValidityStatuses] = useState<Record<string, SupplyChainEvent["status"]>>({});
  
  const { isLoading, error, calculateFootprint, verifyIntegrity, registerTrustedActor } = useWasm();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isLoading && !error && events.length > 0) {
      // Register our expected UI mock actor as an Authorized Entity
      registerTrustedActor(
        "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10", 
        "f444ff2d410a8409e3e422bc45d5b121e2d146882d4d6ae50382c3e42bf4dd10"
      );

      startTransition(() => {
        const newFootprints: Record<string, number> = {};
        const newStatuses: Record<string, SupplyChainEvent["status"]> = {};
        
        events.forEach((event) => {
          // CF_total calculation
          const result = calculateFootprint([
            { energy_kwh: event.energyKwh, emission_factor: event.emissionFactor }
          ]);
          if (!result.error) {
            newFootprints[event.id] = result.result;
          }

          // Cryptographic Verification
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
          } else if (integrityResult.status === "UNAUTHORIZED_ACTOR") {
            newStatuses[event.id] = "UNAUTHORIZED_ACTOR";
          } else {
            // Evaluates as INVALID if hash mismatch prevents deterministic recreation
            newStatuses[event.id] = "INVALID";
          }
        });

        setFootprints(newFootprints);
        setValidityStatuses(newStatuses);
      });
    }
  }, [isLoading, error, events, calculateFootprint, verifyIntegrity, registerTrustedActor]);

  const handleTamperTest = (eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId 
        ? { ...e, energyKwh: e.energyKwh + 1 } // Mutate data to break signature
        : e
    ));
  };

  const handleImpersonatorTest = (eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId 
        // Claiming to be a different actor!
        // Cryptographically signed properly (because signature maps to event.publicKey mathematically),
        // But the mapped key does not match the Identity in the Trust Registry for this altered payload!
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
        return warningColor;
      case "INVALID":
      case "UNAUTHORIZED_ACTOR":
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
