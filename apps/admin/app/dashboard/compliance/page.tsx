"use client";

import React, { useState } from "react";
import { tokens } from "@eco-trace/ui";
import { ExportButtons } from "./ExportButtons";
import { DemoScenario } from "../../../lib/demoScenario";

export default function CompliancePage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [actorId, setActorId] = useState<string>("");

  const { colors, typography, spacing, radii, shadows } = tokens.tokens;
  
  const bgCanvas = colors.surface.canvas.value;
  const bgCard = colors.surface.card.value;
  const borderColor = colors.surface.border.value;
  const textPrimary = colors.brand["deep-charcoal"].value;
  const textSecondary = colors.functional.neutral.value;

  const fontSizes = typography.sizes;
  const fontFamily = typography["font-family"].value;

  return (
    <div style={{ backgroundColor: bgCanvas, minHeight: "100vh", padding: spacing.scale.value[5] + "px", fontFamily, color: textPrimary }}>
      <h1 style={{ fontSize: fontSizes.xl.value, fontWeight: typography.weights.bold.value, marginBottom: spacing.scale.value[2] + "px", display: "flex", alignItems: "center", gap: "8px" }}>
        Compliance Reporting
        <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>
          {DemoScenario.demoDataLabel}
        </span>
      </h1>
      <p style={{ color: textSecondary, marginBottom: spacing.scale.value[5] + "px" }}>
        Generate immutable cryptographic audit reports for external regulators.
      </p>

      <div style={{
        backgroundColor: bgCard,
        padding: spacing.scale.value[4] + "px",
        borderRadius: radii.md.value,
        border: `1px solid ${borderColor}`,
        boxShadow: shadows.subtle.value,
        maxWidth: "600px"
      }}>
        <h2 style={{ fontSize: fontSizes.lg.value, fontWeight: typography.weights.bold.value, marginBottom: spacing.scale.value[3] + "px" }}>
          Report Filters
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: spacing.scale.value[3] + "px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: fontSizes.sm.value, fontWeight: typography.weights.medium.value }}>
              Start Date
            </label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%", padding: "8px", borderRadius: radii.sm.value, border: `1px solid ${borderColor}`,
                fontFamily, fontSize: fontSizes.md.value
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: fontSizes.sm.value, fontWeight: typography.weights.medium.value }}>
              End Date
            </label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%", padding: "8px", borderRadius: radii.sm.value, border: `1px solid ${borderColor}`,
                fontFamily, fontSize: fontSizes.md.value
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: fontSizes.sm.value, fontWeight: typography.weights.medium.value }}>
              Actor ID
            </label>
            <input 
              type="text" 
              placeholder="e.g. supplier-123 or Ed25519 public key..."
              value={actorId}
              onChange={(e) => setActorId(e.target.value)}
              style={{
                width: "100%", padding: "8px", borderRadius: radii.sm.value, border: `1px solid ${borderColor}`,
                fontFamily, fontSize: fontSizes.md.value
              }}
            />
          </div>
        </div>

        <hr style={{ margin: `${spacing.scale.value[4]}px 0`, borderTop: `1px solid ${borderColor}`, borderBottom: "none" }} />

        <ExportButtons startDate={startDate} endDate={endDate} actorId={actorId} />
      </div>
    </div>
  );
}
