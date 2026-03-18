# Functional Specification: ESG Certificate Validation

Core requirement: **Cryptographic Validation of Sustainability Certificates** to ensure end-to-end trust in the Eco-Trace ecosystem.

## User Journey: The Auditor (Admin Dashboard)
**Goal:** Efficiently validate and monitor the integrity of ESG claims.

1. **Bulk Upload:** Auditor uploads a batch of ESG certificates (PDF/JSON).
2. **Deterministic Validation:** The [Go/Wasm Engine](../../packages/engine) intercepts the upload, performing immediate cryptographic verification and schema validation.
3. **Integrity Dashboard:** 
   - Display a **Confidence Score** (0-100) based on signature validity and metadata completeness.
   - Show **Integrity Status** (VALID, WARNING, INVALID).
4. **Real-time Traceability Tree:** For each asset, the Auditor can expand a visual tree showing every supply chain event, actor, and verified certificate associated with it.

## User Journey: The Consumer (Vue Vapor App)
**Goal:** Instant transparency into product origin and ESG impact.

1. **QR Scan:** Consumer scans a product QR code.
2. **Edge Verification:** The app performs an instant lookup against [Cloudflare D1](../../packages/consumer) at the Edge.
3. **Zero-Latency History:** Display a condensed product timeline showing:
   - Origin and transformation points.
   - Verified ESG certificates.
   - Real-time carbon footprint calculation.

## Success Criteria
- **Logic Accuracy:** All carbon footprint calculations MUST match the formula defined in the [DATA_DICTIONARY.md](../knowledge/DATA_DICTIONARY.md).
- **Cryptographic Security:** 100% of validated events must be cryptographically signed by the **Go engine** before persistence.
- **Accessibility:** All UI components (React/Vue) MUST meet **WCAG 2.1 Level AA** standards.
- **Performance:** Consumers must experience < 100ms latency for QR verification at the Edge.

## Edge Cases & Error Handling
Strict validation gates and deterministic error reporting are mandatory to prevent data leakage or silent failures.

### 1. Integrity Hash Mismatch
If the cryptographic signature or hash verification fails:
- **Action:** Immediately reject the transaction/upload.
- **Audit:** Trigger an entry in the Immutable Audit Log with `ERROR_CODE: INTEGRITY_VIOLATION`.
- **Notification:** Notify the Auditor via a High-Contrast Alert in the Admin Dashboard.

### 2. Calculation Discrepancy
If the reported Carbon Footprint in metadata does not match the deterministic calculation $CF_{total} = \sum (E_i \times EF_i)$ performed by the Go/Wasm engine:
- **Action:** Flag the event as `WARNING: CALCULATION_DISCREPANCY`.
- **UI:** Display a warning icon next to the metric in both Admin and Consumer views.

### 3. Schema Non-Compliance
- **Action:** Reject any certificate or event missing mandatory fields defined in the [DATA_DICTIONARY.md](../knowledge/DATA_DICTIONARY.md).
- **Mandatory Fields:** `event_id`, `asset_id`, `actor_id`, `timestamp`, `energy_kwh`, `emission_factor`.

### 4. Actor Verification Failure
- **Action:** If the `actor_id` cannot be verified against the trusted entity list:
- **Result:** Block the event and log as `UNAUTHORIZED_ACTOR`.

## Implementation Pattern (Plan-and-Execute)
> [!IMPORTANT]
> Future agents assigned to implement these flows MUST decompose this specification into a granular `TASKS.md` file within the relevant package directory before writing any code.

---
*Goal: Provide a high-fidelity anchor for the Go engine and the React/Vue frontends.*
