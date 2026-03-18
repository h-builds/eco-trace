# Eco-Trace Prompt Library (v1.0)

Standardized versioned system prompts for mission-critical workflows.

## Templates

### 1. `go-logic-implementation`
- **Context:** Reference [.ai/skills/esg-validation-logic.md](../skills/esg-validation-logic.md).
- **Goal:** Implement deterministic Go logic with 100% test coverage for ESG calculations.
- **Checklist:**
  - [ ] Read [DATA_DICTIONARY.md](../knowledge/DATA_DICTIONARY.md) for formulas and constraints.
  - [ ] Create a failing test case in the target package.
  - [ ] Implement the logic in Go, ensuring Wasm compatibility.
  - [ ] Verify against [EVALS.md](../knowledge/EVALS.md) (G03/G04).

### 2. `ui-component-audit`
- **Context:** Reference [.ai/skills/accessibility-guardrail.md](../skills/accessibility-guardrail.md).
- **Goal:** Build a React or Vue component that meets strict WCAG 2.1 Level AA compliance.
- **Checklist:**
  - [ ] Use `@eco-trace/ui` design tokens exclusively.
  - [ ] Run `pnpm test:accessibility` (contrast-validator.ts) and ensure pass.
  - [ ] Manually verify ARIA labels and keyboard focus paths.

### 3. `context-sync`
- **Goal:** Maintain session integrity and prevent context drift.
- **Action:** Update [CONTEXT.md](../context/CONTEXT.md) and [TASKS.md](../../packages/engine/TASKS.md) (or relevant local tasks) after a successful implementation or architectural change.

---
*Note: Use these templates strictly when triggered by name to ensure repeatable, high-fidelity results.*
