import { SupplyChainEvent } from "../types";

export function useEventTampering(
  isEngineReady: boolean,
  verifyIntegrity: any,
  generateUntrustedSignature: any,
  fetchEvents: () => void,
  showToast: (msg: string, type: "success" | "warning" | "error") => void
) {
  const handleTamperTest = async (event: SupplyChainEvent) => {
    if (!isEngineReady) return;
    showToast("Auditing & Persisting fraud attempt...", "warning");

    const tamperedEnergy = event.esg_metadata.energy_kwh + 1;
    const ts = new Date().toISOString();
    
    const fraudPayloadForWasm = {
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: event.actor_id,
      timestamp: ts,
      action_type: event.action_type,
      esg_metadata: { energy_kwh: tamperedEnergy, emission_factor: event.esg_metadata.emission_factor }
    };

    const tamperedVerification = verifyIntegrity(fraudPayloadForWasm, event.signature, event.public_key);

    const persistencePayload = {
      id: crypto.randomUUID(),
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: event.actor_id,
      timestamp: ts,
      action_type: event.action_type,
      esg_metadata: {
        energy_kwh: tamperedEnergy,
        emission_factor: event.esg_metadata.emission_factor,
      },
      signature: event.signature,
      public_key: event.public_key,
      integrity_status: tamperedVerification.status
    };

    try {
      const persistenceResponse = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persistencePayload)
      });
      if (!persistenceResponse.ok) throw new Error("Failed to persist");
      showToast(`Audited and Persisted: ${tamperedVerification.status}`, "error");
      fetchEvents();
    } catch (err) {
      console.error(err);
      showToast("Failed to persist tamper event to D1", "error");
    }
  };

  const handleImpersonatorTest = async (event: SupplyChainEvent) => {
    if (!generateUntrustedSignature) return;
    showToast("Auditing & Persisting impersonation attempt bridging Go generation...", "warning");

    const fraudulentActor = "Unregistered Imposter Actor ID";
    const ts = new Date().toISOString();
    
    const fraudPayloadForWasm = {
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: ts,
      action_type: event.action_type,
      esg_metadata: { energy_kwh: event.esg_metadata.energy_kwh, emission_factor: event.esg_metadata.emission_factor }
    };

    const impersonationOutcome = generateUntrustedSignature(fraudPayloadForWasm);
    if (!impersonationOutcome || impersonationOutcome.status !== "VALID" || !impersonationOutcome.signature || !impersonationOutcome.publicKey) {
      showToast("Failed to simulate trusted math locally", "error");
      return;
    }

    const spoofedVerification = verifyIntegrity(fraudPayloadForWasm, impersonationOutcome.signature, impersonationOutcome.publicKey);

    const spoofedPersistencePayload = {
      id: crypto.randomUUID(),
      event_id: event.event_id,
      asset_id: event.asset_id,
      actor_id: fraudulentActor,
      timestamp: ts,
      action_type: event.action_type,
      esg_metadata: {
        energy_kwh: event.esg_metadata.energy_kwh,
        emission_factor: event.esg_metadata.emission_factor,
      },
      signature: impersonationOutcome.signature,
      public_key: impersonationOutcome.publicKey,
      integrity_status: spoofedVerification.status
    };

    try {
      const spoofedPersistenceResponse = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spoofedPersistencePayload)
      });
      if (!spoofedPersistenceResponse.ok) throw new Error("Failed to persist");
      showToast(`Audited and Persisted: ${spoofedVerification.status}`, "error");
      fetchEvents();
    } catch (err) {
      console.error(err);
      showToast("Failed to persist impersonation event to D1", "error");
    }
  };

  return { handleTamperTest, handleImpersonatorTest };
}
