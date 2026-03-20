interface WasmFootprintResult {
  result: number;
  error: string | null;
}

interface WasmIntegrityResult {
  status: "VALID" | "INVALID" | "UNAUTHORIZED" | "PENDING";
  error: string | null;
  signature?: string;
  publicKey?: string;
}

interface EcoTraceGlobals {
  getEngineVersion: () => string;
  calculateFootprint: (
    entries: Array<{ energy_kwh: number; emission_factor: number }>
  ) => WasmFootprintResult;
  verifyIntegrity: (
    event: Record<string, unknown>,
    signature: string,
    publicKey: string
  ) => WasmIntegrityResult;
  generateUntrustedSignature: (
    event: Record<string, unknown>
  ) => WasmIntegrityResult;
  registerTrustedActor: (
    actorId: string,
    publicKey: string
  ) => void;
  // Go engine readiness callback — set by wasmLoader before go.run().
  __ecotraceOnReady?: () => void;
}

declare global {
  interface Window extends EcoTraceGlobals {}
  // wasm_exec.js injects the Go constructor on globalThis.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var Go: any;
}

export type { WasmFootprintResult, WasmIntegrityResult, EcoTraceGlobals };
