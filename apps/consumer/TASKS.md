# Execution Roadmap: Vue 3.5 Vapor Consumer App

Implementation plan for the public-facing product transparency scanner of the Eco-Trace ecosystem.

## 1. Foundation & Tooling

- [x] Scaffold Vue 3.5 app with Vite and enforce **Vapor Mode** compiler settings. `[TODO]`
- [x] Configure `tsconfig.json` with strict mode and path aliases (`@/`). `[TODO]`
- [x] Integrate Tailwind CSS v4 consuming **@eco-trace/ui** design tokens from `tokens.json`. `[TODO]`
- [x] Set up ESLint + Prettier with project-wide governance rules from [RULES.md](../../.ai/rules/RULES.md). `[TODO]`
- [x] Configure Vite build pipeline: code splitting, asset compression, Wasm loader plugin. `[TODO]`
- [x] Validate dev server boots with `pnpm dev --filter consumer` and produces zero warnings. `[TODO]`

## 2. Wasm Cryptographic Bridge (Client-Side)

- [x] Inject `engine.wasm` binary via Vite Wasm plugin with streaming instantiation. `[TODO]`
- [x] Expose `VerifySignature(payload, signature, publicKey)` binding to Vue composables. `[TODO]` **(Ref: G02)**
- [x] Expose `CalculateCarbonFootprint(events)` binding to Vue composables. `[TODO]` **(Ref: G03)**
- [x] Implement `useWasm()` composable with reactive readiness signal and error boundary. `[TODO]`
- [x] Enforce **read-only boundary**: consumer app MUST NOT call `SignEvent` or mutate engine state. `[TODO]` **(Ref: G01)**
- [x] Add integration test validating Wasm bridge initialization < 50ms. `[TODO]` **(Ref: G08)**

## 3. Data Hydration & Edge API

- [x] Implement `GET /api/events` client using `fetch` with typed response contracts from [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md). `[DONE]` **(Ref: G05)**
- [x] Add SWR (Stale-While-Revalidate) caching strategy for event history data. `[DONE]`
- [x] Implement optimistic UI hydration: render skeleton → stream verified data. `[DONE]`
- [x] Handle Cloudflare D1 edge latency with request deduplication and cache headers. `[DONE]`
- [x] Add error states for network failures and empty result sets. `[DONE]`

## 4. UI/UX: The "Zero-Knowledge" Scanner

- [ ] Implement HTML5 native QR Scanner using `getUserMedia` API with camera permission flow. `[TODO]`
- [ ] Build **Product Transparency View** with the following sub-components:
  - [ ] **Authenticity Badge**: Real-time `VerifySignature` result rendered as a trust indicator. `[TODO]` **(Ref: G02)**
  - [ ] **Formula Rendering**: Display $$CF_{total} = \sum (E_i \times EF_i)$$ with live-calculated values. `[TODO]` **(Ref: G03)**
  - [ ] **Audit Trail Timeline**: Chronological `SupplyChainEvent` history with actor and integrity status. `[TODO]` **(Ref: G07)**
- [ ] Consume **@eco-trace/ui** tokens for all colors, spacing, typography, and elevation — zero ad-hoc styles. `[TODO]`
- [ ] Implement mobile-first responsive layout with Vapor Mode signals-based reactivity. `[TODO]`

## 5. Performance & Compliance Gate

- [ ] Achieve < 100ms QR-scan-to-verification latency (end-to-end audit). `[TODO]` **(Ref: G08)**
- [ ] Run Vapor Mode DOM re-render checks: confirm zero unnecessary re-renders on data updates. `[TODO]`
- [ ] Pass **WCAG 2.1 AA** accessibility audit on all scanner and transparency views. `[TODO]`
- [ ] Validate Lighthouse performance score ≥ 95 on mobile profile. `[TODO]`
- [ ] Execute `pnpm test --filter consumer && pnpm test:accessibility` with zero failures. `[TODO]`

## 6. Portfolio Branding & Architectural Showcase

- [ ] **Technical Landing Page (Root `/`)**: Implement a "Case Study First" view using the @eco-trace/ui workbench aesthetic. `[TODO]`
- [ ] **Global Navigation & Ecosystem Bridge**:
  - [ ] Implement a minimal Navbar with a link to "Auditor Dashboard (React 19)" featuring an "external link" icon.
  - [ ] Navigation must prioritize mobile-first access for scanning functionality. `[TODO]`
- [ ] **Focused Hero Section**:
  - [ ] Single Primary CTA: "Launch QR Scanner" (Internal route to `/scanner`). `[TODO]`
- [ ] **"Vapor Mode vs. VDOM" Performance Breakdown**: Interactive section explaining the choice of Vue 3.5 Vapor for sub-100ms mobile verification. `[TODO]`
- [ ] **Collaborative Architecture Narrative**: Integration of the shared technical copy explaining the React/Vue/Go synergy. `[TODO]`
- [ ] **Mission Footer**: Global footer with the "Business-First" mantra and technical stack metadata. `[TODO]`

## 7. Future Scope / Backlog

- **PWA / Offline Mode**: Service Worker registration with offline-first asset caching for field use in low-connectivity supply chain environments.
- **i18n (Internationalization)**: Multi-language support for global supply chain actors — dynamic locale loading via Vite plugin, RTL layout support.
- **Edge Case Handling**: Graceful UX for invalid/malformed QR codes, camera permission denials, Wasm load failures, and expired or revoked signatures.
- **Edge Analytics Telemetry**: Anonymous scan-event telemetry piped to Cloudflare Analytics Engine for ecosystem health monitoring and adoption metrics.
- **Supply Chain Map Visualization**: Interactive geographic map rendering supplier-to-consumer journeys using verified event coordinates.
- **Comparative Footprint View**: Allow consumers to compare carbon footprints across similar products within the same category.

---

_Goal: Deliver a mobile-first, cryptographically-verified product transparency scanner with zero-trust architecture and sub-100ms verification latency._
