# Data Dictionary: ESG Traceability

Structural and operational context for the Eco-Trace ecosystem.

## Core Schema: `SupplyChainEvent`
```yaml
entity: SupplyChainEvent
fields:
  event_id: 
    type: UUID
    constraints: [PRIMARY_KEY]
    description: Unique identifier for the event.
  asset_id: 
    type: String
    constraints: [REQUIRED]
    description: Unique identifier for the product or material.
  actor_id: 
    type: String
    constraints: [REQUIRED]
    description: Entity performing the action (cryptographic identity).
  timestamp: 
    type: ISO8601
    constraints: [REQUIRED]
    description: Creation time at the Edge.
  action_type: 
    type: Enum
    options: [ORIGIN, TRANSFORM, TRANSPORT, AUDIT]
    description: Categorization of the supply chain action.
  esg_metadata: 
    type: Object
    fields:
      energy_kwh: 
        type: Float
        description: Energy consumed during the action.
      emission_factor: 
        type: Float
        description: Emission intensity for the energy source.
```

## Deterministic Logic: Carbon Footprint
The total carbon footprint for an event is calculated using the following formula:

$$CF_{total} = \sum_{i=1}^{n} (E_i \times EF_i)$$

Where:
- $E_i$ is the energy consumed (`energy_kwh`).
- $EF_i$ is the emission factor (`emission_factor`).

> [!IMPORTANT]
> This calculation **MUST** be performed by the **Go/Wasm engine** at the Edge to ensure cryptographic data integrity and prevent tampering.

## Lineage & Source
- **Origin:** [Go/Wasm Validation Engine](../../packages/engine).
- **Storage:** Cloudflare D1 (SQLite Edge).
- **Consumers:** 
  - [React 19 Admin Dashboard](../../packages/admin) (Audit & Monitoring).
  - [Vue 3 Vapor App](../../packages/consumer) (Consumer Transparency).

---
*Goal: Establish a "Schema Freeze" to prevent AI hallucinations and improve query precision.*
