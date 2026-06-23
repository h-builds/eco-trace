"use client";

import { useActionState } from "react";
import { loginAction } from "../lib/auth-actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
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
  );
}
