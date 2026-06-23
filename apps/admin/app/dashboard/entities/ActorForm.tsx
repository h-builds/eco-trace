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
    <div className="bg-[#1A1C1E] p-6 rounded-lg shadow-elevation-1 border border-[#607D8B]/20">
      <h3 className="text-xl font-medium text-white mb-4">Add Trusted Actor</h3>
      {state?.message && (
        <div className={`p-3 mb-4 rounded text-sm ${state.success ? 'bg-[#287A33]/20 text-[#8ED5B4]' : 'bg-[#D32F2F]/20 text-[#D32F2F]'}`}>
          {state.message}
        </div>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#607D8B] mb-1">Actor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-transparent border border-[#607D8B]/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#8ED5B4] transition-colors"
            placeholder="e.g., Supplier A"
          />
        </div>
        <div>
          <label htmlFor="public_key" className="block text-sm font-medium text-[#607D8B] mb-1">Ed25519 Public Key (Hex)</label>
          <input
            type="text"
            id="public_key"
            name="public_key"
            required
            pattern="^[0-9a-fA-F]{64}$"
            title="Must be exactly 64 hexadecimal characters"
            className="w-full bg-transparent border border-[#607D8B]/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#8ED5B4] transition-colors font-mono text-sm"
            placeholder="e.g., 6706a403489a767a61d425b8260f1f48..."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#8ED5B4] text-[#1A1C1E] font-medium py-2 px-4 rounded-md hover:bg-[#8ED5B4]/90 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Adding..." : "Add Actor"}
        </button>
      </form>
    </div>
  );
}
