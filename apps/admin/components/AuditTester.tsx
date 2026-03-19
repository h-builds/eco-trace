"use client";

import { useState } from "react";
import { useWasm } from "@/hooks/useWasm";

const MOCK_EVENTS = [
  { energy_kwh: 100, emission_factor: 0.5 },
  { energy_kwh: 200, emission_factor: 0.3 },
];

export function AuditTester() {
  const { isLoading, error, calculateFootprint } = useWasm();
  const [result, setResult] = useState<{
    value: number;
    error: string | null;
  } | null>(null);

  const runCalculation = () => {
    const res = calculateFootprint(MOCK_EVENTS);
    setResult({ value: res.result, error: res.error });
  };

  if (error) {
    return <div role="alert" style={{ color: "#EF4444" }}>Engine Error: {error}</div>;
  }

  return (
    <section aria-label="Wasm Audit Tester">
      <h2>CF₍total₎ Calculator</h2>

      <pre aria-label="Mock ESG data">
        {JSON.stringify(MOCK_EVENTS, null, 2)}
      </pre>

      <button
        id="audit-tester-run"
        onClick={runCalculation}
        disabled={isLoading}
      >
        {isLoading ? "Loading Engine…" : "Calculate Footprint"}
      </button>

      {result && (
        <output aria-label="Calculation result">
          {result.error ? (
            <span style={{ color: "#EF4444" }}>Error: {result.error}</span>
          ) : (
            <span>
              CF<sub>total</sub> = <strong>{result.value}</strong> kgCO₂e
            </span>
          )}
        </output>
      )}
    </section>
  );
}
