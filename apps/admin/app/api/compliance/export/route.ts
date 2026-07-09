import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Logger } from "../../../lib/logger";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Result<T = unknown> {
  success: boolean;
  results: T[];
}

interface DBRow {
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

interface Env {
  DB: D1Database;
}

export async function GET(request: NextRequest) {
  try {
    const db = (getRequestContext().env as unknown as Env).DB; 
    
    if (!db) {
      Logger.error("Database binding 'DB' not found in environment.");
      return NextResponse.json({ error: "Service Unavailable: Database binding missing. Please check your environment configuration." }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const actorId = searchParams.get("actorId");

    let query = "SELECT * FROM events WHERE 1=1";
    const params: unknown[] = [];

    if (startDate) {
      query += " AND timestamp >= ?";
      params.push(startDate);
    }
    if (endDate) {
      query += " AND timestamp <= ?";
      params.push(endDate);
    }
    if (actorId) {
      query += " AND actor_id = ?";
      params.push(actorId);
    }

    query += " ORDER BY timestamp DESC";

    let stmt = db.prepare(query);
    if (params.length > 0) stmt = stmt.bind(...params);
    const { results } = await stmt.all<DBRow>();

    if (format === "csv") {
      const csvColumns = [
        { header: "id", getValue: (row: DBRow) => row.id },
        { header: "event_id", getValue: (row: DBRow) => row.event_id },
        { header: "asset_id", getValue: (row: DBRow) => row.asset_id },
        { header: "actor_id", getValue: (row: DBRow) => row.actor_id },
        { header: "public_key", getValue: (row: DBRow) => row.public_key },
        { header: "timestamp", getValue: (row: DBRow) => row.timestamp },
        { header: "action_type", getValue: (row: DBRow) => row.action_type },
        { header: "energy_kwh", getValue: (row: DBRow) => row.energy_kwh },
        { header: "emission_factor", getValue: (row: DBRow) => row.emission_factor },
        { header: "signature", getValue: (row: DBRow) => row.signature },
        { header: "integrity_status", getValue: (row: DBRow) => row.integrity_status },
      ];

      const csvRows = [csvColumns.map(column => column.header).join(",")];

      for (const row of results) {
        const values = csvColumns.map(column => {
          const val = column.getValue(row);
          if (val === null || val === undefined) return '""';
          const strVal = String(val);
          if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
            return `"${strVal.replace(/"/g, '""')}"`;
          }
          return strVal;
        });
        csvRows.push(values.join(","));
      }

      const csvContent = csvRows.join("\n");
      
      const response = new NextResponse(csvContent);
      response.headers.set('Content-Type', 'text/csv');
      response.headers.set('Content-Disposition', 'attachment; filename="compliance_export.csv"');
      return response;
    }

    const events = results.map(row => ({
      id: row.id,
      event_id: row.event_id,
      asset_id: row.asset_id,
      actor_id: row.actor_id,
      timestamp: row.timestamp,
      action_type: row.action_type,
      esg_metadata: {
        energy_kwh: row.energy_kwh,
        emission_factor: row.emission_factor,
      },
      signature: row.signature,
      public_key: row.public_key,
      integrity_status: row.integrity_status
    }));
    
    return NextResponse.json(events);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    Logger.error(`Failed to generate compliance export: ${errorMessage}`, error);
    return NextResponse.json({ error: `Failed to generate compliance export: ${errorMessage}` }, { status: 500 });
  }
}
