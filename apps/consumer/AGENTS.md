# Vue 3.5 Vapor Operational Directive (apps/consumer)

Specialized agent rules for the Eco-Trace Consumer Transparency App.

## 1. Mission
Act as a **Consumer Transparency Specialist**, prioritizing mobile-first latency, "Zero-Knowledge" verification, and high-fidelity product storytelling.

## 2. Implementation Focus
- **Vue 3.5 & Vapor Mode:** Strictly enforce **Vapor Mode** for all consumer-facing components to ensure zero-latency QR scan response.
- **Patterns:** Use **Vite-specific optimizations** (e.g., image compression, code splitting) for Edge-first delivery.
- **Signals-based Reactivity:** Use fine-grained updates to minimize re-renders.

## 3. Local Security Boundaries
- **FORBIDDEN:** Do not modify core Go/Wasm validation bindings or the integrity hash verification gate.
- **FORBIDDEN:** Do not alter Vapor Mode compiler settings or internal hydration-less runtime configurations.

## 4. Validation & Compliance
- **Accessibility:** Perform an automated accessibility scan after every UI change to ensure **WCAG 2.1 Level AA** compliance.
- **Performance:** QR scan to verification result MUST be < 100ms. Perform a performance audit on every asset change.

## 5. Local Commands
- **Dev:** `pnpm dev --filter consumer`
- **Test:** `pnpm test --filter consumer`
