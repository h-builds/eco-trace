# Governance & Mission-Critical Rules: Eco-Trace

Operational constraints to ensure architectural integrity and minimize technical debt.

## 1. Hierarchy of Authority (Evidence-Based Action)
Agents MUST prioritize information in the following order:
1.  **Existing Repo Source Code**: The current implementation is the absolute source of truth.
2.  **Official Documentation**: RFCs, language specs (Go, TS, Vue), and framework guides.
3.  **Local Verified Patterns**: Implementations marked as "Best Practice" or existing patterns in `.ai/knowledge/`.
4.  **Generative Logic**: Only as a last resort, and must be audited for slop.

## 2. Security No-Go Zones
The following areas are **FORBIDDEN** for autonomous modification without explicit human approval via `notify_user`:
- `.env` and environment template files.
- `secrets.yaml` or any credential management files.
- Infrastructure-as-Code (Terraform, Cloudflare Wrangler configs).
- CI/CD workflow definitions (`.github/workflows`).

## 3. Coding & Delivery Strictness
- **TypeScript**: Enforce `strict: true` in all `tsconfig.json` files. No `any` types allowed.
- **Commits**: Use **Conventional Commits** (e.g., `feat:`, `fix:`, `chore:`) for every atomic change.
- **Verification**: Every logic change MUST be validated against "Golden" test cases in [EVALS.md](../knowledge/EVALS.md).

## 4. Discernibility & Technical Debt
- **Audit Requirement**: Every AI-generated tool, helper, or complex logic block MUST undergo a technical audit focusing on scalability and performance before merging.
- **Zero-Hallucination**: Cite specific file paths and line numbers before proposing edits. If a requirement is ambiguous, **STOP** and ask for clarification.

## 5. Granular Context & .mdc Compatibility
To maximize model focus and minimize token waste, rules are segmented for granular activation.

- **Contextual Activation**: Rules defined in `.mdc` files or specific directories (e.g., `/packages/engine/`) take precedence over global rules. The agent must only "know" what is relevant to the current file or directory.
- **Token Efficiency (Rule Loading)**:
  - **Global**: Only "Core Rules" (Governance, Security, Zero-Hallucination) are loaded globally.
  - **Local**: "Framework Rules" (React 19, Vue 3, Go) are loaded ONLY when analyzing files within their respective packages.
- **Validation Logic**: Before any major tool-call or code generation, the agent MUST verify that the specific context for that module (e.g., Go/Wasm) is active and being followed.

---
*Goal: Maximize architectural sustainability, eliminate AI slop, and ensure high-density context usage.*
