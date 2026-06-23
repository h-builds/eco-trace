# Execution Roadmap: React 19 Admin Workstation

Implementation plan for the **Eco Trace Admin App** under **Phase 8 — Portfolio Demo Excellence**.

> **Source of truth:** `PLAN.md`  
> **Application scope:** `apps/admin` only  
> **Primary goal:** turn the existing React 19 Admin Dashboard into a recruiter-friendly enterprise auditor workstation demo without rebuilding completed core functionality.

---

## 0. Baseline Lock — Do Not Rebuild

> **Status:** Governance prerequisite  
> **Priority:** Critical

The Admin app already includes authentication, RBAC, analytics, entity management, threaded audit logs, D1 persistence, Wasm-backed integrity verification, and compliance export. Phase 8 must polish and narrate that foundation rather than replacing it.

### Tasks

- [ ] Mark this file as the active `apps/admin/TASKS.md` for Phase 8.
- [ ] Add a top-level note in `apps/admin/AGENTS.md` that Phase 8 is demo-polish and presentation-focused.
- [ ] Preserve existing React 19 App Router structure.
- [ ] Preserve existing Edge-compatible session architecture.
- [ ] Preserve existing D1 schema unless a demo fixture requires additive seed data.
- [ ] Preserve existing Wasm verification path.
- [ ] Preserve existing RBAC roles: `ADMIN`, `AUDITOR`, `VIEWER`.
- [ ] Preserve existing compliance export route and immutability behavior.
- [ ] Do not replace the Admin app with another framework.
- [ ] Do not introduce unverified AI claims into the Admin UI.

### Exit Criteria

- [ ] Agents understand that the Admin app is already functionally built.
- [ ] New work is additive, recruiter-facing, and scenario-driven.
- [ ] No completed Phase 6/7 feature is reimplemented from scratch.

---

## 1. Demo Mode Foundation

> **Type:** Product / UX / State  
> **Priority:** Critical

Create a clear demo context so recruiters immediately understand they are evaluating a portfolio demo, not a fake production ESG platform.

### Tasks

- [ ] Add a global `DemoModeBanner` component visible across `/dashboard/*`.
- [ ] Banner copy must clearly state: `Portfolio demo — seeded supply-chain verification scenario`.
- [ ] Add a shared `demoScenario.ts` module under `apps/admin/app/lib/` or `apps/admin/lib/`.
- [ ] Define canonical scenario metadata:
  - [ ] Scenario name: `Verified Product Journey`.
  - [ ] Asset ID: `ASSET-COFFEE-2026-001`.
  - [ ] Product name: `Andes Trace Coffee Lot 001`.
  - [ ] Trusted supplier: `Andes Organic Cooperative`.
  - [ ] Processing actor: `Veridian Processing Node`.
  - [ ] Logistics actor: `NorthStar Logistics`.
  - [ ] Auditor label: `Eco Trace Demo Auditor`.
- [ ] Expose scenario copy constants for reuse across Overview, Entities, Events, and Compliance pages.
- [ ] Add a small `Demo data only` label wherever seeded actors, assets, or reports are shown.
- [ ] Ensure no copy implies real customers, real certification, or production deployment.

### Exit Criteria

- [ ] Every Admin dashboard section clearly communicates that the data is seeded demo data.
- [ ] Demo copy is centralized and reusable.
- [ ] Recruiters understand the scenario without reading the README.

---

## 2. Recruiter-Friendly Login Experience

> **Type:** Auth UX / Demo Friction Removal  
> **Priority:** Critical

Make the login flow easy to test while preserving the existing RBAC architecture.

### Tasks

- [ ] Add visible demo credentials to `/login`.
- [ ] Add a `Use Demo Auditor` button that fills credentials without auto-submitting.
- [ ] Add a short login explainer:
  - [ ] `This workstation uses role-based access control to simulate an enterprise auditor surface.`
- [ ] Keep existing secure login and session validation intact.
- [ ] Ensure failed login states remain meaningful and accessible.
- [ ] Add a post-login redirect to `/dashboard/overview`.
- [ ] Add a small RBAC explanation card after login or inside the dashboard shell.
- [ ] Confirm logout still invalidates session and returns to `/login`.

### Exit Criteria

- [ ] A recruiter can log in without asking for credentials.
- [ ] RBAC is visible as an architecture feature, not hidden implementation detail.
- [ ] Authentication remains functional and does not become a fake bypass.

---

## 3. Admin Demo Navigation & Guided Journey

> **Type:** Navigation / UX Architecture  
> **Priority:** Critical

The Admin app must guide the reviewer through the story: overview → entities → events → compliance → consumer verification.

### Tasks

- [ ] Update dashboard navigation labels for recruiter clarity:
  - [ ] `Overview`
  - [ ] `Trusted Actors & Assets`
  - [ ] `Integrity Events`
  - [ ] `Compliance Export`
- [ ] Add a persistent `Guided Demo` stepper in dashboard layout or overview.
- [ ] Stepper must include:
  - [ ] `1. Review system health`
  - [ ] `2. Inspect trusted actors`
  - [ ] `3. Verify event integrity`
  - [ ] `4. Export evidence`
  - [ ] `5. Open consumer view`
- [ ] Add route-aware active states.
- [ ] Add `Open Consumer Verification App` CTA using `NEXT_PUBLIC_CONSUMER_URL`.
- [ ] Add fallback copy if `NEXT_PUBLIC_CONSUMER_URL` is missing.
- [ ] Add `Architecture Case Study` link using `NEXT_PUBLIC_CASE_STUDY_URL` or local docs fallback.

### Exit Criteria

- [ ] The reviewer always knows what to inspect next.
- [ ] Admin and Consumer apps feel connected as one ecosystem.
- [ ] Missing external URLs do not break the UI.

---

## 4. Overview Page — Executive Demo Surface

> **Type:** React 19 / Product Storytelling  
> **Priority:** Critical

Upgrade `/dashboard/overview` into the main recruiter-facing Admin landing page.

### Tasks

- [ ] Add a top hero section:
  - [ ] Title: `Auditor Workstation`.
  - [ ] Subtitle: `Govern trusted supply-chain claims, verify event integrity, and export audit-ready evidence.`
- [ ] Add a `Verified Product Journey` scenario card.
- [ ] Keep existing metric cards:
  - [ ] Total Carbon Footprint.
  - [ ] Active Assets.
  - [ ] Verified Events.
  - [ ] Integrity Violations.
- [ ] Add short plain-English descriptions under each metric.
- [ ] Add quick links to:
  - [ ] Trusted Actors & Assets.
  - [ ] Integrity Events.
  - [ ] Compliance Export.
  - [ ] Consumer Verification App.
- [ ] Add a `Why this matters in 2026` callout:
  - [ ] Focus on enterprise verification, governance, trust boundaries, and auditability.
  - [ ] Do not frame the project as wrapper SaaS.
- [ ] Ensure existing Server Components and Server Actions remain intact.
- [ ] Preserve progressive loading with Suspense where already implemented.

### Exit Criteria

- [ ] The overview page explains the value of the Admin app in under 30 seconds.
- [ ] Existing analytics still work.
- [ ] The page feels like a workstation entry point, not a marketing landing page.

---

## 5. Canonical Seed Data Alignment

> **Type:** Data / D1 / Demo Reliability  
> **Priority:** Critical

Ensure the Admin dashboard always has meaningful data for the canonical demo scenario.

### Tasks

- [ ] Review `apps/admin/lib/seed.ts` and `apps/admin/seed.sql`.
- [ ] Add or update deterministic seeded records for the canonical scenario.
- [ ] Ensure seeded data includes:
  - [ ] One primary asset: `ASSET-COFFEE-2026-001`.
  - [ ] At least three trusted actors.
  - [ ] At least one valid origin event.
  - [ ] At least one valid transform event.
  - [ ] At least one valid transport event.
  - [ ] At least one valid audit event.
  - [ ] At least one `INVALID` tamper event.
  - [ ] At least one `UNAUTHORIZED` actor event.
- [ ] Ensure event timestamps create a readable product journey.
- [ ] Ensure seeded values produce meaningful carbon-footprint totals.
- [ ] Ensure seeded public keys and signatures remain compatible with the Go/Wasm verification flow.
- [ ] Add a reset instruction to `apps/admin/README.md` or local admin docs.

### Exit Criteria

- [ ] Running the seed process restores the full demo scenario.
- [ ] Overview, Entities, Events, and Compliance all show coherent data.
- [ ] The seeded scenario matches the Consumer app contract.

---

## 6. Trusted Actors & Assets Page Polish

> **Type:** React / UX / Enterprise Context  
> **Priority:** High

Make `/dashboard/entities` clearly demonstrate enterprise governance of actors and assets.

### Tasks

- [ ] Rename page heading to `Trusted Actors & Assets`.
- [ ] Add a short explainer:
  - [ ] `Only trusted actors can contribute verifiable events to the product journey.`
- [ ] Add scenario filter or featured scenario section for `ASSET-COFFEE-2026-001`.
- [ ] Improve actor cards/table rows with:
  - [ ] Actor name.
  - [ ] Actor role/type.
  - [ ] Public key preview.
  - [ ] Status badge: `ACTIVE` / `REVOKED`.
  - [ ] Related asset count if available.
- [ ] Improve asset rows with:
  - [ ] Asset ID.
  - [ ] Product name.
  - [ ] Owner actor.
  - [ ] Created timestamp.
  - [ ] Link to related events.
- [ ] Keep Add Trusted Actor and Register Asset forms available.
- [ ] Add demo-safe form copy explaining changes affect the demo database only.
- [ ] Validate forms still follow `DATA_DICTIONARY.md` constraints.
- [ ] Add accessible empty states if no actors/assets are present.

### Exit Criteria

- [ ] The page communicates trust governance clearly.
- [ ] A reviewer can identify who is allowed to write trusted events.
- [ ] Forms remain functional and validated.

---

## 7. Integrity Events Page Polish

> **Type:** React / Wasm Storytelling / Audit UX  
> **Priority:** Critical

Turn `/dashboard/events` into the core technical proof of the demo.

### Tasks

- [ ] Rename page heading to `Integrity Events`.
- [ ] Add a short explainer:
  - [ ] `Every event is checked against payload integrity, actor trust, and deterministic ESG logic.`
- [ ] Add status legend for:
  - [ ] `VALID`.
  - [ ] `WARNING`.
  - [ ] `INVALID`.
  - [ ] `UNAUTHORIZED`.
- [ ] Preserve threaded audit trail grouping by `event_id`.
- [ ] Add visual grouping for the canonical product journey.
- [ ] Add readable event labels:
  - [ ] `Origin registered`.
  - [ ] `Processing completed`.
  - [ ] `Transport verified`.
  - [ ] `Audit reviewed`.
  - [ ] `Tamper attempt detected`.
  - [ ] `Unauthorized actor blocked`.
- [ ] Add a compact explanation of Ed25519 verification without overwhelming the reviewer.
- [ ] Preserve existing Wasm-backed verification behavior.
- [ ] Preserve tamper and impersonation testing flows if already implemented.
- [ ] Add a CTA: `Open this product in Consumer App`.
- [ ] Add querystring or asset ID handoff contract for Consumer:
  - [ ] `?asset=ASSET-COFFEE-2026-001`.

### Exit Criteria

- [ ] The page proves the technical depth of Eco Trace.
- [ ] A non-cryptography reviewer understands what failed and why.
- [ ] The Admin-to-Consumer transition is obvious.

---

## 8. Compliance Export Page Polish

> **Type:** Compliance UX / Evidence Export  
> **Priority:** Critical

Make `/dashboard/compliance` feel like the final evidence step in the Admin demo.

### Tasks

- [ ] Rename page heading to `Compliance Export`.
- [ ] Add a short explainer:
  - [ ] `Generate audit evidence from verified event history without mutating trusted values.`
- [ ] Preselect or highlight the canonical asset scenario where possible.
- [ ] Keep date-range and actor filters available.
- [ ] Add a `Recommended demo export` callout.
- [ ] Ensure PDF export includes:
  - [ ] Scenario name.
  - [ ] Asset ID.
  - [ ] Event statuses.
  - [ ] Actor identity metadata.
  - [ ] Integrity verification metadata.
  - [ ] Demo-data disclaimer.
- [ ] Ensure CSV export preserves raw event fields.
- [ ] Add success and failure states for export actions.
- [ ] Add a post-export CTA to open the Consumer Verification App.

### Exit Criteria

- [ ] Compliance export completes the recruiter journey.
- [ ] Exported files are clearly labeled as demo evidence.
- [ ] Raw verified values are not transformed incorrectly.

---

## 9. Admin Root Technical Showcase

> **Type:** Landing / Architecture / Recruiter Routing  
> **Priority:** High

Use the Admin root route as a lightweight technical showcase and entry point into the Auditor Workstation.

### Tasks

- [ ] Update `apps/admin/app/page.tsx` or equivalent root route.
- [ ] Add title:
  - [ ] `Eco Trace Admin Workstation`.
- [ ] Add subtitle:
  - [ ] `React 19 auditor surface for governing cryptographically verified supply-chain claims.`
- [ ] Add primary CTA:
  - [ ] `Enter Auditor Workstation` → `/dashboard/overview` or `/login` depending on auth state.
- [ ] Add secondary CTA:
  - [ ] `Open Consumer Verification App`.
- [ ] Add architecture strip:
  - [ ] `React 19`.
  - [ ] `Server Components`.
  - [ ] `Cloudflare D1`.
  - [ ] `Go/Wasm`.
  - [ ] `Ed25519`.
- [ ] Add brief explanation of why Admin and Consumer are separate apps.
- [ ] Add demo mode disclaimer.
- [ ] Use shared `@eco-trace/ui` tokens only.

### Exit Criteria

- [ ] Opening the Admin deployment root does not feel empty or confusing.
- [ ] Recruiters know where to start.
- [ ] The page complements, but does not duplicate, the Consumer landing.

---

## 10. Cross-App Contract with Consumer

> **Type:** Integration Contract / Navigation  
> **Priority:** Critical

Define the Admin-side contract for opening the matching Consumer product view.

### Tasks

- [ ] Add environment variable support:
  - [ ] `NEXT_PUBLIC_CONSUMER_URL`.
- [ ] Create helper function:
  - [ ] `getConsumerProductUrl(assetId: string)`.
- [ ] Use canonical format:
  - [ ] `${NEXT_PUBLIC_CONSUMER_URL}?asset=${assetId}`.
- [ ] Add fallback state when Consumer URL is not configured.
- [ ] Use this helper in:
  - [ ] Overview page.
  - [ ] Events page.
  - [ ] Compliance page.
  - [ ] Root technical showcase.
- [ ] Do not implement Consumer routing in Admin tasks.
- [ ] Document this contract for the future Consumer TASKS.md.

### Exit Criteria

- [ ] Admin consistently links to the same Consumer demo asset.
- [ ] Missing Consumer deployment does not break the Admin UI.
- [ ] Consumer work can be planned separately.

---

## 11. Admin Copy & Claim Truth Audit

> **Type:** Content QA / Portfolio Credibility  
> **Priority:** Critical

Ensure all Admin UI text is accurate, recruiter-friendly, and not over-claiming.

### Tasks

- [ ] Audit all Admin-facing copy.
- [ ] Replace unsupported claims such as:
  - [ ] Real certification.
  - [ ] Real customers.
  - [ ] Real production deployment.
  - [ ] Real enterprise integrations.
  - [ ] Real transaction volume.
- [ ] Use accurate language:
  - [ ] `demo`.
  - [ ] `seeded data`.
  - [ ] `portfolio-grade`.
  - [ ] `enterprise-inspired`.
  - [ ] `audit-ready architecture`.
- [ ] Add short explanations for technical terms:
  - [ ] RBAC.
  - [ ] Ed25519.
  - [ ] Go/Wasm.
  - [ ] Cloudflare D1.
  - [ ] Integrity status.
- [ ] Keep copy concise and professional.
- [ ] Avoid buzzword-heavy AI positioning.

### Exit Criteria

- [ ] Admin copy is truthful and strong.
- [ ] The project reads as enterprise verification architecture.
- [ ] The project does not read as a fake SaaS company.

---

## 12. UI Token & Accessibility Pass

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

## 13. Admin Error Handling & Observability Pass

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

## 14. Admin Documentation Touchpoints

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

## 15. Admin QA & Release Gate

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
