# Skill: ESG Validation Logic Implementation

Workflow for implementing and verifying deterministic ESG calculations within the Eco-Trace ecosystem.

## Workflow Steps

### 1. Requirements Acquisition
- **Action:** Import the specific formula and constraints from [DATA_DICTIONARY.md](../knowledge/DATA_DICTIONARY.md).
- **Goal:** Ensure mathematical alignment with the "Golden Source".

### 2. Test-First Development
- **Action:** Write a comprehensive unit test in Go (or the target language).
- **Goal:** Define expected outcomes before implementation.

### 3. Logic Implementation
- **Action:** Implement the deterministic logic in the [Go/Wasm Engine](../../packages/engine).
- **Constraint:** Calculation must be exact and follow the defined formula ($$CF_{total} = \sum (E_i \times EF_i)$$).

### 4. Verification & Evals
- **Action:** Verify the implementation against "Golden" test cases from [EVALS.md](../knowledge/EVALS.md).
- **Specific Targets:** 
  - **G03:** Math Accuracy (multiple energy inputs).
  - **G04:** Math Edge Cases (negative values rejection).

## Completion Criteria
- Unit tests pass in the Wasm-compatible environment.
- No discrepancies between implementation and Data Dictionary.
