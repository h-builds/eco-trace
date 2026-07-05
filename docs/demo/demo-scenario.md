# Eco Trace — Canonical Demo Scenario: Verified Product Journey

This document defines and details the canonical **Verified Product Journey** demo scenario. It serves as the primary technical specification of the seeded demo data, security status mapping, mathematical verification, and cross-application interface rendering.

---

## 1. Scenario Overview

The **Verified Product Journey** (bound to Asset ID `ASSET-COFFEE-2026-001`) demonstrates a high-integrity supply chain tracing a sustainable coffee lot from its origin through processing, logistics, and independent audit review. 

Crucially, the scenario simulates real-world security challenges:
- **Tampering Detection:** A payload-modified transformation event that triggers a cryptographic integrity violation.
- **Identity Enforcement:** An event submitted by an unregistered, unauthorized actor that triggers an identity violation.
- **Threaded Audit Trails:** An interactive historical logging design showing how modifications and violations are audited without mutating the primary historical records.

---

## 2. Seeded Entities

The supply chain uses realistic, simulated actors and assets pre-seeded into the Cloudflare D1 database. Each actor is assigned a unique, dynamically generated Ed25519 key pair for cryptographic signatures.

### 2.1 Seeded Actors

| Actor ID / Name | Supply Chain Role | Registry Status | Cryptographic Key Status |
| :--- | :--- | :--- | :--- |
| **Andes Organic Cooperative** | Grower / Origin | **ACTIVE** (Authorized) | Pre-registered in Go/Wasm Registry |
| **Veridian Processing Node** | Processor / Miller | **ACTIVE** (Authorized) | Pre-registered in Go/Wasm Registry |
| **NorthStar Logistics** | Logistics Partner | **ACTIVE** (Authorized) | Pre-registered in Go/Wasm Registry |
| **Eco Trace Demo Auditor** | Compliance Auditor | **ACTIVE** (Authorized) | Pre-registered in Go/Wasm Registry |
| **Unknown Logistics** | Impersonator / Rogue | **UNREGISTERED** | Key not in Go/Wasm Registry (Block candidate) |

### 2.2 Seeded Asset (Product Lot)

- **Asset ID:** `ASSET-COFFEE-2026-001`
- **Product Name:** `Andes Trace Coffee Lot 001`
- **Asset Description:** `Verified Product Journey`
- **Initial Owner:** `Andes Organic Cooperative`

---

## 3. Seeded Events & Integrity States

The scenario consists of 6 chronological events representing the product journey. Each event includes its ESG metadata (energy consumption and emission factor) and is cryptographically validated by the shared **Go/WebAssembly Engine**.

| Event ID | Action Type | Actor | Energy (kWh) | Emission Intensity | Signature Check | Registry Check | Expected Integrity Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EVT-COFFEE-001** | `ORIGIN` | Andes Organic Cooperative | 120.0 | 0.2 | Valid | Authorized | `VALID` |
| **EVT-COFFEE-002** | `TRANSFORM` | Veridian Processing Node | 450.5 | 0.8 | Valid | Authorized | `VALID` |
| **EVT-COFFEE-003** | `TRANSPORT` | NorthStar Logistics | 310.0 | 1.1 | Valid | Authorized | `VALID` |
| **EVT-COFFEE-004** | `TRANSFORM` | Veridian Processing Node | 200.0 | 0.5 | **Invalid (Modified)** | Authorized | `INVALID` |
| **EVT-COFFEE-005** | `TRANSPORT` | Unknown Logistics | 150.0 | 1.5 | Valid | **Unregistered** | `UNAUTHORIZED` |
| **EVT-COFFEE-006** | `AUDIT` | Eco Trace Demo Auditor | 0.0 | 0.0 | Valid | Authorized | `VALID` |

---

## 4. Chronological Step Narrative

### Step 1: Origin Registration
*   **Actor:** `Andes Organic Cooperative`
*   **Event ID:** `EVT-COFFEE-001` (Action: `ORIGIN`)
*   **Payload & ESG:** Raw green beans are harvested and packed. Energy consumption: `120.0 kWh` at a green utility emission intensity of `0.2 kgCO2e/kWh`.
*   **Validation:** The actor signs the payload with its Ed25519 private key. The Go/Wasm engine verifies the signature against the registered public key.
*   **Integrity Outcome:** `VALID`.

### Step 2: Processing and Milling
*   **Actor:** `Veridian Processing Node`
*   **Event ID:** `EVT-COFFEE-002` (Action: `TRANSFORM`)
*   **Payload & ESG:** Wet milling, depulping, and drying processes. Energy consumption: `450.5 kWh` (standard grid energy) at `0.8 kgCO2e/kWh`.
*   **Validation:** Signature matching succeeds, and the public key maps to Veridian's active registered ID.
*   **Integrity Outcome:** `VALID`.

### Step 3: Global Transport
*   **Actor:** `NorthStar Logistics`
*   **Event ID:** `EVT-COFFEE-003` (Action: `TRANSPORT`)
*   **Payload & ESG:** Port delivery and oceanic shipping. Energy consumption: `310.0 kWh` (freight fuel equivalent) at `1.1 kgCO2e/kWh`.
*   **Validation:** Signature matching succeeds, and the public key maps to NorthStar's active registered ID.
*   **Integrity Outcome:** `VALID`.

### Step 4: Simulated Tamper Attempt (Greenwashing)
*   **Actor:** `Veridian Processing Node`
*   **Event ID:** `EVT-COFFEE-004` (Action: `TRANSFORM`)
*   **Incident Description:** A rogue agent attempts to retroactively alter the ESG metadata to report lower energy usage (`200.0 kWh` instead of the actual `350.0 kWh`) but submits the update with the original signature.
*   **Validation:** The Go/Wasm engine recalculates the payload hash. Because the payload has been modified, the cryptographic check (`ed25519.Verify`) fails (G02 Failure).
*   **Integrity Outcome:** `INVALID` (High-alert status).

### Step 5: Unauthorized Actor Incident
*   **Actor:** `Unknown Logistics`
*   **Event ID:** `EVT-COFFEE-005` (Action: `TRANSPORT`)
*   **Incident Description:** An unregistered third-party logistics company attempts to log a transportation event into the supply chain.
*   **Validation:** While the event has a valid Ed25519 signature (mathematically intact), the signer's public key is not registered in the Go Registry under `Unknown Logistics` (G07 Failure).
*   **Integrity Outcome:** `UNAUTHORIZED` (Blocked status).

### Step 6: Independent Compliance Review
*   **Actor:** `Eco Trace Demo Auditor`
*   **Event ID:** `EVT-COFFEE-006` (Action: `AUDIT`)
*   **Payload & ESG:** Verification of compliance papers and validation of the entire trail. Energy: `0.0 kWh` at `0.0 kgCO2e/kWh`.
*   **Validation:** Authorized auditor signs off the current state.
*   **Integrity Outcome:** `VALID`.

---

## 5. Cross-Reference: Workstation vs. Consumer App

The two applications represent two distinct surfaces of the ecosystem, showing the same D1 backend data but styled for their respective audiences.

| Feature / Screen | React Admin Workstation | Vue Consumer App |
| :--- | :--- | :--- |
| **Target User** | Corporate Compliance Officers & Auditors | End Retail Customers & Buyers |
| **Authentication** | Enforced RBAC (`ADMIN`, `AUDITOR`, `VIEWER`) | None (Public Edge Route) |
| **Timeline View** | **Threaded Log Table:** Displays primary events and groups nested historical modifications/failures into collapsable accordions. | **Linear Provenance Trail:** Displays a streamlined vertical audit timeline, flagging integrity failures with alert details. |
| **Incident Highlighting** | - High-contrast banner alerts.<br>- Red color indicators for `INVALID` and `UNAUTHORIZED`.<br>- **Compromised Flows Counter** tracking failed IDs. | - Warning banners stating "Auditor-only finding: Event failed integrity or authorization checks."<br>- Red border callout details. |
| **Interactive Testing** | **Integrity Auditing Actions:** Buttons to manually simulate "Tamper Data" and "Impersonate" attacks, which write new records directly into D1 to show instant feedback. | **QR-Scanner Fallback:** "Use Demo Product" bypass allowing recruiters to test without camera access. |
| **Reporting / Export** | Client-side **PDF and CSV Export** including cryptographic signatures and public key strings. | **Authenticity Badge** (VALID / WARNING / COMPROMISED) based on Go/Wasm verification status. |

---

## 6. Mathematical Verification Walkthrough

The **Go/Wasm Engine** aggregates the carbon footprint for the product lot deterministically using the formula:

$$CF_{total} = \sum_{i=1}^{n} (E_i \times EF_i)$$

Where:
- $CF_{total}$ is the total emissions in kilograms of $CO_2$ equivalent ($kgCO_2e$).
- $E_i$ is the energy consumed during event $i$ in kilowatt-hours ($kWh$).
- $EF_i$ is the emission factor for that energy source ($kgCO_2e/kWh$).

### 6.1 Step-by-Step Footprint Summation

Only events with a verified status of `VALID` are aggregated into the product's official carbon footprint total:

1.  **Origin Event (`EVT-COFFEE-001`):**
    $$120.0 \text{ kWh} \times 0.2 \text{ kgCO}_2\text{e/kWh} = 24.00 \text{ kgCO}_2\text{e}$$
2.  **Processing Event (`EVT-COFFEE-002`):**
    $$450.5 \text{ kWh} \times 0.8 \text{ kgCO}_2\text{e/kWh} = 360.40 \text{ kgCO}_2\text{e}$$
3.  **Transport Event (`EVT-COFFEE-003`):**
    $$310.0 \text{ kWh} \times 1.1 \text{ kgCO}_2\text{e/kWh} = 341.00 \text{ kgCO}_2\text{e}$$
4.  **Audit Event (`EVT-COFFEE-006`):**
    $$0.0 \text{ kWh} \times 0.0 \text{ kgCO}_2\text{e/kWh} = 0.00 \text{ kgCO}_2\text{e}$$

### 6.2 Carbon Aggregation Result

$$\text{Total Verified ESG Carbon Footprint} = 24.0 + 360.4 + 341.0 + 0.0 = 725.40 \text{ kgCO}_2\text{e}$$

*Note: The tampered event (`EVT-COFFEE-004`) and unauthorized event (`EVT-COFFEE-005`) are failed by the WebAssembly cryptographic boundary and are excluded from the verified aggregate calculations, alerting downstream applications of audit trail corruption.*
