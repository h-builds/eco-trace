export interface SupplyChainEvent {
  id: string;
  event_id: string;
  asset_id: string;
  actor_id: string;
  timestamp: string;
  action_type: string;
  esg_metadata: {
    energy_kwh: number;
    emission_factor: number;
  };
  signature: string;
  public_key: string;
  integrity_status: "VALID" | "WARNING" | "INVALID" | "PENDING" | "UNAUTHORIZED";
}
