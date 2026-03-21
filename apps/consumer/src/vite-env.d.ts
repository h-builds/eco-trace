/// <reference types="vite/client" />

declare var Go: new () => { importObject: WebAssembly.Imports; run: (instance: WebAssembly.Instance) => void };
declare var __ecotraceOnReady: (() => void) | undefined;

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

declare var calculateFootprint: ((entries: Array<{ energy_kwh: number; emission_factor: number }>) => WasmFootprintResult) | undefined;
declare var verifyIntegrity: ((event: Record<string, unknown>, signature: string, publicKey: string) => WasmIntegrityResult) | undefined;
