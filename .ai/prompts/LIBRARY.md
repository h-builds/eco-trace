# Eco-Trace Prompt Library (v2.0)

Standardized versioned system prompts for mission-critical workflows.

## Templates

### 1. `go-logic-implementation`

- **Context:** Deterministic Go logic with 100% test coverage for ESG calculations.
- **Checklist:**
  - [ ] Read [DATA_DICTIONARY.md](../knowledge/DATA_DICTIONARY.md) for formulas and constraints.
  - [ ] Create a failing test case in the target package.
  - [ ] Implement the logic in Go, ensuring Wasm compatibility.
  - [ ] **Constraint:** Calculation must follow $$CF_{total} = \sum (E_i \times EF_i)$$ exactly as defined in [DATA_DICTIONARY.md L62](../knowledge/DATA_DICTIONARY.md).
  - [ ] Verify against [EVALS.md](../knowledge/EVALS.md) — specifically **G03** (accuracy) and **G04** (negative rejection).
  - [ ] **Comment Audit:** Remove redundant AI-explanations; keep only "Why" comments for math/logic.
  - [ ] **Finalize** by executing the `context-sync` template to update [CONTEXT.md](../context/CONTEXT.md) and [TASKS.md](../../packages/engine/TASKS.md).

### 2. `ui-component-audit`

- **Context:** Build a React or Vue component that meets strict WCAG 2.1 Level AA compliance.
- **Checklist:**
  - [ ] Use `@eco-trace/ui` design tokens exclusively.
  - [ ] **Contrast Verification:** Execute [contrast-validator.ts](../../packages/ui/scripts/contrast-validator.ts) — minimum ratio **4.5:1** for normal text. Do not manually estimate; rely on script output.
  - [ ] **Semantic Integrity:** Verify ARIA labels, roles, and keyboard navigation paths for 100% screen reader compatibility.
  - [ ] **Automated Scan:** Run `axe-core` or equivalent — zero "Critical" or "Serious" violations.
  - [ ] Validate against [EVALS.md](../knowledge/EVALS.md) case **G09**.
  - [ ] **Comment Audit:** Remove redundant "What" comments.
  - [ ] **Finalize** by executing the `context-sync` template to update [CONTEXT.md](../context/CONTEXT.md) and relevant local `TASKS.md`.

### 3. `context-sync`

- **Goal:** Maintain session integrity and prevent context drift.
- **Action:** Update [CONTEXT.md](../context/CONTEXT.md) and [TASKS.md](../../packages/engine/TASKS.md) (or relevant local tasks) after a successful implementation or architectural change.

---

_Note: Use these templates strictly when triggered by name to ensure repeatable, high-fidelity results._
