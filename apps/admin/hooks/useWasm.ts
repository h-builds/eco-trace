"use client";

import { useEffect, useState } from "react";
import { getWasmInit } from "@/lib/wasmLoader";
import type { WasmFootprintResult, WasmIntegrityResult } from "@/lib/wasm.d";

interface ESGEntry {
  energy_kwh: number;
  emission_factor: number;
}

interface UseWasmReturn {
  isLoading: boolean;
  error: string | null;
  calculateFootprint: (entries: ESGEntry[]) => WasmFootprintResult;
  verifyIntegrity: (event: any, signature: string, publicKey: string) => WasmIntegrityResult;
  registerTrustedActor: (actorId: string, publicKey: string) => void;
}

const NOOP_RESULT: WasmFootprintResult = { result: 0, error: "Engine not ready" };
const NOOP_INTEGRITY: WasmIntegrityResult = { status: "INVALID", error: "Engine not ready" };

export function useWasm(): UseWasmReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWasmInit()
      .then(() => setIsLoading(false))
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Proxies the Go global (main.go L17) with a safe guard.
  const calculateFootprint = (entries: ESGEntry[]): WasmFootprintResult => {
    if (typeof window.calculateFootprint !== "function") {
      return NOOP_RESULT;
    }
    return window.calculateFootprint(entries);
  };

  const verifyIntegrity = (event: any, signature: string, publicKey: string): WasmIntegrityResult => {
    if (typeof window.verifyIntegrity !== "function") {
      return NOOP_INTEGRITY;
    }
    return window.verifyIntegrity(event, signature, publicKey);
  };

  const registerTrustedActor = (actorId: string, publicKey: string): void => {
    if (typeof window.registerTrustedActor === "function") {
      window.registerTrustedActor(actorId, publicKey);
    }
  };

  return { isLoading, error, calculateFootprint, verifyIntegrity, registerTrustedActor };
}
