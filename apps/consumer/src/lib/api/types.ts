export interface EsgMetadata {
  energy_kwh: number;
  emission_factor: number;
}

export type ActionType = "ORIGIN" | "TRANSFORM" | "TRANSPORT" | "AUDIT";

export type IntegrityStatus = "VALID" | "WARNING" | "INVALID" | "UNAUTHORIZED";

export interface SupplyChainEvent {
  id: string;
  event_id: string;
  asset_id: string;
  actor_id: string;
  timestamp: string;
  action_type: ActionType;
  energy_kwh: number;
  emission_factor: number;
  signature: string;
  public_key: string;
  integrity_status: IntegrityStatus;
}

export interface BackendEventDto {
  id?: string;
  event_id?: string;
  eventId?: string;
  asset_id?: string;
  assetId?: string;
  actor_id?: string;
  actorId?: string;
  timestamp?: string;
  action_type?: string;
  actionType?: string;
  energy_kwh?: number;
  energyKwh?: number;
  emission_factor?: number;
  emissionFactor?: number;
  signature?: string;
  public_key?: string;
  publicKey?: string;
  integrity_status?: string;
  status?: string;
}

export type EventsApiResponse = SupplyChainEvent[];

export interface EventsApiError {
  error: string;
}

export type EventHistoryState =
  | "idle"
  | "loading"
  | "success"
  | "empty"
  | "error";
