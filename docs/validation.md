# Eco Trace — System Validation & EFS Testing Documentation

This document serves as the comprehensive guide for verifying the security, mathematical correctness, performance SLAs, and accessibility standards of the **Eco Trace Enterprise Verification Architecture**. It outlines the quantitative validation methods, maps the Golden Test Cases to their implementation files, and documents all verification commands.

---

## 1. Introduction & Verification Strategy

The **Evaluation Framework (EFS)** enforces continuous validation of the Go/WebAssembly cryptographic boundaries, Next.js Admin actions, Vue 3.5 Vapor rendering engine, and global design system tokens. Testing is separated into two paradigms:

1.  **Deterministic & Cryptographic (System Level)**: Handled by unit testing in Go for the signature registry and carbon math.
2.  **Edge & Runtime Integration (Client Level)**: Handled by Vitest suite and custom Node validator scripts, checking WebAssembly isolation boundaries, execution SLAs, and WCAG accessibility standards in browser-like environments.

---

## 2. Golden Test Cases Summary

Eco Trace defines **10 Golden Test Cases (G01 to G10)**. Below is the mapping of each test case to its category, target execution command, and validating source files:

| ID | Category | Description | Target Result | Validation Suite & Files |
| :--- | :--- | :--- | :--- | :--- |
| **G01** | Integrity | Valid Ed25519 signature on `SupplyChainEvent` | `PASS` | `go test ./...` in [crypto_test.go](../packages/engine/internal/crypto/crypto_test.go) |
| **G02** | Integrity | Modified payload with original signature | `REJECT (INTEGRITY_VIOLATION)` | `go test ./...` in [crypto_test.go](../packages/engine/internal/crypto/crypto_test.go); `pnpm test` in [logic.test.ts](../apps/consumer/test/logic.test.ts) |
| **G03** | Math | $CF_{total}$ calculation for multiple energy inputs | `Exact Match (100% Accuracy)` | `go test ./...` in [calculator_test.go](../packages/engine/internal/logic/calculator_test.go); `pnpm test` in [logic.test.ts](../apps/consumer/test/logic.test.ts) |
| **G04** | Math | Calculation with negative energy values | `FAIL (Validation Error)` | `go test ./...` in [calculator_test.go](../packages/engine/internal/logic/calculator_test.go) |
| **G05** | Schema | Missing `actor_id` in event submission | `REJECT (SCHEMA_NON_COMPLIANCE)` | Next.js API & actions input checking in [route.ts](../apps/admin/app/api/events/route.ts) |
| **G06** | Schema | Extra fields not defined in Data Dictionary | `PASS (Forward Compatible)` | Go JSON unmarshal logic ignoring unmapped attributes in [types.go](../packages/engine/internal/types/types.go) |
| **G07** | Security | Event signed by unauthorized public key | `BLOCK (UNAUTHORIZED_ACTOR)` | `go test ./...` in [crypto_test.go](../packages/engine/internal/crypto/crypto_test.go); `pnpm test` in [logic.test.ts](../apps/consumer/test/logic.test.ts) |
| **G08** | Performance | QR Scan lookup and verification latency | `Latency < 100ms` | `pnpm test` in [latency.test.ts](../apps/consumer/test/latency.test.ts) |
| **G09** | UI/UX | Contrast ratio for integrity warnings | `WCAG 2.1 AA Compliant (>= 4.5:1)` | `pnpm run test:accessibility` in [contrast-validator.ts](../packages/ui/scripts/contrast-validator.ts) |
| **G10** | Audit | Log entry creation for rejected events | `SUCCESS (Immutable Entry)` | Cloudflare D1 seed and events persistence in [seed.ts](../apps/admin/lib/seed.ts) |

---

## 3. Verification Commands & Expected Outputs

A reviewer or automated CI runner can verify the system by executing the following commands:

### 3.1 Go WebAssembly Engine Tests
Validates core cryptographic functions (Ed25519 signature checks, registry constraints, and deterministic carbon calculation bounds).
```bash
# Navigate to engine directory and execute Go test suite
cd packages/engine
go test ./...
```
**Expected Output:**
```txt
ok      github.com/eco-trace/engine/internal/crypto     0.050s
ok      github.com/eco-trace/engine/internal/logic      0.003s
```

### 3.2 Consumer Web/Vitest Suite
Validates browser-side WebAssembly integration, type properties, reactivity safety, API cache layers, and latency SLA.
```bash
# Navigate to consumer directory and execute Vitest runner
cd apps/consumer
pnpm test
```
**Expected Output:**
```txt
 Test Files  8 passed (8)
      Tests  25 passed (25)
   Duration  X.XXs
```

### 3.3 UI Accessibility Token Validator
Analyzes color design system configurations for contrast-compliance matching WCAG Level AA guidelines.
```bash
# Run from repository root
pnpm run test:accessibility
```
**Expected Output:**
```txt
--- WCAG 2.1 Level AA Contrast Validation ---
✅ Deep Charcoal on Brand Green: 10.03:1
✅ Deep Charcoal on Canvas: 16.21:1
✅ Deep Charcoal on Card: 17.09:1
✅ Verification Green on Canvas: 5.08:1
✅ Alert Red on Canvas: 4.72:1

PASS: All tested combinations meet accessibility standards.
```

### 3.4 Full Workspace Diagnostics
Ensures TypeScript type-safety compiling and static lint rules pass globally.
```bash
pnpm build
pnpm lint
```

---

## 4. Deep-Dive Feature Mappings

### G01: Valid Ed25519 signature on `SupplyChainEvent`
*   **Feature Target**: Cryptographic Provenance signing. Every actor logs history with an unforgeable identity.
*   **Production Code**: [crypto.go](../packages/engine/internal/crypto/crypto.go#L30-L55) implements payload serialization and `ed25519.Verify` bindings.
*   **Test Code**: [crypto_test.go](../packages/engine/internal/crypto/crypto_test.go#L10-L43) (`TestSignAndVerifyEvent`) generates key pairs, signs mock events, and verifies hex outputs.

### G02: Modified payload with original signature
*   **Feature Target**: Integrity verification / Anti-tamper protection. If data is altered in transit or retroactively in a database, verification fails.
*   **Production Code**: [crypto.go](../packages/engine/internal/crypto/crypto.go#L45-L55) (`VerifyEvent`) hashes the modified payload and compares it.
*   **Test Code**:
    *   System-level: [crypto_test.go](../packages/engine/internal/crypto/crypto_test.go#L45-L76) (`TestTamperDetection`) asserts that mutating properties like `EnergyKWh` or `ActorID` invalidates the signature.
    *   Client-level: [logic.test.ts](../apps/consumer/test/logic.test.ts#L43-L46) (`G02: Flags INVALID signature`) ensures the Vue application captures this invalid state and triggers warning indicators.

### G03: $CF_{total}$ calculation for multiple energy inputs
*   **Feature Target**: Deterministic carbon math. Sustainability values must aggregate identically across all surfaces without floating-point artifacts.
*   **Mathematical Formula**:
    \[CF_{total} = \sum_{i=1}^{n} (E_i \times EF_i)\]
*   **Production Code**: [calculator.go](../packages/engine/internal/logic/calculator.go#L10-L30) (`CalculateCarbonFootprint`) rounds floating-point sums to eliminate IEEE 754 precision noise.
*   **Test Code**:
    *   System-level: [calculator_test.go](../packages/engine/internal/logic/calculator_test.go#L15-L28) (`TestCalculateCarbonFootprint_MultipleInputs`) and [calculator_test.go](../packages/engine/internal/logic/calculator_test.go#L93-L106) (`TestCalculateCarbonFootprint_FloatPrecision`) verify exact rounding results.
    *   Client-level: [logic.test.ts](../apps/consumer/test/logic.test.ts#L28-L35) (`G03: Calculates CF_total correctly using Wasm Engine`) links Go math results directly into Vue calculations.

### G04: Calculation with negative energy values
*   **Feature Target**: Prevention of offset/greenwashing fraud. Input boundaries must block negative numbers (which could artificially reduce emission scores).
*   **Production Code**: [calculator.go](../packages/engine/internal/logic/calculator.go#L12-L19) validation checks reject negative numbers.
*   **Test Code**: [calculator_test.go](../packages/engine/internal/logic/calculator_test.go#L70-L90) (`TestCalculateCarbonFootprint_NegativeEnergy` & `NegativeEmissionFactor`) expects explicit runtime errors when negative metrics are encountered.

### G05: Missing `actor_id` in event submission
*   **Feature Target**: Strict schema compliance. Events must follow the [DATA_DICTIONARY.md](../.ai/knowledge/DATA_DICTIONARY.md) format.
*   **Production Code**: Validation checks are enforced during database persistence in Next.js backend events API [route.ts](../apps/admin/app/api/events/route.ts) and form schemas [AssetForm.tsx](../apps/admin/app/dashboard/entities/AssetForm.tsx).

### G06: Extra fields not defined in Data Dictionary
*   **Feature Target**: Forward-compatibility. Edge engines must tolerate new data attributes without crashing.
*   **Production Code**: Implemented natively in Go's JSON parser, mapping only properties defined in types [types.go](../packages/engine/internal/types/types.go). Unknown keys are safely discarded.

### G07: Event from unauthorized `actor_id`
*   **Feature Target**: Trusted Actor registry. Prevents actors from signing events for which they don't own the corresponding registered identity (impersonation attacks).
*   **Production Code**: [registry.go](../packages/engine/internal/crypto/registry.go#L10-L30) compares the public key signature with the keys registered in the static `TrustedActors` catalog.
*   **Test Code**:
    *   System-level: [crypto_test.go](../packages/engine/internal/crypto/crypto_test.go#L78-L109) (`TestUnauthorizedActor`) asserts that if an unregistered key signs a valid payload, `IsAuthorized` rejects it.
    *   Client-level: [logic.test.ts](../apps/consumer/test/logic.test.ts#L37-L41) (`G07: Flags UNAUTHORIZED actor`) maps this reject status to the front-end user experience.

### G08: Performance - QR Scan lookup latency
*   **Feature Target**: Sub-100ms verification SLA. Edge caches and light Vapor-mode footprints keep scans extremely fast on cellular networks.
*   **Production Code**: Light weight Vue 3.5 Vapor mode rendering in [TransparencyScreen.vue](../apps/consumer/src/domains/verification/TransparencyScreen.vue) combined with SWR caching client in [cache.ts](../apps/consumer/src/lib/api/cache.ts).
*   **Test Code**: [latency.test.ts](../apps/consumer/test/latency.test.ts#L52-L79) wraps API routing fetch and WebAssembly validation cycles, verifying that the entire end-to-end lookup and cryptographic analysis loop completes in less than 100ms.

### G09: UI/UX - Contrast ratio for integrity warnings
*   **Feature Target**: Accessibility (WCAG 2.1 AA Compliant). Alert styles must be easily readable.
*   **Production Code**: Color palettes defined in [tokens.json](../packages/ui/tokens.json). Warning banner styling in [AuthenticityBadge.vue](../apps/consumer/src/domains/verification/components/AuthenticityBadge.vue).
*   **Test Code**: [contrast-validator.ts](../packages/ui/scripts/contrast-validator.ts) reads tokens and mathematically calculates contrast ratios, checking that important warning states (e.g. alert red on canvas) exceed the 4.5:1 ratio threshold.

### G10: Audit - Log entry creation for rejected events
*   **Feature Target**: Immutable auditing records. Failed checks are logged in the persistent edge ledger without mutating valid records.
*   **Production Code**: Database operations logging events and verification metadata inside Next.js Server Actions [actions.ts](../apps/admin/app/dashboard/entities/actions.ts).
*   **Test Code**: Verified via pre-seeded data in [seed.ts](../apps/admin/lib/seed.ts#L101-L105) (e.g., seeding `INVALID` and `UNAUTHORIZED` logs to verify warning flows persist correctly in SQLite).
