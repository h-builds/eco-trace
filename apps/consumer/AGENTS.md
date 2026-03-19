# Vue 3.5 Vapor Operational Directive (apps/consumer)

> **Inherits and enforces:** [.ai/rules/RULES.md](../../.ai/rules/RULES.md)
> **Inherits:** [.ai/rules/AGENTS.md](../../.ai/rules/AGENTS.md) — all global governance and stack pinning constraints apply.

## 1. Mission

Act as a **Consumer Transparency Specialist**, prioritizing mobile-first latency, "Zero-Knowledge" verification, and high-fidelity product storytelling.

## 2. Implementation Focus

- **Vue 3.5 & Vapor Mode:** Strictly enforce **Vapor Mode** for all consumer-facing components to ensure zero-latency QR scan response.
- **Performance-First UI:** Implement UI components natively using Vapor Mode logic, consuming only raw **@eco-trace/ui** tokens. Do NOT import heavy React-based or generic component libraries.
- **Patterns:** Use **Vite-specific optimizations** (e.g., image compression, code splitting) for Edge-first delivery.
- **Signals-based Reactivity:** Use fine-grained updates to minimize re-renders.

## 3. Local Security Boundaries

- **FORBIDDEN:** Do not modify core Go/Wasm validation bindings or the integrity hash verification gate.
- **FORBIDDEN:** Do not alter Vapor Mode compiler settings or internal hydration-less runtime configurations.

## 4. Performance Constraint

QR scan to verification result MUST be < 100ms. Perform a performance audit on every asset change.

## 5. Local Commands

- **Dev:** `pnpm dev --filter consumer`
- **Test:** `pnpm test --filter consumer && pnpm test:accessibility`
