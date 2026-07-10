import { useState, useEffect, useTransition, useCallback } from "react";
import { SupplyChainEvent } from "../types";
import { useWasm } from "../../../../hooks/useWasm";

export function useEvents(filter: "ALL" | "INVALID" | "UNAUTHORIZED") {
  const [events, setEvents] = useState<SupplyChainEvent[]>([]);
  const [footprints, setFootprints] = useState<Map<string, number>>(new Map());
  const [validityStatuses, setValidityStatuses] = useState<Map<string, SupplyChainEvent["integrity_status"]>>(new Map());
  
  const { isLoading, isEngineReady, error, calculateFootprint, verifyIntegrity, generateUntrustedSignature } = useWasm();
  const [isPending, startTransition] = useTransition();

  const fetchEvents = useCallback(async () => {
    try {
      const url = filter === "ALL" ? "/api/events" : `/api/events?status=${filter}`;
      const eventResponse = await fetch(url);
      if (!eventResponse.ok) throw new Error("Failed to fetch events from D1");
      const retrievedEvents: SupplyChainEvent[] = await eventResponse.json();
      setEvents(retrievedEvents);
    } catch (err) {
      console.error(err);
    }
  }, [filter]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (isEngineReady && !error && events.length > 0) {
      startTransition(() => {
        const newFootprints = new Map<string, number>();
        const newStatuses = new Map<string, SupplyChainEvent["integrity_status"]>();
        
        events.forEach((event) => {
          const footprintCalculation = calculateFootprint([
            { energy_kwh: event.esg_metadata.energy_kwh, emission_factor: event.esg_metadata.emission_factor }
          ]);
          if (!footprintCalculation.error) {
            newFootprints.set(event.id, footprintCalculation.result);
          }

          const { signature, public_key, integrity_status, ...verificationPayload } = event;

          const integrityVerification = verifyIntegrity(verificationPayload, event.signature, event.public_key);
          
          if (integrityVerification.status === "VALID") {
            newStatuses.set(event.id, "VALID");
          } else if (integrityVerification.status === "UNAUTHORIZED") {
            newStatuses.set(event.id, "UNAUTHORIZED");
          } else {
            if (integrityVerification.error) console.error("Wasm Integrity Error:", integrityVerification.error);
            newStatuses.set(event.id, "INVALID");
          }
        });

        setFootprints(newFootprints);
        setValidityStatuses(newStatuses);
      });
    }
  }, [isEngineReady, error, events, calculateFootprint, verifyIntegrity]);

  return {
    events,
    footprints,
    validityStatuses,
    isPending,
    isEngineReady,
    error,
    generateUntrustedSignature,
    verifyIntegrity,
    fetchEvents
  };
}
