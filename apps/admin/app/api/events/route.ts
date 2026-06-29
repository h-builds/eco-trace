import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Logger } from "../../lib/logger";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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

interface EventCreateDTO {
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

export async function GET(request: NextRequest) {
  try {
    const db = (getRequestContext().env as unknown as Env).DB; 
    
    if (!db) {
      Logger.error("Database binding 'DB' not found in environment.");
      return NextResponse.json({ error: "Service Unavailable: Database binding missing. Please check your environment configuration." }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const assetIdParam = searchParams.get("asset_id");

    let query = "SELECT * FROM events";
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (statusParam === "alerts") {
      conditions.push("integrity_status IN ('INVALID', 'UNAUTHORIZED')");
    } else if (statusParam === "INVALID" || statusParam === "UNAUTHORIZED") {
      conditions.push("integrity_status = ?");
      params.push(statusParam);
    }

    if (assetIdParam) {
      conditions.push("asset_id = ?");
      params.push(assetIdParam);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY timestamp DESC LIMIT 50";

    let stmt = db.prepare(query);
    if (params.length > 0) stmt = stmt.bind(...params);
    const { results } = await stmt.all<DBRow>();

    const events = results.map(row => ({
      id: row.id,
      event_id: row.event_id,
      asset_id: row.asset_id,
      actor_id: row.actor_id,
      timestamp: row.timestamp,
      action_type: row.action_type,
      actor: row.actor_id,
      action: row.action_type,
      energyKwh: row.energy_kwh,
      emissionFactor: row.emission_factor,
      status: row.integrity_status,
      signature: row.signature,
      publicKey: row.public_key,
    }));
    
    if (assetIdParam && events.length === 0) {
      return NextResponse.json({ error: "Asset not found in the global ledger." }, { status: 404 });
    }
    
    return NextResponse.json(events);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    Logger.error(`D1 GET /api/events error: ${errorMessage}`, error);
    return NextResponse.json({ error: `Failed to fetch events: ${errorMessage}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = (getRequestContext().env as unknown as Env).DB;
    if (!db) {
      Logger.error("Database binding 'DB' not found in environment.");
      return NextResponse.json({ error: "Service Unavailable: Database binding missing. Please check your environment configuration." }, { status: 500 });
    }

    const rawPayload = (await request.json()) as Partial<EventCreateDTO>;
    
    const requiredFields: (keyof EventCreateDTO)[] = [
      "id", "event_id", "asset_id", "actor_id", "timestamp", 
      "action_type", "energy_kwh", "emission_factor", 
      "signature", "public_key", "integrity_status"
    ];
    
    for (const field of requiredFields) {
      if (rawPayload[field] === undefined || rawPayload[field] === null) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const payload = rawPayload as EventCreateDTO;

    const { success } = await db.prepare(
      `INSERT INTO events (
        id, event_id, asset_id, actor_id, timestamp, action_type, 
        energy_kwh, emission_factor, signature, public_key, integrity_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      payload.id,
      payload.event_id,
      payload.asset_id,
      payload.actor_id,
      payload.timestamp,
      payload.action_type,
      payload.energy_kwh,
      payload.emission_factor,
      payload.signature,
      payload.public_key,
      payload.integrity_status
    ).run();

    if (success) {
      return NextResponse.json({ success: true, id: payload.id }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Database rejected the insertion." }, { status: 500 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    Logger.error(`D1 POST /api/events error: ${errorMessage}`, error);
    return NextResponse.json({ error: `Failed to create event: ${errorMessage}` }, { status: 500 });
  }
}
