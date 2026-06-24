# Execution Roadmap: Vue 3.5 Vapor Consumer Verification App

Implementation plan for the **Eco Trace Consumer App** under **Phase 8 — Portfolio Demo Excellence**.

> **Source of truth:** `PLAN.md`  
> **Application scope:** `apps/consumer` only  
> **Primary goal:** turn the existing Vue 3.5 Consumer App into a recruiter-friendly, no-friction public verification demo that connects clearly to the Admin Workstation scenario.

## Execution Order Summary

> Each section is annotated with its execution order `(N)`. Tasks at the same number can run in parallel. A task cannot start until all lower-numbered tasks are done.

| Order | Section | Dependencies |
|-------|---------|-------------|
| (1) | §0 Baseline Lock | None — start here |
| (2) | §1 Consumer Demo Mode Foundation | §0 complete |
| (4) | §2 No-Camera Demo Path, §3 Static QR, §4 Scanner Hardening | §1 complete (demo constants) |
| (5) | §10 Cross-App Bridge, §11 Data Contract Alignment | Admin §5 (seed data) complete |
| (6) | §5 Transparency Screen, §6 Badge Polish, §7 Carbon Formula, §8 Timeline | §10,§11 complete (contracts + data) |
| (7) | §9 Landing Page Recruiter Journey | §5,§6,§7,§8 complete |
| (8) | §12 Accessibility & Mobile QA, §13 Performance Gate | §9 complete (all UI final) |
| (9) | §14 Documentation | §12,§13 complete |
| (10) | §15 Release Checklist | §14 complete |

> [!WARNING]
> **Consumer §5 and §11 are blocked by Admin §5 (Seed Data).** The Consumer app reads from the same D1 database that Admin seeds. Do not finalize transparency screen or data contract work until Admin seed data is stable.

---

## 0. Baseline Lock — Do Not Rebuild — Execution Order (1)

> **Status:** Governance prerequisite  
> **Priority:** Critical

The Consumer app already includes a Vue 3.5 + Vite foundation, Vapor-oriented rendering, shared `@eco-trace/ui` tokens, a read-only Wasm bridge, typed event hydration, QR scanner, Product Transparency View, Authenticity Badge, Formula Renderer, Audit Trail Timeline, mobile-first layout, and performance/accessibility validation targets.

Phase 8 must polish and narrate that foundation rather than replacing it.

### Tasks

- [x] Mark this file as the active `apps/consumer/TASKS.md` for Phase 8.
- [x] Add a top-level note in `apps/consumer/AGENTS.md` that Phase 8 is demo-polish and presentation-focused.
- [x] Preserve the existing Vue 3.5 + Vite architecture.
- [x] Preserve the existing Vapor-compatible reactive patterns.
- [x] Preserve the existing read-only Consumer boundary.
- [x] Preserve the existing Wasm bridge for verification and carbon-footprint calculation.
- [x] Preserve the existing typed API client and SWR-style hydration.
- [x] Preserve the existing scanner and transparency view components unless additive polish is needed.
- [x] Preserve `@eco-trace/ui` token usage; do not introduce ad-hoc visual constants.
- [x] Do not replace the Consumer app with React, Next.js, or another framework.
- [x] Do not add unsupported real-world certification, customer, or production claims.
- [x] Do not introduce AI claims unless functionality is implemented and validated.

### Exit Criteria

- [x] Agents understand that the Consumer app is already functionally built.
- [x] New work is additive, recruiter-facing, and scenario-driven.
- [x] No completed Consumer foundation feature is reimplemented from scratch.

---

## 1. Consumer Demo Mode Foundation — Execution Order (2)

> **Type:** Product / UX / State  
> **Priority:** Critical

Create a clear demo context so recruiters understand they are evaluating a portfolio verification surface, not a live production ESG certification system.

### Tasks

- [x] Add a persistent `DemoModeBanner` component visible on landing, scanner, and transparency views.
- [x] Banner copy must clearly state: `Portfolio demo — seeded product verification scenario`.
- [x] Add a shared `demoScenario.ts` module under `apps/consumer/src/lib/demo/`.
- [x] Define canonical scenario metadata:
  - [x] Scenario name: `Verified Product Journey`.
  - [x] Asset ID: `ASSET-COFFEE-2026-001`.
  - [x] Product name: `Andes Trace Coffee Lot 001`.
  - [x] Supplier: `Andes Organic Cooperative`.
  - [x] Processor: `Veridian Processing Node`.
  - [x] Logistics partner: `NorthStar Logistics`.
  - [x] Consumer-facing claim: `Product claims, verified.`
- [x] Expose scenario copy constants for Landing, Scanner, Transparency, and empty/error states.
- [x] Add a small `Demo data only` label wherever seeded product or actor information is shown.
- [x] Ensure no copy implies real customers, real certifications, real transaction volume, or production deployment.

### Exit Criteria

- [x] Every Consumer view clearly communicates that the product data is seeded demo data.
- [x] Demo copy is centralized and reusable.
- [x] Recruiters understand the product scenario without reading the README.

---

## 2. No-Camera Demo Product Path — Execution Order (4)

> **Type:** UX / Demo Friction Removal  
> **Priority:** Critical

The Consumer app must be testable from desktop, mobile, and restricted browser environments without requiring real camera access.

### Tasks

- [x] Add a primary `Use Demo Product` CTA to the landing page and scanner screen.
- [x] The CTA must load the canonical product scenario directly.
- [x] Add a `Try without camera` secondary action near the QR scanner.
- [x] Ensure the no-camera path uses the same data contract as the QR scan path.
- [x] Ensure the no-camera path routes to the same `TransparencyScreen` as a successful scan.
- [x] Add deterministic demo asset lookup using `ASSET-COFFEE-2026-001`.
- [x] Add explicit note: `No camera required for demo review.`
- [x] Ensure the no-camera path works on desktop and mobile.
- [x] Add a test covering the no-camera demo product path.

### Exit Criteria

- [x] A recruiter can evaluate the Consumer app without camera permission.
- [x] The demo product path does not bypass verification UI.
- [x] The QR and no-camera flows converge into one transparency experience.

---

## 3. Static QR Demo Asset — Execution Order (4)

> **Type:** UX / QR Demo Support  
> **Priority:** Critical

Provide a visible QR artifact for the canonical product scenario so the app can be demonstrated in person, on video, or from a second device.

### Tasks

- [x] Generate or add a static QR image for `ASSET-COFFEE-2026-001`.
- [x] Store the QR asset under `apps/consumer/src/assets/` or `apps/consumer/public/`.
- [x] Add a `Demo QR` section to the scanner view.
- [x] Ensure the QR encodes a stable demo payload or route understood by the app.
- [x] Add copy explaining that the QR points to the seeded product journey.
- [x] Ensure the QR image is accessible with meaningful `alt` text.
- [x] Ensure the static QR does not require external services to work.
- [x] Add a small instruction: `Scan this code from another device or use the demo button.`

### Exit Criteria

- [x] The demo can be shown with either a real scan or the fallback button.
- [x] The QR asset maps to the canonical product scenario.
- [x] The QR section improves the demo without cluttering the mobile UI.

---

## 4. Scanner Experience Hardening — Execution Order (4)

> **Type:** Vue / Browser Permissions / Error Handling  
> **Priority:** Critical

Make scanner behavior graceful across browser restrictions, denied permissions, unsupported devices, and malformed QR payloads.

### Tasks

- [x] Review `useScanner.ts` for permission, startup, stop, and cleanup behavior.
- [x] Add a clear camera permission denied state.
- [x] Add an unsupported camera/browser state.
- [x] Add a malformed QR code state.
- [x] Add an expired or unknown asset state if the payload cannot be resolved.
- [x] Add a retry action that restarts scanner initialization safely.
- [x] Add a fallback action to `Use Demo Product` in every scanner error state.
- [x] Ensure scanner resources are released when leaving the scanner view.
- [x] Ensure scanner initialization does not trigger repeated unnecessary renders.
- [x] Ensure all scanner states are keyboard-accessible and screen-reader friendly.

### Exit Criteria

- [x] Camera failure never blocks demo evaluation.
- [x] Error messages are understandable to non-technical reviewers.
- [x] Scanner lifecycle remains stable and performant.

---

## 5. Transparency Screen Scenario Alignment — Execution Order (6)

> **Type:** Vue / Product Storytelling  
> **Priority:** Critical

Ensure the Product Transparency View clearly maps to the same product and events shown in the Admin Workstation.

### Tasks

- [x] Update `TransparencyScreen.vue` to lead with the canonical product identity.
- [x] Display:
  - [x] Product name: `Andes Trace Coffee Lot 001`.
  - [x] Asset ID: `ASSET-COFFEE-2026-001`.
  - [x] Verification status.
  - [x] Last verified timestamp.
  - [x] Short trust summary.
- [x] Add a `Verified Product Journey` section summarizing the supply-chain path.
- [x] Ensure event timeline steps align with Admin seeded events:
  - [x] Origin.
  - [x] Transform.
  - [x] Transport.
  - [x] Audit.
- [x] Show invalid or unauthorized events only if they are meant to educate the user; otherwise summarize them as auditor-only findings.
- [x] Add plain-language copy explaining what was verified.
- [x] Add CTA: `Open Auditor Workstation` using `VITE_ADMIN_URL`.
- [x] Add fallback copy if `VITE_ADMIN_URL` is missing.

### Exit Criteria

- [x] Consumer view and Admin scenario tell the same story.
- [x] Product verification is understandable without ESG domain knowledge.
- [x] The Consumer app feels like the public trust surface of the Admin system.

---

## 6. Authenticity Badge Polish — Execution Order (6)

> **Type:** Vue / Trust UX  
> **Priority:** High

Make the authenticity result immediate, credible, and easy to understand.

### Tasks

- [x] Review `AuthenticityBadge.vue` for all supported integrity states.
- [x] Ensure states map consistently to the data dictionary:
  - [x] `VALID`.
  - [x] `WARNING`.
  - [x] `INVALID`.
  - [x] `UNAUTHORIZED`.
- [x] Add short plain-English explanations:
  - [x] `VALID`: `The product history matches trusted actor signatures.`
  - [x] `WARNING`: `The product data is readable, but one validation check needs review.`
  - [x] `INVALID`: `The payload appears modified or failed integrity checks.`
  - [x] `UNAUTHORIZED`: `The signature may be valid, but the actor is not trusted.`
- [x] Ensure badge colors use `@eco-trace/ui` tokens only.
- [x] Ensure contrast meets WCAG 2.1 AA.
- [x] Add a compact mobile layout.
- [x] Add tests for badge state rendering.

### Exit Criteria

- [x] Trust status is understandable in less than five seconds.
- [x] Integrity language is accurate and not overclaimed.
- [x] Badge visual states remain token-compliant and accessible.

---

## 7. Carbon Formula & ESG Explanation Polish — Execution Order (6)

> **Type:** Vue / Data Explanation  
> **Priority:** High

Explain the deterministic carbon-footprint calculation without overwhelming the reviewer or consumer.

### Tasks

- [x] Review `FormulaRenderer.vue` for clarity and responsiveness.
- [x] Display the formula:
  - [x] `CF_total = Σ(E_i × EF_i)`.
- [x] Add plain-English helper text:
  - [x] `Each supply-chain step contributes energy usage multiplied by its emissions factor.`
- [x] Show the final calculated value for the canonical product.
- [x] Show individual event contributions only if the UI remains clear.
- [x] Add a note that the calculation is deterministic and shared with the Admin verification model.
- [x] Avoid claiming regulatory compliance unless clearly marked as demo/future-ready.
- [x] Ensure mathematical values come from the existing verified event data, not hardcoded UI strings.
- [x] Add tests for formula rendering and value display.

### Exit Criteria

- [x] The formula supports the technical story without confusing non-technical reviewers.
- [x] Values remain connected to the verification data path.
- [x] No unsupported compliance claim is introduced.

---

## 8. Audit Timeline Consumer Polish — Execution Order (6)

> **Type:** Vue / Timeline UX  
> **Priority:** High

Make the audit timeline feel like a consumer-friendly version of the Admin event trail.

### Tasks

- [x] Review `AuditTimeline.vue` event ordering and labels.
- [x] Ensure timeline events are chronological.
- [x] Use human-readable event labels:
  - [x] `Origin registered`.
  - [x] `Processing verified`.
  - [x] `Transport verified`.
  - [x] `Auditor reviewed`.
- [x] Show actor names from the canonical scenario.
- [x] Show integrity status per event with accessible labels.
- [x] Add compact mobile timeline behavior.
- [x] Add an `Auditor-only findings` summary if invalid/unauthorized events are included in consumer data.
- [x] Ensure timeline does not expose confusing raw cryptographic data by default.
- [x] Add optional `Technical details` disclosure for reviewers who want to inspect IDs, public keys, or signatures.

### Exit Criteria

- [x] The timeline is readable on mobile.
- [x] The journey maps to Admin seeded data.
- [x] Technical depth is available without overwhelming the default view.

---

## 9. Landing Page Recruiter Journey — Execution Order (7)

> **Type:** Vue / Portfolio UX  
> **Priority:** Critical

Refine the Consumer landing page so it becomes a clear public demo entry instead of only a product-marketing surface.

### Tasks

- [ ] Update hero positioning to match Phase 8:
  - [ ] Title: `Product claims, verified.`
  - [ ] Subtitle: `A public verification surface for a two-app enterprise trust architecture.`
- [ ] Add primary CTA: `Use Demo Product`.
- [ ] Add secondary CTA: `Open QR Scanner`.
- [ ] Add tertiary link: `Open Auditor Workstation` using `VITE_ADMIN_URL`.
- [ ] Add a short `How to evaluate this demo` section:
  - [ ] `1. Open the demo product.`
  - [ ] `2. Review authenticity and carbon footprint.`
  - [ ] `3. Compare the same product in the Admin Workstation.`
- [ ] Add a visual explanation of the two-surface architecture:
  - [ ] Consumer App: public verification.
  - [ ] Admin App: auditor governance.
  - [ ] Go/Wasm: shared trust engine.
  - [ ] D1: edge persistence.
- [ ] Remove or reword unsupported trust signals such as real transaction counts, real ISO certification, or unverifiable ratings.
- [ ] Preserve the existing industrial editorial identity if it is token-compliant.

### Exit Criteria

- [ ] A recruiter understands within 30 seconds what the Consumer app does.
- [ ] The landing page routes users to both demo paths.
- [ ] No marketing claim exceeds what the repository demonstrates.

---

## 10. Cross-App Bridge to Admin — Execution Order (5)

> **Type:** Navigation / Environment Configuration  
> **Priority:** Critical

The Consumer app must feel connected to the React Admin Workstation as part of one ecosystem.

### Tasks

- [x] Add `VITE_ADMIN_URL` to `.env.example`.
- [x] Add `VITE_CASE_STUDY_URL` to `.env.example` if needed.
- [x] Add a shared environment helper for external demo URLs.
- [x] Add `Open Auditor Workstation` CTA in:
  - [x] Landing page.
  - [x] Scanner view.
  - [x] Transparency screen.
  - [x] Footer.
- [x] Ensure missing environment variables produce safe fallback text instead of broken links.
- [x] Add `Back to Consumer Demo` copy guidelines for Admin handoff, if referenced.
- [x] Ensure external links have accessible labels and safe target attributes.

### Exit Criteria

- [x] Consumer and Admin feel like two surfaces of the same system.
- [x] Environment-specific URLs are configurable without code changes.
- [x] Missing URLs do not break the public demo.

---

## 11. Data Contract Alignment with Admin — Execution Order (5)

> **Type:** API / Types / Demo Consistency  
> **Priority:** Critical

Ensure the Consumer app consumes the same canonical scenario used by the Admin app.

### Tasks

- [x] Review `src/lib/api/types.ts` against the shared data dictionary.
- [x] Review `src/lib/api/client.ts` for asset-specific lookup support.
- [x] Add or confirm support for fetching events by `asset_id`.
- [x] Ensure Consumer app router accepts the querystring contract `?asset=${assetId}` sent by the Admin Workstation.
- [x] Ensure `ASSET-COFFEE-2026-001` maps to the seeded Admin scenario.
- [x] Ensure Consumer does not mutate or sign events.
- [x] Ensure Consumer only verifies, calculates, and displays read-only data.
- [x] Add fallback demo data only if clearly labeled and isolated from production-like API paths.
- [x] Add tests confirming Consumer event types match the expected scenario shape.

### Exit Criteria

- [x] Consumer product data matches Admin seed data.
- [x] Consumer remains read-only.
- [x] Type contracts stay aligned with the shared traceability schema.

---

## 12. Accessibility & Mobile QA — Execution Order (8)

> **Type:** QA / WCAG / Mobile  
> **Priority:** Critical

Preserve the Consumer app's credibility as a mobile-first public verification surface.

### Tasks

- [ ] Run accessibility audit for:
  - [ ] Landing page.
  - [ ] Scanner view.
  - [ ] Camera denied state.
  - [ ] Demo product path.
  - [ ] Transparency screen.
- [ ] Ensure all CTAs have accessible names.
- [ ] Ensure all trust badges have non-color-only indicators.
- [ ] Ensure QR image has descriptive alt text.
- [ ] Ensure keyboard navigation works across demo-critical paths.
- [ ] Ensure touch targets are large enough for mobile.
- [ ] Ensure reduced-motion preferences are respected if animations exist.
- [ ] Validate mobile layout at common widths:
  - [ ] 320px.
  - [ ] 375px.
  - [ ] 430px.
  - [ ] 768px.
- [ ] Validate desktop layout for recruiter review.

### Exit Criteria

- [ ] Recruiter-critical paths pass WCAG 2.1 AA expectations.
- [ ] Mobile and desktop demo paths are both usable.
- [ ] Trust states are accessible without relying only on color.

---

## 13. Performance & Vapor Reactivity Gate — Execution Order (8)

> **Type:** Performance / Vue Runtime  
> **Priority:** High

Maintain the existing performance story while adding demo polish.

### Tasks

- [ ] Ensure no new heavy dependency is added for simple demo interactions.
- [ ] Confirm scanner fallback and demo product path do not increase startup cost significantly.
- [ ] Confirm Wasm loading remains lazy or appropriately scoped.
- [ ] Confirm no unnecessary re-renders are introduced in transparency view updates.
- [ ] Confirm landing page remains lightweight.
- [ ] Run existing latency and Vapor-related tests.
- [ ] Run Lighthouse mobile validation after UI changes.
- [ ] Document any performance exception if unavoidable.

### Required Commands

```bash
pnpm test --filter consumer
pnpm test:accessibility
pnpm build --filter consumer
```

If project scripts differ, use the closest existing workspace-specific equivalents and document the exact commands executed.

### Exit Criteria

- [ ] Consumer demo remains fast enough for public review.
- [ ] No-camera path feels instant.
- [ ] QR verification flow remains performant.
- [ ] Added demo polish does not undermine the Vapor/performance narrative.

---

## 14. Consumer Documentation Updates — Execution Order (9)

> **Type:** Documentation / Developer Experience  
> **Priority:** High

Document how to run, test, and evaluate the Consumer app as part of the Phase 8 demo.

### Tasks

- [ ] Update `apps/consumer/README.md` or create it if missing.
- [ ] Document:
  - [ ] App purpose.
  - [ ] Demo product path.
  - [ ] QR scanner path.
  - [ ] Required environment variables.
  - [ ] How to link to Admin.
  - [ ] How to run locally.
  - [ ] How to test.
  - [ ] What is seeded/demo data.
- [ ] Add a short `Recruiter evaluation path` section.
- [ ] Add `Troubleshooting camera access` section.
- [ ] Add note that Consumer is read-only and cannot mutate event state.
- [ ] Cross-link to root `PLAN.md` and future `docs/demo/demo-scenario.md`.

### Exit Criteria

- [ ] A reviewer can run or evaluate the Consumer app without private explanation.
- [ ] Camera fallback is documented.
- [ ] Consumer's role in the two-app ecosystem is clear.

---

## 15. Consumer Release Checklist — Execution Order (10)

> **Type:** Release / QA  
> **Priority:** Critical

Before publishing the demo, verify the Consumer app works as a standalone public verification surface and as part of the complete Eco Trace flow.

### Tasks

- [ ] Validate landing page loads.
- [ ] Validate `Use Demo Product` works.
- [ ] Validate QR scanner initializes when camera is allowed.
- [ ] Validate camera denied state works.
- [ ] Validate static QR maps to the demo product.
- [ ] Validate transparency screen loads canonical product data.
- [ ] Validate authenticity badge states.
- [ ] Validate carbon formula and final value display.
- [ ] Validate audit timeline order and labels.
- [ ] Validate `Open Auditor Workstation` links.
- [ ] Validate environment-variable fallbacks.
- [ ] Validate mobile layout.
- [ ] Validate accessibility.
- [ ] Validate production build.
- [ ] Capture current screenshots only after all copy and data are truthful.

### Required Commands

```bash
pnpm build
pnpm test
pnpm lint
```

Consumer-focused commands, if available:

```bash
pnpm build --filter consumer
pnpm test --filter consumer
pnpm lint --filter consumer
```

### Exit Criteria

- [ ] Public Consumer demo has no dead ends.
- [ ] Camera access is optional.
- [ ] Consumer and Admin scenario data align.
- [ ] No unsupported claims remain.
- [ ] The Consumer app is ready for LinkedIn, portfolio, and recruiter review.

---

## 16. Non-Negotiable Consumer Scope Boundaries

- Do not rebuild the Vue app foundation.
- Do not replace Vapor-oriented reactive patterns with unnecessary global state.
- Do not allow the Consumer app to sign, mutate, or persist supply-chain events.
- Do not introduce production ESG certification claims.
- Do not claim real customer or enterprise usage.
- Do not require camera access as the only demo path.
- Do not hardcode values that should come from the canonical event data.
- Do not introduce new visual constants outside `@eco-trace/ui` tokens.
- Do not add blockchain, billing, or AI features to the Consumer app during Phase 8.
- Do not make the Consumer app feel disconnected from the Admin Workstation.

---

## 17. Definition of Done

The Consumer Phase 8 work is complete when:

- [ ] `apps/consumer/TASKS.md` is aligned with root `PLAN.md`.
- [ ] Consumer demo has a no-camera path.
- [ ] Static QR demo asset is available.
- [ ] Scanner errors gracefully route to the demo product.
- [ ] Transparency screen shows the canonical product journey.
- [ ] Authenticity badge explains trust states clearly.
- [ ] Carbon formula is accurate and understandable.
- [ ] Audit timeline matches Admin seeded scenario.
- [ ] Landing page explains the recruiter path.
- [ ] Consumer links back to Admin Workstation.
- [ ] Accessibility and mobile QA pass.
- [ ] Performance/Vapor story is preserved.
- [ ] Documentation explains how to evaluate the Consumer app.
- [ ] No unsupported production, certification, AI, or customer claims remain.

---

## 18. Final Consumer Positioning

Use this positioning consistently inside the Consumer app and related documentation:

> **The Eco Trace Consumer App is the public verification surface of a two-app enterprise trust demo. It lets anyone inspect a seeded product journey, verify authenticity, review carbon-footprint logic, and understand how supply-chain claims become consumer-verifiable evidence.**

Short version:

> **Scan. Verify. Trust — without needing to understand the audit system behind it.**
