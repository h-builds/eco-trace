"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { Logger } from "../../lib/logger";
import { getSession } from "../../lib/session";

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

export async function addTrustedActor(formData: FormData) {
  const db = (getRequestContext().env as unknown as Env).DB;
  const name = formData.get("name")?.toString();
  const public_key = formData.get("public_key")?.toString();

  if (!name || !public_key) {
    throw new Error("Name and Public Key are required");
  }

  // Basic Ed25519 hex format validation (64 hex characters)
  if (!/^[0-9a-f]{64}$/i.test(public_key)) {
    throw new Error("Invalid Ed25519 public key format. Must be 64 hex characters.");
  }

  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: Session is required to add an actor.");
  }

  const id = crypto.randomUUID();
  const actorId = session.userId;
  try {
    await db.prepare(
      "INSERT INTO trusted_actors (id, name, public_key, status) VALUES (?, ?, ?, 'ACTIVE')"
    ).bind(id, name, public_key).run();

    await db.prepare(
      "INSERT INTO audit_logs (id, actor_id, action, timestamp, details) VALUES (?, ?, 'CREATE_ACTOR', ?, ?)"
    ).bind(
      crypto.randomUUID(),
      actorId,
      new Date().toISOString(),
      `Added trusted actor: ${name}`
    ).run();

    return { success: true };
  } catch (error) {
    Logger.error("Failed to add trusted actor", error);
    throw new Error("Failed to add trusted actor");
  }
}

export async function registerAsset(formData: FormData) {
  const db = (getRequestContext().env as unknown as Env).DB;
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString() || "";
  const owner_id = formData.get("owner_id")?.toString();

  if (!name || !owner_id) {
    throw new Error("Name and Owner ID are required");
  }

  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: Session is required to register an asset.");
  }

  const id = "ASSET-" + crypto.randomUUID().slice(0, 8).toUpperCase();
  const actorId = session.userId;
  try {
    await db.prepare(
      "INSERT INTO assets (id, name, description, owner_id) VALUES (?, ?, ?, ?)"
    ).bind(id, name, description, owner_id).run();

    await db.prepare(
      "INSERT INTO audit_logs (id, actor_id, action, timestamp, details) VALUES (?, ?, 'REGISTER_ASSET', ?, ?)"
    ).bind(
      crypto.randomUUID(),
      actorId,
      new Date().toISOString(),
      `Registered asset: ${name} (${id})`
    ).run();

    return { success: true };
  } catch (error) {
    Logger.error("Failed to register asset", error);
    throw new Error("Failed to register asset");
  }
}
