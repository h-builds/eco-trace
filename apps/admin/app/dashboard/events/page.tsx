"use client";

import { useEffect, useState } from "react";
import tokens from "../../../../../packages/ui/tokens.json";
import { getWasmInit } from "../../../lib/wasmLoader";
import type { WasmFootprintResult } from "../../../lib/wasm";

export interface SupplyChainEvent {
  id: string;
  actor: string;
  action: string;
  energyKwh: number;
  emissionFactor: number;
  status: "VALID" | "WARNING" | "INVALID";
}

const mockEvents: SupplyChainEvent[] = [
  { id: "EVT-001", actor: "Supplier A", action: "Material Extraction", energyKwh: 120, emissionFactor: 0.5, status: "VALID" },
  { id: "EVT-002", actor: "Supplier B", action: "Transport", energyKwh: 300, emissionFactor: 0.8, status: "WARNING" },
  { id: "EVT-003", actor: "Factory C", action: "Manufacturing", energyKwh: 1500, emissionFactor: 0.6, status: "VALID" },
  { id: "EVT-004", actor: "Logistics D", action: "Shipping", energyKwh: 400, emissionFactor: 1.2, status: "INVALID" },
  { id: "EVT-005", actor: "Warehouse E", action: "Storage", energyKwh: 50, emissionFactor: 0.3, status: "VALID" },
  { id: "EVT-006", actor: "Supplier A", action: "Refining", energyKwh: 200, emissionFactor: 0.55, status: "VALID" },
  { id: "EVT-007", actor: "Factory C", action: "Packaging", energyKwh: 80, emissionFactor: 0.4, status: "WARNING" },
  { id: "EVT-008", actor: "Logistics F", action: "Last-mile Delivery", energyKwh: 150, emissionFactor: 0.9, status: "VALID" },
  { id: "EVT-009", actor: "Supplier B", action: "Sourcing", energyKwh: 60, emissionFactor: 0.7, status: "INVALID" },
  { id: "EVT-010", actor: "Operations G", action: "Data Center Sync", energyKwh: 500, emissionFactor: 0.2, status: "VALID" }
];

export default function EventLogPage() {
  const [events, setEvents] = useState<SupplyChainEvent[]>(mockEvents);
  const [footprints, setFootprints] = useState<Record<string, number>>({});
  const [wasmReady, setWasmReady] = useState(false);

  useEffect(() => {
    getWasmInit()
      .then(() => {
        setWasmReady(true);
      })
      .catch((err) => {
        console.error("Failed to load WASM engine", err);
      });
  }, []);

  useEffect(() => {
    if (wasmReady && typeof window.calculateFootprint === "function") {
      const newFootprints: Record<string, number> = {};
      events.forEach((event) => {
        const result = window.calculateFootprint([
          { energy_kwh: event.energyKwh, emission_factor: event.emissionFactor }
        ]);
        if (!result.error) {
          newFootprints[event.id] = result.result;
        } else {
          console.error("WASM calculation error for event", event.id, result.error);
        }
      });
      setFootprints(newFootprints);
    }
  }, [wasmReady, events]);

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
              {["Event ID", "Actor", "Action", "Energy (kWh)", "Footprint (kgCO2e)", "Status"].map((header) => (
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
            {events.map((event) => (
              <tr
                key={event.id}
                style={{ borderBottom: `1px solid ${borderColor}` }}
                tabIndex={0}
                aria-label={`Event ${event.id} by ${event.actor}`}
              >
                <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>{event.id}</td>
                <td style={{ padding: spacing.scale.value[3] + "px", fontSize: "14px" }}>{event.actor}</td>
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
                      backgroundColor: getStatusColor(event.status),
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: typography.weights.bold.value
                    }}
                    aria-label={`Status: ${event.status}`}
                  >
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
