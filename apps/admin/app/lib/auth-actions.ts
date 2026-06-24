"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { createSession, deleteSession, getSession, type Role } from "./session";
import { Logger } from "./logger";
import { redirect } from "next/navigation";

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<void>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface Env {
  DB: D1Database;
}

export interface AuthState {
  error?: string;
}

interface UserRow {
  id: string;
  username: string;
  role: Role;
  password_hash: string;
}

export async function loginAction(state: AuthState | null, formData: FormData): Promise<AuthState> {
  const usernameEntry = formData.get("username");
  const passwordEntry = formData.get("password");

  if (typeof usernameEntry !== "string" || typeof passwordEntry !== "string") {
    return { error: "Invalid input format." };
  }

  const username = usernameEntry.trim();
  const password = passwordEntry;

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const db = (getRequestContext().env as unknown as Env).DB;
  if (!db) {
    return { error: "Database unavailable." };
  }

  try {
    const { results } = await db.prepare(
      "SELECT id, username, role, password_hash FROM users WHERE username = ?"
    ).bind(username).all<UserRow>();

    if (!results || results.length === 0) {
      return { error: "Invalid credentials." };
    }

    const rawUser = results[0];
    const user: UserRow = {
      id: String(rawUser.id),
      username: String(rawUser.username),
      role: rawUser.role as Role,
      password_hash: String(rawUser.password_hash)
    };
    
    // In a real app, use bcrypt/argon2 to verify hash.
    // For this local/Edge demo based on seed.sql, we match plaintext.
    if (user.password_hash !== password) {
      return { error: "Invalid credentials." };
    }

    await createSession(user.id, user.username, user.role);

    await db.prepare(
      "INSERT INTO audit_logs (id, actor_id, action, timestamp, details) VALUES (?, ?, ?, ?, ?)"
    ).bind(
      crypto.randomUUID(),
      user.id,
      "LOGIN",
      new Date().toISOString(),
      `Successful login by ${user.username} (${user.role})`
    ).run();

  } catch (err) {
    Logger.error("Authentication operation failed during login", err);
    return { error: "Authentication service unavailable. Please try again." };
  }

  redirect("/dashboard/overview");
}

export async function logoutAction() {
  const session = await getSession();
  if (session) {
    const db = (getRequestContext().env as unknown as Env).DB;
    try {
      if (db) {
        await db.prepare(
          "INSERT INTO audit_logs (id, actor_id, action, timestamp, details) VALUES (?, ?, ?, ?, ?)"
        ).bind(
          crypto.randomUUID(),
          session.userId,
          "LOGOUT",
          new Date().toISOString(),
          `Logout by ${session.username} (${session.role})`
        ).run();
      }
    } catch (err) {
      Logger.error("Database operation failed during logout audit log", err);
      // We don't block the logout if the audit log fails, but we ensure it's logged securely.
    }
  }

  try {
    await deleteSession();
  } catch (err) {
    Logger.error("Failed to delete session during logout", err);
  }

  redirect("/login");
}
