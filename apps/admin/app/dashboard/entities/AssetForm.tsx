"use client";

import { useActionState } from "react";
import { registerAsset } from "./actions";

export type ActionState = { success: boolean; message?: string } | null;

export default function AssetForm({ actors }: { actors: { id: string, name: string }[] }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
      try {
        await registerAsset(formData);
        return { success: true, message: "Asset registered successfully" };
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "An error occurred";
        return { success: false, message };
      }
    },
    null
  );

  return (
    <div className="bg-[#1A1C1E] p-6 rounded-lg shadow-elevation-1 border border-[#607D8B]/20">
      <h3 className="text-xl font-medium text-white mb-2">Register New Asset</h3>
      <p className="text-xs text-[#607D8B] mb-4">
        Changes affect the demo database only. This asset will be tracked in the local D1 instance.
      </p>
      {state?.message && (
        <div className={`p-3 mb-4 rounded text-sm ${state.success ? 'bg-[#287A33]/20 text-[#8ED5B4]' : 'bg-[#D32F2F]/20 text-[#D32F2F]'}`}>
          {state.message}
        </div>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#607D8B] mb-1">Asset Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-transparent border border-[#607D8B]/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#8ED5B4] transition-colors"
            placeholder="e.g., Raw Aluminum Batch"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#607D8B] mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            className="w-full bg-transparent border border-[#607D8B]/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#8ED5B4] transition-colors"
            placeholder="Optional details..."
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="owner_id" className="block text-sm font-medium text-[#607D8B] mb-1">Owner (Trusted Actor)</label>
          <select
            id="owner_id"
            name="owner_id"
            required
            className="w-full bg-[#1A1C1E] border border-[#607D8B]/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#8ED5B4] transition-colors"
          >
            <option value="">Select an owner...</option>
            {actors.map(actor => (
              <option key={actor.id} value={actor.id}>{actor.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#8ED5B4] text-[#1A1C1E] font-medium py-2 px-4 rounded-md hover:bg-[#8ED5B4]/90 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Registering..." : "Register Asset"}
        </button>
      </form>
    </div>
  );
}
