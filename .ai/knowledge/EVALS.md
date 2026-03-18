# Evaluation Framework (EFS): Eco-Trace

Quantitative validation for mission-critical ESG traceability standards.

## 1. Factsheet Dimensions (EFS)
- **Context:** Validation of the Go/Wasm engine and React/Vue frontends.
- **Scope:** Integrity, Math Logic, Schema Compliance, and Security.
- **Structure:** Automated unit tests, Wasm sandbox execution, and LLM-as-a-judge.
- **Method:** Continuous Evaluation (CI/CD) with "Golden" test case enforcement.
- **Alignment:** Ensures 100% compliance with [DATA_DICTIONARY.md](./DATA_DICTIONARY.md).

## 2. Golden Test Cases
| ID | Category | Description | Expected Result |
|----|----------|-------------|-----------------|
| G01 | Integrity | Valid Ed25519 signature on `SupplyChainEvent`. | PASS |
| G02 | Integrity | Modified payload with original signature. | REJECT (INTEGRITY_VIOLATION) |
| G03 | Math | $CF_{total}$ calculation for multiple energy inputs. | Exact Match (100% Accuracy) |
| G04 | Math | Calculation with negative energy values. | FAIL (Validation Error) |
| G05 | Schema | Missing `actor_id` in event submission. | REJECT (SCHEMA_NON_COMPLIANCE) |
| G06 | Schema | Extra fields not defined in Data Dictionary. | PASS (Forward Compatible) |
| G07 | Security | Event from unauthorized `actor_id`. | BLOCK (UNAUTHORIZED_ACTOR) |
| G08 | Performance | QR Scan lookup latency at the Edge. | < 100ms |
| G09 | UI/UX | Contrast ratio for integrity warnings. | WCAG 2.1 AA Compliant |
| G10 | Audit | Log entry creation for rejected events. | SUCCESS (Immutable Entry) |

## 3. Metrics Tracking
- **Contextual Precision:** \% of retrieved metadata relevant to the query.
- **Execution Accuracy:** \% Pass rate of Go/Wasm logic in the sandbox.
- **F1 Score:** Harmonic mean of Precision and Recall for data extraction.
  $$F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}$$

## 4. Validation Methods
- **Deterministic:** Go/Wasm unit tests for cryptographic and mathematical logic.
- **Subjective:** **LLM-as-a-judge** to verify consistency and clarity in audit logs.
- **Automated Audit:** Daily reconciliation between D1 storage and immutable logs.

---
*Goal: Establish a rigorous, audit-ready validation layer for the Eco-Trace ecosystem.*
