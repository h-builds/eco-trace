import { getRequestContext } from "@cloudflare/next-on-pages";
import { cookies } from "next/headers";
import { Logger } from "./logger";

export interface KVNamespace {
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}

interface Env {
  SESSION_KV: KVNamespace;
}

export type Role = "ADMIN" | "AUDITOR" | "VIEWER";

export interface SessionData {
  sessionId: string;
  userId: string;
  username: string;
  role: Role;
  expiresAt: number;
}

const SESSION_COOKIE_NAME = "eco_trace_session";
const SESSION_TTL = 60 * 60 * 24;

export async function createSession(userId: string, username: string, role: Role) {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + SESSION_TTL * 1000;
  
  const sessionData: SessionData = {
    sessionId,
    userId,
    username,
    role,
    expiresAt,
  };

  const kv = (getRequestContext().env as unknown as Env).SESSION_KV;
  if (!kv) throw new Error("SESSION_KV binding not found");

  await kv.put(sessionId, JSON.stringify(sessionData), { expirationTtl: SESSION_TTL });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL,
    path: "/",
  });

  return sessionData;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  try {
    const kv = (getRequestContext().env as unknown as Env).SESSION_KV;
    if (!kv) return null;
    
    const sessionStr = await kv.get(sessionId);
    if (!sessionStr) return null;

    const sessionData = JSON.parse(sessionStr) as SessionData;
    
    if (Date.now() > sessionData.expiresAt) {
      await kv.delete(sessionId);
      cookieStore.delete(SESSION_COOKIE_NAME);
      return null;
    }

    return sessionData;
  } catch (err) {
    Logger.error("getSession failed to read from KV or parse JSON", err);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    const kv = (getRequestContext().env as unknown as Env).SESSION_KV;
    if (kv) {
      await kv.delete(sessionId);
    }
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}
