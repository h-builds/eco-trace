# Execution Roadmap: Go/Wasm Engine

Implementation plan for the core cryptographic and validation logic of the Eco-Trace ecosystem.

## 1. Foundation

- [x] Initialize Go module and internal package structure. `[DONE 2026-03-19]`
- [x] Implement base `Event` types in alignment with [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md). `[DONE 2026-03-19]` **(Ref: G05)**

## 2. Core Logic (Deterministic Calculation)

- [x] Implement `CalculateCarbonFootprint` function using formula: $$CF_{total} = \sum (E_i \times EF_i)$$. `[DONE 2026-03-19]` **(Ref: G03)**
- [x] Add validation for non-negative energy and emission factor values. `[DONE 2026-03-19]` **(Ref: G04)**
- [x] Implement unit tests for the calculation engine in a Wasm-compatible environment. `[DONE 2026-03-19]` **(Ref: G03)**

## 3. Security (Cryptographic Integrity)

- [x] Implement Ed25519 key pair generation and management utilities. `[DONE 2026-03-19]`
- [x] Implement `SignEvent` function to cryptographically secure `SupplyChainEvent` payloads. `[DONE 2026-03-19]` **(Ref: G01)**
- [x] Implement `VerifySignature` gate to detect tampered payloads. `[DONE 2026-03-19]` **(Ref: G02)**
- [ ] Implement `VerifyActor` check against a trusted entity list. `[TODO]` **(Ref: G07)**

## 4. Integrity Gates (Schema & Error Handling)

- [ ] Implement `ValidateSchema` function to enforce [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md) constraints. `[TODO]` **(Ref: G05)**
- [ ] Build the Error Reporting module:
  - [x] `INTEGRITY_VIOLATION` handler. `[DONE 2026-03-19]` **(Ref: G02, G10)**
  - [ ] `CALCULATION_DISCREPANCY` handler. `[TODO]` **(Ref: G03)**
  - [ ] `UNAUTHORIZED_ACTOR` handler. `[TODO]` **(Ref: G07)**

## 5. Wasm Bindings (Edge Readiness)

- [x] Expose core validation functions to JavaScript via `syscall/js`. `[DONE 2026-03-19]`
- [ ] Optimize memory management for high-frequency execution in Cloudflare Workers. `[TODO]`
- [ ] Verify Wasm execution latency meets target. `[TODO]` **(Ref: G08)**

## 6. Governance & Delivery (Final Gate)

- [ ] **HITL Review**: Manual architectural audit of Go-to-Frontend bridge logic. `[TODO]`
- [ ] **Gap Analysis**: Automated cross-check of implemented features vs [SPEC.md](../../.ai/context/SPEC.md). `[TODO]` **(Ref: Phase 8 Review)**
- [ ] **Doc Sync**: Execute `/sync-docs` to update README and CHANGELOG with atomic commit history. `[TODO]`
- [ ] **PR Generation**: AI-generated summary of technical diffs for human sign-off. `[TODO]`

---

_Goal: Ensure 100% alignment with the Eco-Trace governance and integrity standards._
