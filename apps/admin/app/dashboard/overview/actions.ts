"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Result<T = unknown> {
  success: boolean;
  results: T[];
}

interface Env {
  DB: D1Database;
}

export type TimeRange = "7d" | "30d" | "90d" | "YTD";

export interface AggregatedMetrics {
  totalCarbonFootprint: number;
  activeAssets: number;
  verifiedEvents: number;
  integrityViolations: number;
}

import { Logger } from "../../lib/logger";

export async function getAggregatedMetrics(range: TimeRange): Promise<AggregatedMetrics> {
  const db = (getRequestContext().env as unknown as Env).DB;

  if (!db) {
    Logger.error("D1 database binding 'DB' is missing in the environment");
    throw new Error("Internal Service Error: Unable to retrieve metrics");
  }

  let startDate = new Date();
  switch (range) {
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "30d":
      startDate.setDate(startDate.getDate() - 30);
      break;
    case "90d":
      startDate.setDate(startDate.getDate() - 90);
      break;
    case "YTD":
      startDate = new Date(startDate.getFullYear(), 0, 1);
      break;
  }
  const isoStartDate = startDate.toISOString();

  try {
    const cfQuery = await db.prepare(
      "SELECT SUM(energy_kwh * emission_factor) as total FROM events WHERE timestamp >= ?"
    ).bind(isoStartDate).first<{ total: number }>();
    const totalCarbonFootprint = cfQuery?.total || 0;

    const assetsQuery = await db.prepare(
      "SELECT COUNT(DISTINCT asset_id) as count FROM events WHERE timestamp >= ?"
    ).bind(isoStartDate).first<{ count: number }>();
    const activeAssets = assetsQuery?.count || 0;

    const verifiedQuery = await db.prepare(
      "SELECT COUNT(*) as count FROM events WHERE integrity_status = 'VALID' AND timestamp >= ?"
    ).bind(isoStartDate).first<{ count: number }>();
    const verifiedEvents = verifiedQuery?.count || 0;

    const violationsQuery = await db.prepare(
      "SELECT COUNT(*) as count FROM events WHERE integrity_status IN ('INVALID', 'UNAUTHORIZED') AND timestamp >= ?"
    ).bind(isoStartDate).first<{ count: number }>();
    const integrityViolations = violationsQuery?.count || 0;

    return {
      totalCarbonFootprint,
      activeAssets,
      verifiedEvents,
      integrityViolations
    };
  } catch (error) {
    Logger.error("Failed to aggregate metrics from D1", error);
    throw new Error("Internal Service Error: Aggregation failed");
  }
}
