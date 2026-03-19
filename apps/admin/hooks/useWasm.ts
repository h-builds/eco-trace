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
  isEngineReady: boolean;
  error: string | null;
  calculateFootprint: (entries: ESGEntry[]) => WasmFootprintResult;
  verifyIntegrity: (event: any, signature: string, publicKey: string) => WasmIntegrityResult;
}

const NOOP_RESULT: WasmFootprintResult = { result: 0, error: "Engine not ready" };
const NOOP_INTEGRITY: WasmIntegrityResult = { status: "PENDING", error: "Engine registry initializing" };

export function useWasm(): UseWasmReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWasmInit()
      .then(() => {
        setIsEngineReady(true);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const calculateFootprint = (entries: ESGEntry[]): WasmFootprintResult => {
    if (!isEngineReady || typeof window.calculateFootprint !== "function") {
      return NOOP_RESULT;
    }
    return window.calculateFootprint(entries);
  };

  const verifyIntegrity = (event: any, signature: string, publicKey: string): WasmIntegrityResult => {
    if (!isEngineReady || typeof window.verifyIntegrity !== "function") {
      return NOOP_INTEGRITY;
    }
    return window.verifyIntegrity(event, signature, publicKey);
  };

  return { isLoading, isEngineReady, error, calculateFootprint, verifyIntegrity };
}
