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
      return NextResponse.json({ error: "Database binding 'DB' not found in environment." }, { status: 500 });
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
      const headers = [
        "id", "event_id", "asset_id", "actor_id", "public_key", 
        "timestamp", "action_type", "energy_kwh", "emission_factor", 
        "signature", "integrity_status"
      ];
      
      const csvRows = [headers.join(",")];
      
      for (const row of results) {
        const values = headers.map(header => {
          const val = row[header as keyof DBRow];
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
      energy_kwh: row.energy_kwh,
      emission_factor: row.emission_factor,
      signature: row.signature,
      public_key: row.public_key,
      integrity_status: row.integrity_status
    }));
    
    return NextResponse.json(events);
  } catch (error) {
    Logger.error("Failed to generate compliance export", error);
    return NextResponse.json({ error: "Failed to generate compliance export securely" }, { status: 500 });
  }
}
