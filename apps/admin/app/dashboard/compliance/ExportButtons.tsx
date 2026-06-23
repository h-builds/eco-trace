"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { tokens } from "@eco-trace/ui";

interface ExportButtonsProps {
  startDate: string;
  endDate: string;
  actorId: string;
}

interface ExportEvent {
  id: string;
  event_id: string;
  asset_id: string;
  actor_id: string;
  timestamp: string;
  action_type: string;
  energy_kwh: number;
  emission_factor: number;
  signature: string;
  public_key: string;
  integrity_status: string;
}

export function ExportButtons({ startDate, endDate, actorId }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { colors, typography, radii, spacing } = tokens.tokens;
  const btnColor = colors.brand["verification-green"].value;
  const textColor = "#FFFFFF";

  const buildQueryString = (format: string) => {
    const params = new URLSearchParams({ format });
    if (startDate) params.append("startDate", new Date(startDate).toISOString());
    if (endDate) params.append("endDate", new Date(endDate).toISOString());
    if (actorId) params.append("actorId", actorId);
    return params.toString();
  };

  const handleExportCSV = () => {
    window.location.href = `/api/compliance/export?${buildQueryString("csv")}`;
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      setErrorMsg(null);

      const res = await fetch(`/api/compliance/export?${buildQueryString("json")}`);
      if (!res.ok) throw new Error("Failed to fetch compliance data for PDF.");
      const data = await res.json();

      if (!data || data.length === 0) {
        setErrorMsg("No records found for the selected criteria.");
        setIsExporting(false);
        return;
      }

      const doc = new jsPDF("landscape");

      doc.setFontSize(18);
      doc.text("Eco-Trace: Compliance Report & Audit Trail", 14, 22);

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      
      let filterText = "Filters Applied: ";
      const filters = [];
      if (startDate) filters.push(`From: ${new Date(startDate).toLocaleDateString()}`);
      if (endDate) filters.push(`To: ${new Date(endDate).toLocaleDateString()}`);
      if (actorId) filters.push(`Actor: ${actorId}`);
      if (filters.length === 0) filters.push("None (All Data)");
      filterText += filters.join(" | ");
      doc.text(filterText, 14, 36);

      const tableColumn = ["Event ID", "Timestamp", "Actor ID", "Action", "Energy (kWh)", "Emission (kgCO2e/kWh)", "Integrity Status", "Signature (Trunc)"];
      const tableRows = data.map((row: ExportEvent) => [
        row.event_id,
        new Date(row.timestamp).toLocaleString(),
        row.actor_id.substring(0, 8) + "...",
        row.action_type,
        row.energy_kwh.toString(),
        row.emission_factor.toString(),
        row.integrity_status,
        row.signature ? row.signature.substring(0, 16) + "..." : "N/A"
      ]);

      autoTable(doc, {
        startY: 42,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [40, 122, 51] },
        didParseCell: function (data) {
          if (data.section === 'body' && data.column.index === 6) {
             const status = data.cell.raw;
             if (status === 'VALID') {
                data.cell.styles.textColor = [40, 122, 51];
             } else if (status === 'INVALID') {
                data.cell.styles.textColor = [211, 47, 47];
             } else {
                data.cell.styles.textColor = [245, 124, 0];
             }
          }
        }
      });

      doc.save("compliance_audit_trail.pdf");
      setIsExporting(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to generate local PDF from API data.");
      setIsExporting(false);
    }
  };

  const buttonStyle = {
    padding: `${spacing.scale.value[2]}px ${spacing.scale.value[4]}px`,
    backgroundColor: btnColor,
    color: textColor,
    border: "none",
    borderRadius: radii.md.value,
    fontWeight: typography.weights.bold.value,
    cursor: isExporting ? "not-allowed" : "pointer",
    opacity: isExporting ? 0.7 : 1,
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <button onClick={handleExportCSV} style={buttonStyle} disabled={isExporting}>
          Export as CSV
        </button>
        <button onClick={handleExportPDF} style={buttonStyle} disabled={isExporting}>
          {isExporting ? "Generating PDF..." : "Export as PDF"}
        </button>
      </div>
      {errorMsg && (
        <div style={{ marginTop: "12px", color: colors.functional.alert.value }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
