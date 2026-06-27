# Execution Roadmap: React 19 Admin Workstation

Implementation plan for the **Eco Trace Admin App** under **Phase 8 — Portfolio Demo Excellence**.

> **Source of truth:** `PLAN.md`  
> **Application scope:** `apps/admin` only  
> **Primary goal:** turn the existing React 19 Admin Dashboard into a recruiter-friendly enterprise auditor workstation demo without rebuilding completed core functionality.

## Execution Order Summary

> Each section is annotated with its execution order `(N)`. Tasks at the same number can run in parallel. A task cannot start until all lower-numbered tasks are done.

| Order | Section | Dependencies |
|-------|---------|-------------|
| (1) | §0 Baseline Lock | None — start here |
| (2) | §1 Demo Mode Foundation | §0 complete |
| (3) | §5 Canonical Seed Data | §1 complete |
| (4) | §2 Recruiter-Friendly Login, §4 Overview Page | §5 complete (seed data) |
| (5) | §10 Cross-App Contract with Consumer | §5 complete, coordinate with Consumer §10 |
| (6) | §3 Demo Navigation, §6 Entities Polish, §7 Events Polish, §8 Compliance Polish | §10 complete (cross-app links) |
| (7) | §9 Admin Root Technical Showcase | §3,§6,§7,§8 complete |
| (8) | §11 Copy Audit, §12 UI Token & A11y, §13 Error Handling | §9 complete (all UI final) |
| (9) | §14 Documentation | §11,§12,§13 complete |
| (10) | §15 QA & Release Gate | §14 complete |

> [!IMPORTANT]
> **Admin §5 (Seed Data) blocks Consumer §5 and §11.** The Admin seed data defines the D1 records that Consumer reads. Finalize seed data before Consumer transparency work begins.

---

## 0. Baseline Lock — Do Not Rebuild — Execution Order (1)

> **Status:** Governance prerequisite  
> **Priority:** Critical

The Admin app already includes authentication, RBAC, analytics, entity management, threaded audit logs, D1 persistence, Wasm-backed integrity verification, and compliance export. Phase 8 must polish and narrate that foundation rather than replacing it.

### Tasks

- [x] Mark this file as the active `apps/admin/TASKS.md` for Phase 8.
- [x] Add a top-level note in `apps/admin/AGENTS.md` that Phase 8 is demo-polish and presentation-focused.
- [x] Preserve existing React 19 App Router structure.
- [x] Preserve existing Edge-compatible session architecture.
- [x] Preserve existing D1 schema unless a demo fixture requires additive seed data.
- [x] Preserve existing Wasm verification path.
- [x] Preserve existing RBAC roles: `ADMIN`, `AUDITOR`, `VIEWER`.
- [x] Preserve existing compliance export route and immutability behavior.
- [x] Do not replace the Admin app with another framework.
- [x] Do not introduce unverified AI claims into the Admin UI.

### Exit Criteria

- [x] Agents understand that the Admin app is already functionally built.
- [x] New work is additive, recruiter-facing, and scenario-driven.
- [x] No completed Phase 6/7 feature is reimplemented from scratch.

---

## 1. Demo Mode Foundation — Execution Order (2)

> **Type:** Product / UX / State  
> **Priority:** Critical

Create a clear demo context so recruiters immediately understand they are evaluating a portfolio demo, not a fake production ESG platform.

### Tasks

- [x] Add a global `DemoModeBanner` component visible across `/dashboard/*`.
- [x] Banner copy must clearly state: `Portfolio demo — seeded supply-chain verification scenario`.
- [x] Add a shared `demoScenario.ts` module under `apps/admin/app/lib/` or `apps/admin/lib/`.
- [x] Define canonical scenario metadata:
  - [x] Scenario name: `Verified Product Journey`.
  - [x] Asset ID: `ASSET-COFFEE-2026-001`.
  - [x] Product name: `Andes Trace Coffee Lot 001`.
  - [x] Trusted supplier: `Andes Organic Cooperative`.
  - [x] Processing actor: `Veridian Processing Node`.
  - [x] Logistics actor: `NorthStar Logistics`.
  - [x] Auditor label: `Eco Trace Demo Auditor`.
- [x] Expose scenario copy constants for reuse across Overview, Entities, Events, and Compliance pages.
- [x] Add a small `Demo data only` label wherever seeded actors, assets, or reports are shown.
- [x] Ensure no copy implies real customers, real certification, or production deployment.

### Exit Criteria

- [x] Every Admin dashboard section clearly communicates that the data is seeded demo data.
- [x] Demo copy is centralized and reusable.
- [x] Recruiters understand the scenario without reading the README.

---

## 2. Recruiter-Friendly Login Experience — Execution Order (4)

> **Type:** Auth UX / Demo Friction Removal  
> **Priority:** Critical

Make the login flow easy to test while preserving the existing RBAC architecture.

### Tasks

- [x] Add visible demo credentials to `/login`.
- [x] Add a `Use Demo Auditor` button that fills credentials without auto-submitting.
- [x] Add a short login explainer:
  - [x] `This workstation uses role-based access control to simulate an enterprise auditor surface.`
- [x] Keep existing secure login and session validation intact.
- [x] Ensure failed login states remain meaningful and accessible.
- [x] Add a post-login redirect to `/dashboard/overview`.
- [x] Add a small RBAC explanation card after login or inside the dashboard shell.
- [x] Confirm logout still invalidates session and returns to `/login`.

### Exit Criteria

- [x] A recruiter can log in without asking for credentials.
- [x] RBAC is visible as an architecture feature, not hidden implementation detail.
- [x] Authentication remains functional and does not become a fake bypass.

---

## 3. Admin Demo Navigation & Guided Journey — Execution Order (6)

> **Type:** Navigation / UX Architecture  
> **Priority:** Critical

The Admin app must guide the reviewer through the story: overview → entities → events → compliance → consumer verification.

### Tasks

- [x] Update dashboard navigation labels for recruiter clarity:
  - [x] `Overview`
  - [x] `Trusted Actors & Assets`
  - [x] `Integrity Events`
  - [x] `Compliance Export`
- [x] Add a persistent `Guided Demo` stepper in dashboard layout or overview.
- [x] Stepper must include:
  - [x] `1. Review system health`
  - [x] `2. Inspect trusted actors`
  - [x] `3. Verify event integrity`
  - [x] `4. Export evidence`
  - [x] `5. Open consumer view`
- [x] Add route-aware active states.
- [x] Add `Open Consumer Verification App` CTA using `NEXT_PUBLIC_CONSUMER_URL`.
- [x] Add fallback copy if `NEXT_PUBLIC_CONSUMER_URL` is missing.
- [x] Add `Architecture Case Study` link using `NEXT_PUBLIC_CASE_STUDY_URL` or local docs fallback.

### Exit Criteria

- [x] The reviewer always knows what to inspect next.
- [x] Admin and Consumer apps feel connected as one ecosystem.
- [x] Missing external URLs do not break the UI.

---

## 4. Overview Page — Executive Demo Surface — Execution Order (4)

> **Type:** React 19 / Product Storytelling  
> **Priority:** Critical

Upgrade `/dashboard/overview` into the main recruiter-facing Admin landing page.

### Tasks

- [x] Add a top hero section:
  - [x] Title: `Auditor Workstation`.
  - [x] Subtitle: `Govern trusted supply-chain claims, verify event integrity, and export audit-ready evidence.`
- [x] Add a `Verified Product Journey` scenario card.
- [x] Keep existing metric cards:
  - [x] Total Carbon Footprint.
  - [x] Active Assets.
  - [x] Verified Events.
  - [x] Integrity Violations.
- [x] Add short plain-English descriptions under each metric.
- [x] Add quick links to:
  - [x] Trusted Actors & Assets.
  - [x] Integrity Events.
  - [x] Compliance Export.
  - [x] Consumer Verification App.
- [x] Add a `Why this matters in 2026` callout:
  - [x] Focus on enterprise verification, governance, trust boundaries, and auditability.
  - [x] Do not frame the project as wrapper SaaS.
- [x] Ensure existing Server Components and Server Actions remain intact.
- [x] Preserve progressive loading with Suspense where already implemented.

### Exit Criteria

- [x] The overview page explains the value of the Admin app in under 30 seconds.
- [x] Existing analytics still work.
- [x] The page feels like a workstation entry point, not a marketing landing page.

---

## 5. Canonical Seed Data Alignment — Execution Order (3)

> **Type:** Data / D1 / Demo Reliability  
> **Priority:** Critical

Ensure the Admin dashboard always has meaningful data for the canonical demo scenario.

### Tasks

- [x] Review `apps/admin/lib/seed.ts` and `apps/admin/seed.sql`.
- [x] Add or update deterministic seeded records for the canonical scenario.
- [x] Ensure seeded data includes:
  - [x] One primary asset: `ASSET-COFFEE-2026-001`.
  - [x] At least three trusted actors.
  - [x] At least one valid origin event.
  - [x] At least one valid transform event.
  - [x] At least one valid transport event.
  - [x] At least one valid audit event.
  - [x] At least one `INVALID` tamper event.
  - [x] At least one `UNAUTHORIZED` actor event.
- [x] Ensure event timestamps create a readable product journey.
- [x] Ensure seeded values produce meaningful carbon-footprint totals.
- [x] Ensure seeded public keys and signatures remain compatible with the Go/Wasm verification flow.
- [x] Add a reset instruction to `apps/admin/README.md` or local admin docs.

### Exit Criteria

- [x] Running the seed process restores the full demo scenario.
- [x] Overview, Entities, Events, and Compliance all show coherent data.
- [x] The seeded scenario matches the Consumer app contract.

---

## 6. Trusted Actors & Assets Page Polish — Execution Order (6)

> **Type:** React / UX / Enterprise Context  
> **Priority:** High

Make `/dashboard/entities` clearly demonstrate enterprise governance of actors and assets.

### Tasks

- [x] Rename page heading to `Trusted Actors & Assets`.
- [x] Add a short explainer:
  - [x] `Only trusted actors can contribute verifiable events to the product journey.`
- [x] Add scenario filter or featured scenario section for `ASSET-COFFEE-2026-001`.
- [x] Improve actor cards/table rows with:
  - [x] Actor name.
  - [x] Actor role/type.
  - [x] Public key preview.
  - [x] Status badge: `ACTIVE` / `REVOKED`.
  - [x] Related asset count if available.
- [x] Improve asset rows with:
  - [x] Asset ID.
  - [x] Product name.
  - [x] Owner actor.
  - [x] Created timestamp.
  - [x] Link to related events.
- [x] Keep Add Trusted Actor and Register Asset forms available.
- [x] Add demo-safe form copy explaining changes affect the demo database only.
- [x] Validate forms still follow `DATA_DICTIONARY.md` constraints.
- [x] Add accessible empty states if no actors/assets are present.

### Exit Criteria

- [x] The page communicates trust governance clearly.
- [x] A reviewer can identify who is allowed to write trusted events.
- [x] Forms remain functional and validated.

---

## 7. Integrity Events Page Polish — Execution Order (6)

> **Type:** React / Wasm Storytelling / Audit UX  
> **Priority:** Critical

Turn `/dashboard/events` into the core technical proof of the demo.

### Tasks

- [x] Rename page heading to `Integrity Events`.
- [x] Add a short explainer:
  - [x] `Every event is checked against payload integrity, actor trust, and deterministic ESG logic.`
- [x] Add status legend for:
  - [x] `VALID`.
  - [x] `WARNING`.
  - [x] `INVALID`.
  - [x] `UNAUTHORIZED`.
- [x] Preserve threaded audit trail grouping by `event_id`.
- [x] Add visual grouping for the canonical product journey.
- [x] Add readable event labels:
  - [x] `Origin registered`.
  - [x] `Processing completed`.
  - [x] `Transport verified`.
  - [x] `Audit reviewed`.
  - [x] `Tamper attempt detected`.
  - [x] `Unauthorized actor blocked`.
- [x] Add a compact explanation of Ed25519 verification without overwhelming the reviewer.
- [x] Preserve existing Wasm-backed verification behavior.
- [x] Preserve tamper and impersonation testing flows if already implemented.
- [x] Add a CTA: `Open this product in Consumer App`.
- [x] Add querystring or asset ID handoff contract for Consumer:
  - [x] `?asset=ASSET-COFFEE-2026-001`.

### Exit Criteria

- [x] The page proves the technical depth of Eco Trace.
- [x] A non-cryptography reviewer understands what failed and why.
- [x] The Admin-to-Consumer transition is obvious.

---

## 8. Compliance Export Page Polish — Execution Order (6)

> **Type:** Compliance UX / Evidence Export  
> **Priority:** Critical

Make `/dashboard/compliance` feel like the final evidence step in the Admin demo.

### Tasks

- [x] Rename page heading to `Compliance Export`.
- [x] Add a short explainer:
  - [x] `Generate audit evidence from verified event history without mutating trusted values.`
- [x] Preselect or highlight the canonical asset scenario where possible.
- [x] Keep date-range and actor filters available.
- [x] Add a `Recommended demo export` callout.
- [x] Ensure PDF export includes:
  - [x] Scenario name.
  - [x] Asset ID.
  - [x] Event statuses.
  - [x] Actor identity metadata.
  - [x] Integrity verification metadata.
  - [x] Demo-data disclaimer.
- [x] Ensure CSV export preserves raw event fields.
- [x] Add success and failure states for export actions.
- [x] Add a post-export CTA to open the Consumer Verification App.

### Exit Criteria

- [x] Compliance export completes the recruiter journey.
- [x] Exported files are clearly labeled as demo evidence.
- [x] Raw verified values are not transformed incorrectly.

---

## 9. Admin Root Technical Showcase — Execution Order (7)

> **Type:** Landing / Architecture / Recruiter Routing  
> **Priority:** High

Use the Admin root route as a lightweight technical showcase and entry point into the Auditor Workstation.

### Tasks

- [x] Update `apps/admin/app/page.tsx` or equivalent root route.
- [x] Add title:
  - [x] `Eco Trace Admin Workstation`.
- [x] Add subtitle:
  - [x] `React 19 auditor surface for governing cryptographically verified supply-chain claims.`
- [x] Add primary CTA:
  - [x] `Enter Auditor Workstation` → `/dashboard/overview` or `/login` depending on auth state.
- [x] Add secondary CTA:
  - [x] `Open Consumer Verification App`.
- [x] Add architecture strip:
  - [x] `React 19`.
  - [x] `Server Components`.
  - [x] `Cloudflare D1`.
  - [x] `Go/Wasm`.
  - [x] `Ed25519`.
- [x] Add brief explanation of why Admin and Consumer are separate apps.
- [x] Add demo mode disclaimer.
- [x] Use shared `@eco-trace/ui` tokens only.

### Exit Criteria

- [x] Opening the Admin deployment root does not feel empty or confusing.
- [x] Recruiters know where to start.
- [x] The page complements, but does not duplicate, the Consumer landing.

---

## 10. Cross-App Contract with Consumer — Execution Order (5)

> **Type:** Integration Contract / Navigation  
> **Priority:** Critical

Define the Admin-side contract for opening the matching Consumer product view.

### Tasks

- [x] Add environment variable support:
  - [x] `NEXT_PUBLIC_CONSUMER_URL`.
- [x] Create helper function:
  - [x] `getConsumerProductUrl(assetId: string)`.
- [x] Use canonical format:
  - [x] `${NEXT_PUBLIC_CONSUMER_URL}?asset=${assetId}`.
- [x] Add fallback state when Consumer URL is not configured.
- [x] Use this helper in:
  - [x] Overview page.
  - [x] Events page.
  - [x] Compliance page.
  - [x] Root technical showcase.
- [x] Do not implement Consumer routing in Admin tasks.
- [x] Document this contract for the future Consumer TASKS.md.

### Exit Criteria

- [x] Admin consistently links to the same Consumer demo asset.
- [x] Missing Consumer deployment does not break the Admin UI.
- [x] Consumer work can be planned separately.

---

## 11. Admin Copy & Claim Truth Audit — Execution Order (8)

> **Type:** Content QA / Portfolio Credibility  
> **Priority:** Critical

Ensure all Admin UI text is accurate, recruiter-friendly, and not over-claiming.

### Tasks

- [x] Audit all Admin-facing copy.
- [x] Replace unsupported claims such as:
  - [x] Real certification.
  - [x] Real customers.
  - [x] Real production deployment.
  - [x] Real enterprise integrations.
  - [x] Real transaction volume.
- [x] Use accurate language:
  - [x] `demo`.
  - [x] `seeded data`.
  - [x] `portfolio-grade`.
  - [x] `enterprise-inspired`.
  - [x] `audit-ready architecture`.
- [x] Add short explanations for technical terms:
  - [x] RBAC.
  - [x] Ed25519.
  - [x] Go/Wasm.
  - [x] Cloudflare D1.
  - [x] Integrity status.
- [x] Keep copy concise and professional.
- [x] Avoid buzzword-heavy AI positioning.

### Exit Criteria

- [x] Admin copy is truthful and strong.
- [x] The project reads as enterprise verification architecture.
- [x] The project does not read as a fake SaaS company.

---

## 12. UI Token & Accessibility Pass — Execution Order (8)

> **Type:** Design System / Accessibility  
> **Priority:** Critical

Preserve the project’s strict UI governance while polishing the Admin demo.

### Tasks

- [ ] Use `@eco-trace/ui` tokens for colors, spacing, typography, radii, and shadows.
- [ ] Do not introduce ad-hoc pixel values where tokens exist.
- [ ] Validate integrity badges have sufficient contrast.
- [ ] Validate form labels and error messages.
- [ ] Validate keyboard navigation for:
  - [ ] Login.
  - [ ] Dashboard navigation.
  - [ ] Entity forms.
  - [ ] Event details expansion.
  - [ ] Export buttons.
- [ ] Validate focus states for all interactive elements.
- [ ] Validate responsive layout for laptop and tablet widths.
- [ ] Ensure loading and error states are accessible.

### Exit Criteria

- [ ] Admin UI remains consistent with shared design governance.
- [ ] Recruiter-critical paths meet accessibility expectations.
- [ ] No polish task weakens visual or accessibility quality.

---

## 13. Admin Error Handling & Observability Pass — Execution Order (8)

> **Type:** Reliability / QA  
> **Priority:** High

Make failures understandable during a live recruiter demo.

### Tasks

- [ ] Ensure all Server Actions return meaningful user-facing errors.
- [ ] Ensure API route failures use centralized logging.
- [ ] Ensure export failures show actionable messages.
- [ ] Ensure missing D1 data shows a guided empty state.
- [ ] Ensure missing Wasm bridge shows a clear integrity-verification unavailable state.
- [ ] Ensure missing Consumer URL shows a non-breaking fallback.
- [ ] Ensure auth/session expiration returns the user to login with clear copy.
- [ ] Do not swallow exceptions silently.

### Exit Criteria

- [ ] A demo failure does not look like a broken app.
- [ ] Error states reinforce engineering maturity.
- [ ] Logs remain useful for debugging.

---

## 14. Admin Documentation Touchpoints — Execution Order (9)

> **Type:** Local Docs / Developer Experience  
> **Priority:** Medium

Add only the Admin-specific documentation needed to support the demo.

### Tasks

- [ ] Add or update `apps/admin/README.md`.
- [ ] Include:
  - [ ] Admin purpose.
  - [ ] Demo credentials.
  - [ ] Local setup commands.
  - [ ] Seed reset commands.
  - [ ] Required environment variables.
  - [ ] Routes overview.
  - [ ] Consumer URL contract.
- [ ] Add `apps/admin/docs/demo-flow.md` if local docs folder exists or is desired.
- [ ] Document recruiter path:
  - [ ] Login.
  - [ ] Overview.
  - [ ] Entities.
  - [ ] Events.
  - [ ] Compliance.
  - [ ] Consumer handoff.

### Exit Criteria

- [ ] Another developer can run and present the Admin demo.
- [ ] Admin-specific setup does not depend on hidden knowledge.
- [ ] Documentation remains concise.

---

## 15. Admin QA & Release Gate — Execution Order (10)

> **Type:** QA / Release  
> **Priority:** Critical

Validate that the Admin app is ready for public portfolio review.

### Required Commands

```bash
pnpm build --filter admin
pnpm test --filter admin
pnpm lint --filter admin
```

If workspace filtering differs in the repo, use the equivalent package scripts from `apps/admin/package.json`.

### Additional Validation

- [ ] Validate login with demo credentials.
- [ ] Validate session expiration behavior.
- [ ] Validate dashboard overview metrics load.
- [ ] Validate seeded actors and assets appear.
- [ ] Validate event integrity statuses appear correctly.
- [ ] Validate threaded audit trail expansion.
- [ ] Validate PDF export.
- [ ] Validate CSV export.
- [ ] Validate Consumer link generation.
- [ ] Validate missing Consumer URL fallback.
- [ ] Validate mobile/tablet dashboard layout.
- [ ] Validate keyboard-only navigation.
- [ ] Validate no unsupported production claims remain.

### Exit Criteria

- [ ] Admin app can be demoed in under 7 minutes.
- [ ] All recruiter-critical routes work.
- [ ] QA commands pass or documented exceptions are justified.
- [ ] Admin is ready to pair with the Consumer demo.

---

## 16. Non-Negotiable Boundaries

- Do not rebuild the Go/Wasm engine.
- Do not replace existing RBAC/session architecture.
- Do not remove compliance export functionality.
- Do not mutate verified values during export.
- Do not make the Admin demo depend on Consumer availability.
- Do not claim real enterprise integrations.
- Do not claim real compliance certification.
- Do not add AI anomaly detection UI unless the underlying feature is implemented and validated.
- Do not add broad SaaS billing, pricing, or tenant features for Phase 8.
- Do not prioritize new features over demo clarity.

---

## 17. Definition of Done — Admin Phase 8

The Admin app Phase 8 work is complete when:

- [ ] `apps/admin/TASKS.md` reflects this Phase 8 roadmap.
- [ ] Demo mode is visible across the Admin experience.
- [ ] Login is recruiter-friendly with demo credentials.
- [ ] Overview explains the Admin value proposition clearly.
- [ ] Entities page demonstrates trusted actor governance.
- [ ] Events page demonstrates valid, invalid, and unauthorized integrity states.
- [ ] Compliance export works for the canonical scenario.
- [ ] Admin links to the matching Consumer demo asset.
- [ ] Admin root route provides a clear entry point.
- [ ] Seeded data restores the canonical scenario.
- [ ] Admin copy contains no unsupported claims.
- [ ] Accessibility and UI token standards are preserved.
- [ ] Build, test, and lint pass for Admin.
- [ ] A recruiter can understand and test the Admin app without private explanation.

---

## 18. Final Admin Positioning

Use this positioning consistently inside the Admin app:

> **The Eco Trace Admin Workstation is the internal auditor surface for governing trusted actors, inspecting supply-chain event integrity, and exporting compliance-style evidence from a cryptographically verified product journey.**

Short version:

> **Audit the claim. Verify the actor. Export the evidence.**
