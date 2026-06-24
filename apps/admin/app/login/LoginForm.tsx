"use client";

import { useActionState, useState } from "react";
import { loginAction } from "../lib/auth-actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoFill = () => {
    setUsername("auditor");
    setPassword("demo2026");
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={handleDemoFill}
        className="p-3 bg-surface-canvas border border-surface-border text-brand-deep-charcoal rounded-md text-sm font-medium hover:bg-surface-border transition-colors w-full text-left"
      >
        <span className="block font-bold">Use Demo Auditor</span>
        <span className="block text-xs text-functional-neutral font-normal mt-1">Fills credentials without auto-submitting</span>
      </button>

      <form action={formAction} className="flex flex-col gap-4 mt-2">
        {state?.error && (
          <div className="p-3 bg-functional-alert text-white rounded-md text-sm font-medium">
            {state.error}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-brand-deep-charcoal">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-surface-border rounded-md bg-surface-canvas focus:outline-none focus:ring-2 focus:ring-brand-integrity-green transition-shadow w-full"
            placeholder="e.g. admin"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-brand-deep-charcoal">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-surface-border rounded-md bg-surface-canvas focus:outline-none focus:ring-2 focus:ring-brand-integrity-green transition-shadow w-full"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 p-3 bg-brand-integrity-green text-brand-deep-charcoal font-bold rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity w-full"
        >
          {isPending ? "Authenticating..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
