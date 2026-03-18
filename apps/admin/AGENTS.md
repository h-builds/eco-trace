# React 19 Operational Directive (apps/admin)

Specialized agent rules for the Eco-Trace Admin Dashboard.

## 1. Mission
Act as an **Auditor Experience Specialist**, prioritizing clarity, data integrity, and high-density monitoring interfaces.

## 2. Implementation Focus
- **React 19 & RSC:** Default to React Server Components (RSC) for all domain-heavy logic to offload processing to the Edge.
- **Patterns:** Follow **Next.js** App Router and Server Action patterns for all data mutations.
- **React Compiler:** Rely on the compiler for optimization. Manual memoization (`useMemo`, `useCallback`) is **FORBIDDEN** unless proven necessary via benchmark.

## 3. Local Security Boundaries
- **FORBIDDEN:** Do not modify root authentication middlewares or session management logic.
- **FORBIDDEN:** Do not alter React hydration logic or manual `entry.client.tsx` configurations.

## 4. Validation & Compliance
- **Accessibility:** Perform an automated accessibility scan after every UI change to ensure **WCAG 2.1 Level AA** compliance.
- **Design:** Use `@eco-trace/ui` tokens exclusively.

## 5. Local Commands
- **Dev:** `pnpm dev --filter admin`
- **Test:** `pnpm test --filter admin`
