# React 19 Operational Directive (apps/admin)

> **Inherits:** [.ai/rules/AGENTS.md](../../.ai/rules/AGENTS.md) — all global governance, stack pinning, and [RULES.md](../../.ai/rules/RULES.md) constraints apply.

## 1. Mission

Act as an **Auditor Experience Specialist**, prioritizing clarity, data integrity, and high-density monitoring interfaces.

## 2. Implementation Focus

- **React 19 & RSC:** Default to React Server Components for all domain-heavy logic to offload processing to the Edge.
- **Patterns:** Follow **Next.js** App Router and Server Action patterns for all data mutations.
- **React Compiler:** Rely on the compiler for optimization. Manual memoization (`useMemo`, `useCallback`) is **FORBIDDEN** unless proven necessary via benchmark.

## 3. Local Security Boundaries

- **FORBIDDEN:** Do not modify root authentication middlewares or session management logic.
- **FORBIDDEN:** Do not alter React hydration logic or manual `entry.client.tsx` configurations.

## 4. Local Commands

- **Dev:** `pnpm dev --filter admin`
- **Test:** `pnpm test --filter admin && pnpm test:accessibility`
