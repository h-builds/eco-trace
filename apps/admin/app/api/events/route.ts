import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Result<T = unknown> {
  success: boolean;
  results: T[];
}

interface DBRow {
  id: string;
  asset_id: string;
  actor_id: string;
  timestamp: string;
  action_type: string;
  energy_kwh: number;
  emission_factor: number;
  signature: string;
  integrity_status: string;
}

interface Env {
  DB: D1Database;
}

export async function GET(request: NextRequest) {
  try {
    const db = (process.env as unknown as Env).DB; 
    
    if (!db) {
      return NextResponse.json({ error: "Database binding 'DB' not found in environment." }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");

    let query = "SELECT * FROM events";
    const params: unknown[] = [];

    if (statusParam === "alerts") {
      query += " WHERE integrity_status IN ('INVALID', 'UNAUTHORIZED')";
    } else if (statusParam === "INVALID" || statusParam === "UNAUTHORIZED") {
      query += " WHERE integrity_status = ?";
      params.push(statusParam);
    }

    query += " ORDER BY timestamp DESC LIMIT 50";

    let stmt = db.prepare(query);
    if (params.length > 0) stmt = stmt.bind(...params);
    const { results } = await stmt.all<DBRow>();

    const formattedResults = results.map((row: DBRow) => ({
      id: row.id,
      actor: row.actor_id,
      action: row.action_type,
      energyKwh: row.energy_kwh,
      emissionFactor: row.emission_factor,
      status: row.integrity_status,
      signature: row.signature,
      publicKey: row.actor_id,
      event_id: row.id,
      asset_id: row.asset_id,
      actor_id: row.actor_id,
      timestamp: row.timestamp,
      action_type: row.action_type,
    }));
    
    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("D1 GET /api/events error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = (process.env as unknown as Env).DB;
    if (!db) {
      return NextResponse.json({ error: "Database binding 'DB' not found in environment." }, { status: 500 });
    }

    const payload = await request.json();
    
    const requiredFields = [
      "id", "asset_id", "actor_id", "timestamp", 
      "action_type", "energy_kwh", "emission_factor", 
      "signature", "integrity_status"
    ];
    
    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const { success } = await db.prepare(
      `INSERT INTO events (
        id, asset_id, actor_id, timestamp, action_type, 
        energy_kwh, emission_factor, signature, integrity_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      payload.id,
      payload.asset_id,
      payload.actor_id,
      payload.timestamp,
      payload.action_type,
      payload.energy_kwh,
      payload.emission_factor,
      payload.signature,
      payload.integrity_status
    ).run();

    if (success) {
      return NextResponse.json({ success: true, id: payload.id }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Database rejected the insertion." }, { status: 500 });
    }
  } catch (error) {
    console.error("D1 POST /api/events error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
