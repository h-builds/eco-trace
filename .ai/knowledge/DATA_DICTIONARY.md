# Data Dictionary: ESG Traceability

Structural and operational context for the Eco-Trace ecosystem.

## Core Schema: `SupplyChainEvent`
```yaml
entity: SupplyChainEvent
fields:
  id:
    type: UUID
    constraints: [PRIMARY_KEY, REQUIRED]
    description: Audit Log Record ID for this specific historical entry.
  event_id: 
    type: UUID
    constraints: [REQUIRED]
    description: Core Supply Chain Object ID (groups threaded audit entries).
  asset_id: 
    type: String
    constraints: [REQUIRED]
    description: Unique identifier for the product or material.
  actor_id: 
    type: String
    constraints: [REQUIRED]
    description: Entity performing the action (cryptographic identity).
  public_key: 
    type: String
    constraints: [REQUIRED]
    description: Ed25519 public key in hex format used to verify the signature.
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
        unit: kWh
        constraints: [MIN_0]
        description: Energy consumed during the action.
      emission_factor: 
        type: Float
        unit: kgCO2e/kWh
        constraints: [MIN_0]
        description: Emission intensity for the energy source.

## Validation States
Schemas for representing the integrity and confidence of ESG events.

### `IntegrityStatus`
- **Type:** Enum
- **Options:** 
  - `VALID`: Cryptographic and logical verification passed.
  - `WARNING`: Logical discrepancy detected (e.g., calculation mismatch).
  - `INVALID`: Cryptographic failure or schema violation.
  - `UNAUTHORIZED`: Data signature is mathematically valid, but the Actor's Public Key is not found in the Trusted Actor Registry (G07 Check Failure).

### `ConfidenceScore`
- **Type:** Float
- **Range:** `0.0` to `1.0`
- **Description:** Qualitative measure of data reliability and metadata completeness.
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

## Shared UI Design Tokens
Immutable visual constants for the Eco-Trace ecosystem (Admin & Consumer).

### Colors
- **Brand Deep Charcoal:** `#1A1C1E` (Primary background and text)
- **Verification Green:** `#287A33` (Success/Trust indicator)
- **Integrity Blue:** `#005FB8` (Primary action and trust color)
- **Functional Alert:** `#D32F2F` (System Error/Violation)
- **Functional Pending:** `#F57C00` (Warning/In-Progress)
- **Functional Neutral:** `#607D8B` (Secondary text/borders)

### Spacing, Typography, Radii & Shadows
- **Spacing:** Base-4 spacing scale via `spacing.scale` (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px).
- **Fonts:** `Inter, system-ui, sans-serif` for zero-latency loading.
- **Font Sizes:** Typography sizing dictionary (`xs: 10px`, `sm: 12px`, `md: 14px`, `lg: 16px`, `xl: 24px`).
- **Border Radii:** Semantic shape configurations (`sm: 4px`, `md: 8px`, `lg: 12px`, `pill: 24px`).
- **Shadows:**
  - `subtle`: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)` — default card elevation.
  - `elevation-1`: `0 2px 4px rgba(0,0,0,0.05)` — subtle lifted surface.

---
*Goal: Create a single, immutable source of truth for both data integrity and visual identity.*
