# Skill: Accessibility Guardrail Audit

Mandatory audit flow for all UI components to ensure mission-critical WCAG 2.1 Level AA compliance.

## Workflow Steps

### 1. Contrast Verification
- **Action:** Execute the internal validator located at [../../packages/ui/scripts/contrast-validator.ts](../../packages/ui/scripts/contrast-validator.ts) using `ts-node` or `tsx`.
- **Requirement:** Minimum ratio of **4.5:1** for normal text.
- **Note:** Do not attempt to manually estimate contrast ratios; always rely on the output of the `contrast-validator.ts` tool for Golden Standard compliance.

### 2. Semantic Integrity
- **Action:** Verify ARIA labels, roles, and keyboard navigation paths.
- **Requirement:** 100% screen reader compatibility.

### 3. Automated Scanning
- **Action:** Run an automated `axe-core` scan or equivalent accessibility audit tool.
- **Requirement:** Zero "Critical" or "Serious" violations.

## Completion Criteria
- Component meets [EVALS.md](../knowledge/EVALS.md) case **G09**. 
- **Validation Logic:** A failure in the `contrast-validator.ts` script output constitutes a failure of the **G09** eval case.
- Visual Audit against `@eco-trace/ui` tokens is successful.
