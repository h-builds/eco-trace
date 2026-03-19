// Wasm bridge globals injected by engine.wasm (packages/engine/main.go L16–L17).
interface WasmFootprintResult {
  result: number;
  error: string | null;
}

interface WasmIntegrityResult {
  status: "VALID" | "INVALID" | "UNAUTHORIZED_ACTOR";
  error: string | null;
}

interface EcoTraceGlobals {
  getEngineVersion: () => string;
  calculateFootprint: (
    entries: Array<{ energy_kwh: number; emission_factor: number }>
  ) => WasmFootprintResult;
  verifyIntegrity: (
    event: any,
    signature: string,
    publicKey: string
  ) => WasmIntegrityResult;
  registerTrustedActor: (
    actorId: string,
    publicKey: string
  ) => void;
}

declare global {
  interface Window extends EcoTraceGlobals {}
  // wasm_exec.js injects the Go constructor on globalThis.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var Go: any;
}

export type { WasmFootprintResult, WasmIntegrityResult, EcoTraceGlobals };
