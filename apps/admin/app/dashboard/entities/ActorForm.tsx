"use client";

import { useActionState } from "react";
import { addTrustedActor } from "./actions";

export type ActionState = { success: boolean; message?: string } | null;

export default function ActorForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
      try {
        await addTrustedActor(formData);
        return { success: true, message: "Trusted actor added successfully" };
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "An error occurred";
        return { success: false, message };
      }
    },
    null
  );

  return (
    <div className="bg-brand-deep-charcoal p-6 rounded-lg shadow-elevation-1 border border-functional-neutral/20">
      <h3 className="text-xl font-medium text-white mb-2">Add Trusted Actor</h3>
      <p className="text-xs text-functional-neutral mb-4">
        Changes affect the seeded demo database only. New actors will be available for test event registration.
      </p>
      {state?.message && (
        <div className={`p-3 mb-4 rounded text-sm ${state.success ? 'bg-brand-verification-green/20 text-brand-integrity-green' : 'bg-functional-alert/20 text-functional-alert'}`}>
          {state.message}
        </div>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-functional-neutral mb-1">Actor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-transparent border border-functional-neutral/50 rounded-md py-2 px-3 text-surface-card focus:outline-none focus:ring-2 focus:ring-brand-integrity-green focus:border-brand-integrity-green transition-colors"
            placeholder="e.g., Supplier A"
          />
        </div>
        <div>
          <label htmlFor="public_key" className="block text-sm font-medium text-functional-neutral mb-1">Ed25519 Public Key (Hex)</label>
          <input
            type="text"
            id="public_key"
            name="public_key"
            required
            pattern="^[0-9a-fA-F]{64}$"
            title="Must be exactly 64 hexadecimal characters"
            className="w-full bg-transparent border border-functional-neutral/50 rounded-md py-2 px-3 text-surface-card focus:outline-none focus:ring-2 focus:ring-brand-integrity-green focus:border-brand-integrity-green transition-colors font-mono text-sm"
            placeholder="e.g., 6706a403489a767a61d425b8260f1f48..."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand-integrity-green text-brand-deep-charcoal font-medium py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-integrity-green focus:ring-offset-2 focus:ring-offset-brand-deep-charcoal transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Adding..." : "Add Actor"}
        </button>
      </form>
    </div>
  );
}
