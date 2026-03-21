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

## 5. Code Hygiene & Zero-Slop Commenting

- **Prohibit Redundant Comments**: Do not describe obvious logic ("What").
- **Enforce "Why" Comments**: Only document non-obvious business logic, complex math (e.g., $CF_{total}$), or architectural trade-offs.
- **Self-Documentation**: Prioritize precise naming over explanatory comments.
- **Token Efficiency**: Unnecessary comments are a violation of the **Token Efficiency Protocol** and must be removed during refactoring.

## 6. Granular Context & .mdc Compatibility

To maximize model focus and minimize token waste, rules are segmented for granular activation.

- **Contextual Activation**: Rules defined in `.mdc` files or specific directories (e.g., `/packages/engine/`) take precedence over global rules. The agent must only "know" what is relevant to the current file or directory.
- **Token Efficiency (Rule Loading)**:
  - **Global**: Only "Core Rules" (Governance, Security, Zero-Hallucination) are loaded globally.
  - **Local**: "Framework Rules" (React 19, Vue 3, Go) are loaded ONLY when analyzing files within their respective packages.
- **Validation Logic**: Before any major tool-call or code generation, the agent MUST verify that the specific context for that module (e.g., Go/Wasm) is active and being followed.

## 7. UI Dependency First

- **Inheritance**: All UI components and styles MUST inherit from `@eco-trace/ui` tokens (colors, spacing, typography).
- **Prohibition**: The use of arbitrary Tailwind classes or inline styles that bypass the design tokens defined in `.ai/knowledge/DATA_DICTIONARY.md` is strictly **PROHIBITED**.
- **Enforcement**: Any PR or code block that recreates existing components or tokens locally in `apps/` is a violation of the Golden Standard.
- **Requirement Verification**: The agent MUST verify the contents of `packages/ui/` before proposing any new UI logic.

## 8. Mobile-First Viewport Constraint

- **No `max-width`**: The use of `max-width` on any layout container is strictly **PROHIBITED**. Eco-Trace is a mobile-first, Edge-first application (QR scan → verification). Layouts MUST scale fluidly from the smallest viewport up.
- **Breakpoints**: Use `min-width` media queries exclusively (e.g., `sm:`, `md:`, `lg:` in Tailwind). Never use `max-width` breakpoints as overrides.
- **Full-Bleed by Default**: All page-level containers use `width: 100%`. Horizontal padding is the only mechanism for inset spacing.

---

_Goal: Maximize architectural sustainability, eliminate AI slop, and ensure high-density context usage._
