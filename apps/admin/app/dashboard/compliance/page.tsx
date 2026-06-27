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
  const infoBg = "rgba(40, 122, 51, 0.1)";
  const infoBorder = "rgba(40, 122, 51, 0.2)";
  const infoText = colors.brand["verification-green"].value;

  const fontSizes = typography.sizes;
  const fontFamily = typography["font-family"].value;

  const applyDemoPreset = () => {
    setStartDate("2026-01-01");
    setEndDate("2026-12-31");
    setActorId("");
  };

  return (
    <div className="bg-surface-canvas min-h-screen p-8 font-sans text-brand-deep-charcoal">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        Compliance Export
        <span className="text-[10px] uppercase tracking-wider bg-functional-pending/10 text-functional-pending border border-functional-pending/20 px-2 py-0.5 rounded">
          {DemoScenario.demoDataLabel}
        </span>
      </h1>
      <p className="text-functional-neutral mb-8">
        Generate audit evidence from verified event history without mutating trusted values.
      </p>

      <div className="bg-surface-card p-6 rounded-md border border-surface-border shadow-subtle max-w-[600px]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">
            Report Filters
          </h2>
          <button 
            onClick={applyDemoPreset}
            className="px-2 py-1 bg-brand-verification-green/10 text-brand-verification-green border border-brand-verification-green/20 rounded-sm text-sm cursor-pointer font-medium hover:bg-brand-verification-green/20 focus:outline-none focus:ring-2 focus:ring-brand-verification-green transition-colors"
          >
            Recommended demo export
          </button>
        </div>
        <p className="text-sm text-functional-neutral mb-6">
          The demo scenario preselects the canonical product journey.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Start Date
            </label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 rounded-sm border border-surface-border font-sans text-base focus:outline-none focus:ring-2 focus:ring-brand-integrity-green focus:border-brand-integrity-green transition-colors"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              End Date
            </label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 rounded-sm border border-surface-border font-sans text-base focus:outline-none focus:ring-2 focus:ring-brand-integrity-green focus:border-brand-integrity-green transition-colors"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Actor ID
            </label>
            <input 
              type="text" 
              placeholder="e.g. supplier-123 or Ed25519 public key..."
              value={actorId}
              onChange={(e) => setActorId(e.target.value)}
              className="w-full p-2 rounded-sm border border-surface-border font-sans text-base focus:outline-none focus:ring-2 focus:ring-brand-integrity-green focus:border-brand-integrity-green transition-colors"
            />
          </div>
        </div>

        <hr className="my-6 border-t border-surface-border border-b-0" />

        <ExportButtons startDate={startDate} endDate={endDate} actorId={actorId} />
      </div>
    </div>
  );
}
