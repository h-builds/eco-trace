import React from "react";

export function IntegrityLegend() {
  return (
    <div className="flex gap-6 mb-6 items-stretch">
      <div className="bg-surface-card border border-surface-border p-6 rounded-md flex-1">
        <h3 className="text-base font-bold mb-2">Ed25519 Integrity Verification</h3>
        <p className="text-sm text-functional-neutral leading-relaxed max-w-2xl">
          Event payloads are cryptographically signed at origin using Ed25519 (a fast, secure public-key signature system). This workstation runs a local Go/Wasm engine to recalculate hashes, verify signatures, and check actors against the trusted registry in real-time. Any manipulation breaks the mathematical proof.
        </p>
      </div>

      <div className="bg-surface-card border border-surface-border p-6 rounded-md flex flex-col gap-2 min-w-[200px]">
        <h3 className="text-sm font-bold text-functional-neutral uppercase tracking-wider">Integrity Status Legend</h3>
        <p className="text-[11px] text-functional-neutral mb-1">
          The Integrity Status indicates whether an event's cryptographic signature and actor authorization are valid.
        </p>
        <div className="flex gap-2 flex-wrap">
          {(["VALID", "WARNING", "INVALID", "UNAUTHORIZED"] as const).map((status) => {
            const bgClass = status === "VALID" ? "bg-brand-verification-green" : status === "INVALID" ? "bg-functional-alert" : "bg-functional-pending";
            return (
              <span key={status} className={`inline-block px-2 py-1 rounded-full ${bgClass} text-white text-xs font-bold`}>
                {status}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
