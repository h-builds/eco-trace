# Eco Trace — 2026 Portfolio Demo Excellence Plan

> **Status:** Active plan
> **Project type:** Collaborative portfolio demo
> **Primary goal:** Transform the completed Eco Trace system into a recruiter-friendly, 2026-grade enterprise verification demo without rebuilding the already implemented foundation.
> **Baseline Notice:** Previous core phases (Phases 1–7) are fully implemented, frozen as baseline, and archived. They must not be rebuilt or modified.

---

## 1. Executive Positioning

Eco Trace must be presented as an **Enterprise Verification Architecture Demo**, not as a generic SaaS product and not as an AI wrapper.

The project demonstrates how a modern engineering team can design trustworthy, auditable workflows across distributed supply-chain actors using:

- Role-specific interfaces.
- Cryptographic validation.
- Edge-native persistence.
- Deterministic carbon-footprint logic.
- Compliance-style reporting.
- A shared design system.
- A collaborative multi-application architecture.

### Portfolio Thesis

> In 2026, the hard problem is not generating another interface. The hard problem is making enterprise data trustworthy, verifiable, governable, and usable across different actors. Eco Trace demonstrates that problem through a supply-chain verification architecture.

### Public One-Liner

> **Eco Trace is a collaborative enterprise verification demo that turns supply-chain sustainability claims into cryptographically verifiable, audit-ready product histories.**

### What Eco Trace Is

- A portfolio-grade architecture demo.
- A two-app ecosystem: Admin Workstation + Consumer Verification App.
- A proof of engineering judgment across frontend, edge, cryptography, governance, and UX.
- A recruiter-friendly technical case study.

### What Eco Trace Is Not

- Not a production ESG compliance company.
- Not a blockchain project.
- Not a SaaS billing product.
- Not an AI wrapper.
- Not a claim of real ISO certification, real customers, or real enterprise deployment.

---

## 2. Existing Baseline — Do Not Rebuild

Eco Trace already has a meaningful technical foundation. The new plan must build on top of this foundation instead of reimplementing it.

### Admin App Baseline — React 19

The Admin app already includes:

- Auditor login flow.
- Edge-compatible session handling.
- RBAC roles: `ADMIN`, `AUDITOR`, `VIEWER`.
- Protected dashboard routes.
- Audit logging for authentication events.
- `/dashboard/overview` macro analytics.
- Carbon-footprint aggregation from D1.
- Time-range filters.
- Trusted Actor onboarding.
- Asset registration.
- Actor and asset list views.
- Compliance PDF export.
- Compliance CSV export.
- Event integrity metadata in reports.

### Consumer App Baseline — Vue 3.5 Vapor

The Consumer app already includes:

- Vue 3.5 + Vite foundation.
- Vapor-mode-oriented rendering strategy.
- Shared `@eco-trace/ui` tokens.
- Wasm bridge exposing verification and carbon-footprint calculation.
- Read-only consumer boundary.
- Typed event API client.
- SWR-style event hydration.
- Native QR scanner.
- Product Transparency View.
- Authenticity Badge.
- Carbon formula rendering.
- Audit Trail Timeline.
- Mobile-first responsive layout.
- Accessibility and latency validation targets.
- Technical landing page.

### Engine Baseline — Go/Wasm

The engine already supports:

- Deterministic carbon-footprint calculation.
- Ed25519 signing and verification flows.
- Integrity status mapping.
- Unauthorized actor detection.
- Wasm bridge usage from frontend applications.

### Governance Baseline

The repository already contains:

- Data dictionary.
- Functional specification.
- Evaluation framework.
- Architecture notes.
- Agent/governance instructions.
- Shared design tokens.

---

## 3. Active Mission

The active mission is **Portfolio Demo Excellence**.

The work should make Eco Trace easy to evaluate in under 10 minutes by a recruiter, hiring manager, or technical reviewer.

The demo must clearly answer:

1. What problem does Eco Trace solve?
2. Why does the architecture require two applications?
3. What does the React Admin app do?
4. What does the Vue Consumer app do?
5. Where does the Go/Wasm engine add technical depth?
6. How is trust verified?
7. How does the project map to 2026 AI Solutions Engineering instead of wrapper SaaS?
8. What was built, what is demo-only, and what is future scope?

---

## 4. Demo Experience Principle

A recruiter should not need local setup, private explanation, or domain knowledge to understand Eco Trace.

The final demo experience must support two paths:

### 4.1 Fast Recruiter Path — 2 to 3 Minutes

The reviewer should be able to:

1. Open the public demo landing.
2. Read the one-line thesis.
3. Click **Start Guided Demo**.
4. See the Admin Workstation with seeded data.
5. Click **View Consumer Experience**.
6. See the Consumer Transparency screen without needing a real camera.
7. Return to architecture/case-study view.

### 4.2 Technical Reviewer Path — 7 to 10 Minutes

The reviewer should be able to:

1. Inspect the demo scenario.
2. Log into Admin with demo credentials or one-click demo login.
3. View macro analytics.
4. Inspect trusted actors and assets.
5. Open the threaded audit trail.
6. Trigger or inspect a tamper/unauthorized actor scenario.
7. Export compliance evidence.
8. Open the Consumer App for the same product/asset.
9. Review architecture, trade-offs, and validation gates.
10. Visit the repository and understand how to run or evaluate the project.

---

## 5. Canonical Demo Scenario

All demo work must revolve around one clear scenario.

### Scenario Name

**Verified Product Journey**

### Story

A product batch moves through a supply chain:

1. Origin registered by a trusted supplier.
2. Transformation event added by a processing actor.
3. Transport event added by a logistics actor.
4. Audit event reviewed by an auditor.
5. A tamper attempt or unauthorized actor is detected.
6. A consumer scans the product QR and sees the verified product history.
7. The auditor exports compliance evidence.

### Required Demo Artifacts

The scenario must have deterministic seeded data for:

- One product asset.
- At least three trusted actors.
- At least one invalid event.
- At least one unauthorized actor event.
- At least one valid consumer-facing product timeline.
- At least one exportable compliance report.

### Naming Guideline

Use realistic but fictional names. Avoid names that imply real partnerships, certifications, or clients.

Example:

- `Andes Organic Cooperative`
- `NorthStar Logistics`
- `Veridian Processing Node`
- `ASSET-COFFEE-2026-001`

---

## 6. Application Roles

Eco Trace has two applications because it demonstrates two different enterprise surfaces.

### 6.1 Admin App — Auditor Workstation

The Admin app represents the internal enterprise user.

Its job is to show:

- Governance.
- RBAC.
- Actor and asset control.
- Integrity violations.
- Carbon-footprint aggregation.
- Audit logs.
- Compliance exports.
- Evidence review.

The Admin app should feel like a professional workstation, not a marketing website.

### 6.2 Consumer App — Public Verification Surface

The Consumer app represents the external public user.

Its job is to show:

- QR-driven verification.
- Read-only transparency.
- Product history.
- Authenticity status.
- Carbon-footprint explanation.
- Mobile-first trust experience.

The Consumer app should feel fast, simple, and credible.

### 6.3 Shared Engine — Verification Layer

The Go/Wasm engine represents the trust boundary.

Its job is to show:

- Deterministic logic.
- Cryptographic validation.
- Shared verification behavior across applications.
- Separation between UI and trust-critical logic.

---

## 7. Portfolio Upgrade Phases

### 7.1 Execution Order Summary

> Phases are annotated with execution order `(N)`. Lower numbers must complete before higher ones start. Admin and Consumer TASKS.md files use the same numbering.

| Order | Phase                            | Admin TASKS    | Consumer TASKS         | Root TASKS  |
| ----- | -------------------------------- | -------------- | ---------------------- | ----------- |
| (1)   | 8.0 Scope Lock & Truth Alignment | §0             | §0                     | §0          |
| (2)   | 8.1 + 8.2 + 8.3 Demo Scenario    | §1             | §1                     | —           |
| (3)   | 8.2 Seed Data                    | §5             | — (blocked until done) | —           |
| (4)   | 8.2 + 8.3 Core Pages             | §2, §4         | §2, §3, §4             | —           |
| (5)   | 8.1 Cross-App Contracts          | §10            | §10, §11               | —           |
| (6)   | 8.2 + 8.3 Deep Pages             | §3, §6, §7, §8 | §5, §6, §7, §8         | —           |
| (7)   | 8.1 + 8.2 + 8.3 Landing Pages    | §9             | §9                     | §1 Demo Hub |
| (8)   | 8.0 + 8.5 Copy & QA              | §11, §12, §13  | §12, §13               | —           |
| (9)   | 8.4 Documentation                | §14            | §14                    | §2–§7       |
| (10)  | 8.5 Release Gate                 | §15            | §15                    | §8–§10      |
| (11)  | 8.6 Optional                     | —              | —                      | §11         |

> [!IMPORTANT]
> **Critical path:** Admin §5 (Seed Data) at order (3) blocks Consumer §5 and §11. The Admin seed data defines the D1 records that the Consumer app reads.

## Phase 8.0 — Scope Lock & Truth Alignment — Execution Order (1)

**Type:** Governance / Documentation
**Owner:** Project maintainers
**Priority:** Critical

### Objective

Freeze the completed technical foundation and align all documentation with the real current state of the project.

### Tasks

- [x] Replace outdated phase references in `README.md`, `CONTEXT.md`, and dashboard/consumer roadmap docs.
- [x] Define current phase as `Phase 8 — Portfolio Demo Excellence`.
- [x] Add a clear note that previous core phases are baseline and must not be rebuilt.
- [x] Remove or reword any unsupported claims such as real certifications, real transaction counts, real customers, or real enterprise deployment.
- [x] Separate `Implemented`, `Demo Scenario`, and `Future Scope` sections across documentation.
- [x] Add a short `docs/demo/truth-and-scope.md` file explaining what is real, mocked, seeded, or future-facing.

### Exit Criteria

- [x] A technical reviewer can distinguish implemented features from demo data and future roadmap.
- [x] No README claim exceeds what the repository can demonstrate.
- [x] Agents understand that Phase 8 is additive and presentation-focused.

---

## Phase 8.1 — Unified Demo Entry & Recruiter Journey — Execution Order (2, 5, 7)

**Type:** Product / UX / Demo Orchestration
**Owner:** Product + Frontend
**Priority:** Critical

### Objective

Create a recruiter-friendly entry point that explains the ecosystem and routes users into both applications without confusion.

### Tasks

- [x] Create or refine a public **Demo Hub** experience.
- [x] Add clear CTAs:
  - `Start Guided Demo`
  - `Open Auditor Workstation`
  - `Open Consumer Verification App`
  - `Read Architecture Case Study`

- [x] Add a visual system map explaining:
  - React Admin App.
  - Vue Consumer App.
  - Go/Wasm Verification Engine.
  - Cloudflare D1 persistence.

- [x] Add a 3-step recruiter flow:
  - `1. Audit the claim`
  - `2. Verify the product`
  - `3. Inspect the architecture`

- [x] Add frictionless cross-navigation between Admin and Consumer deployments.
- [x] Add a visible **Demo Mode** label to avoid pretending the system is production.

### Extended Tasks (Subdomain Migration)

- [x] Scaffold `apps/hub` as a Vite + Vanilla TypeScript package. This ensures the routing hub remains an ultra-lightweight, zero-overhead static surface on the edge.
- [x] Migrate the 3-step recruiter flow, architecture system map, and CTA marketing content from the Admin root into `apps/hub/index.html`.
- [x] Remove the `<AuditTester />` from the Hub surface. Diagnostics belong exclusively in the governed Admin environment; the Hub must remain strictly a routing/marketing surface.
- [x] Configure `.env` driven routing in `apps/hub` to link to Admin and Consumer URLs (e.g., `VITE_ADMIN_URL` and `VITE_CONSUMER_URL`), maintaining 12-factor compliance for both local ports and production subdomains.
- [x] Create `wrangler.toml` configuration for `apps/hub` to enable streamlined Cloudflare Workers with Native Static Assets deployment.
- [x] Configure and document custom domain mappings (assigning `ecotrace.dev` to hub, `admin.ecotrace.dev` to admin, `verify.ecotrace.dev` to consumer) under the Workers architecture.
- [x] Update `apps/admin/app/page.tsx` to execute a server-side redirect (`redirect('/dashboard/overview')`). The Admin subdomain should act strictly as an application gate, adhering to B2B SaaS entry patterns.
- [x] Update repository documentation to reflect the unified Cloudflare Workers deployment topology: `ecotrace.dev` (Hub), `admin.ecotrace.dev` (React), `verify.ecotrace.dev` (Vue).

### Exit Criteria

- [x] A recruiter understands within 30 seconds why there are two apps.
- [x] Both apps are reachable from the demo entry point.
- [x] The user can complete the fast demo path without reading repository docs.
- [ ] The standalone Demo Hub is deployed to the root domain.
- [ ] Admin and Consumer apps are routed via distinct subdomains.

---

## Phase 8.2 — Admin Workstation Demo Polish — Execution Order (2–7)

**Type:** React / UX / Demo Data
**Owner:** Admin app
**Priority:** Critical

### Objective

Turn the Admin app into a guided enterprise workstation demo that highlights governance, evidence, and integrity validation.

### Tasks

- [x] Add a demo-friendly landing or dashboard intro inside the Admin app.
- [x] Add one-click demo credential autofill or visible demo credentials.
- [x] Add `Demo Scenario` context panel explaining the product journey.
- [x] Ensure `/dashboard/overview` immediately shows meaningful seeded metrics.
- [x] Ensure `/dashboard/entities` clearly shows trusted actors and assets for the canonical scenario.
- [x] Ensure `/dashboard/events` clearly shows:
  - Valid events.
  - Tampered event.
  - Unauthorized actor event.
  - Threaded audit history.

- [x] Add recruiter-friendly callouts explaining what each security status means.
- [x] Ensure `/dashboard/compliance` can export a report for the canonical scenario.
- [x] Add a CTA from Admin to open the matching Consumer product view.

### Exit Criteria

- [x] The Admin app demonstrates RBAC, trust, auditing, and export in one coherent story.
- [x] The reviewer can understand integrity violations without knowing Ed25519.
- [x] The Admin app feels like an enterprise workstation, not a generic dashboard.

---

## Phase 8.3 — Consumer Verification Demo Polish — Execution Order (2–7)

**Type:** Vue / UX / Mobile Demo
**Owner:** Consumer app
**Priority:** Critical

### Objective

Make the Consumer app easy to test even when a recruiter has no camera access or does not want to scan a real QR code.

### Tasks

- [x] Add a `Use Demo Product` button as a no-camera fallback.
- [x] Add a static QR image for the canonical product scenario.
- [x] Ensure the QR scanner gracefully handles camera denial.
- [x] Ensure the Product Transparency View clearly maps to the same product shown in Admin.
- [x] Add copy that explains authenticity, carbon footprint, and audit trail in plain English.
- [x] Add a CTA back to the Admin Workstation or Architecture Case Study.
- [x] Remove any trust signal that implies real-world certification unless it is clearly labeled as demo/future-ready.

### Exit Criteria

- [x] The Consumer app can be evaluated from desktop or mobile.
- [x] Camera access is optional.
- [x] The product timeline matches the Admin demo scenario.
- [x] The app communicates trust quickly without overwhelming the user.

---

## Phase 8.4 — Architecture Case Study Layer — Execution Order (9)

**Type:** Technical Storytelling / Documentation / Portfolio
**Owner:** Architecture + Product
**Priority:** High

### Objective

Create a technical case-study layer that explains the engineering decisions behind Eco Trace.

### Tasks

- [x] Add `docs/case-study.md`.
- [x] Add `docs/architecture-flow.md`.
- [x] Add `docs/demo/recruiter-script.md`.
- [x] Add `docs/demo/demo-scenario.md`.
- [x] Add `docs/validation.md` summarizing tests and verification gates.
- [x] Update README with:
  - New positioning.
  - System diagram.
  - Demo links.
  - Recruiter evaluation path.
  - What was implemented.
  - What is demo data.
  - What is future scope.

- [x] Add a `Why this matters in 2026` section focused on enterprise verification, not wrapper SaaS.
- [x] Add collaborator credits and ownership narrative.

### Exit Criteria

- [x] The project can be understood from the README alone.
- [x] The case study explains business problem, architecture, trade-offs, and validation.
- [x] The project reads as AI Solutions Engineering-adjacent without falsely claiming AI implementation.

---

## Phase 8.5 — Evidence, QA & Deployment Readiness — Execution Order (8, 10)

**Type:** Quality / CI / Release
**Owner:** QA + Maintainers
**Priority:** Critical

### Objective

Ensure the final demo is stable, testable, and credible before sharing publicly.

### Tasks

- [ ] Validate production builds for all workspaces.
- [ ] Validate tests for Admin, Consumer, Engine, and UI packages.
- [ ] Validate accessibility for the recruiter-critical paths.
- [ ] Validate mobile Lighthouse score for Consumer.
- [ ] Validate desktop performance for Admin.
- [ ] Validate seeded demo data can be restored consistently.
- [ ] Validate all links between Admin, Consumer, README, and docs.
- [ ] Add screenshots or short GIFs only if they are accurate and current.
- [ ] Add a release checklist to `docs/release-checklist.md`.

### Required Commands

```bash
pnpm build
pnpm test
pnpm lint
```

Engine-specific validation:

```bash
cd packages/engine
GOOS=js GOARCH=wasm go build -o main.wasm
```

### Exit Criteria

- [ ] Public demo links work.
- [ ] Local setup instructions work.
- [ ] Tests pass or documented exceptions are justified.
- [ ] Recruiter flow has no dead ends.
- [ ] The repository is ready to share on LinkedIn and portfolio pages.

---

## Phase 8.6 — Optional Enterprise Integration Preview — Execution Order (11)

**Type:** Architecture Extension / Future Scope
**Owner:** Architecture
**Priority:** Optional

### Objective

Show how Eco Trace could extend into real enterprise solution engineering without adding fake production claims.

### Allowed Additions

- [ ] ERP webhook contract documentation.
- [ ] Example outbound event schema for SAP/Oracle-style systems.
- [ ] Demo-only integration diagram.
- [ ] AI anomaly detection design note.
- [ ] Optional deterministic anomaly rules if implemented and tested.

### Not Allowed

- [ ] Do not claim real SAP, Oracle, or enterprise integrations unless implemented.
- [ ] Do not claim AI anomaly detection is live unless implemented and validated.
- [ ] Do not add autonomous AI mutation of audit or supply-chain state.
- [ ] Do not add broad SaaS billing or tenant-management features unless required for the demo.

### Exit Criteria

- [ ] Future scope feels enterprise-relevant.
- [ ] No future-facing item is confused with implemented functionality.

---

## 8. Demo Script

The final demo should follow this sequence.

### Step 1 — Open Demo Hub

Message:

> Eco Trace is a two-surface verification system: auditors govern supply-chain claims in the Admin Workstation, while consumers verify product history through a QR-driven transparency app.

### Step 2 — Enter Admin Workstation

Show:

- Demo login.
- Overview metrics.
- Active assets.
- Trusted actors.
- Integrity violations.

Explain:

> This is the internal enterprise surface. It shows how verified events, trusted actors, and compliance evidence are governed.

### Step 3 — Inspect Event Integrity

Show:

- Valid event.
- Invalid/tampered event.
- Unauthorized actor event.
- Threaded audit trail.

Explain:

> The system does not just display claims. It verifies whether the actor, payload, and calculation can be trusted.

### Step 4 — Export Compliance Evidence

Show:

- PDF export.
- CSV export.
- Date or actor filter.

Explain:

> The auditor can extract evidence without mutating verified values.

### Step 5 — Open Consumer App

Show:

- QR scanner.
- `Use Demo Product` fallback.
- Authenticity badge.
- Carbon formula.
- Product timeline.

Explain:

> This is the external trust surface. It reduces a complex supply-chain audit into a consumer-friendly verification experience.

### Step 6 — Open Architecture Case Study

Show:

- React Admin.
- Vue Consumer.
- Go/Wasm engine.
- Cloudflare D1.
- Shared UI tokens.
- Governance docs.

Explain:

> The project is not a wrapper SaaS. It is an architecture demo focused on trust boundaries, deterministic validation, and enterprise-style workflows.

---

## 9. Documentation Deliverables

The following documentation should exist by the end of Phase 8:

```txt
README.md
PLAN.md
docs/
  case-study.md
  architecture-flow.md
  validation.md
  release-checklist.md
  demo/
    demo-scenario.md
    recruiter-script.md
    truth-and-scope.md
```

### README Must Include

- Updated project title.
- 2026 positioning.
- Public demo links.
- Fast recruiter path.
- Architecture overview.
- Implemented features.
- Demo data explanation.
- Local setup.
- Validation commands.
- Future scope.
- Collaborator credits.

---

## 10. Downstream Task File Strategy

This `PLAN.md` is the source of truth for future task files.

After this plan is accepted, create:

```txt
apps/admin/TASKS.md
apps/consumer/TASKS.md
```

### Admin TASKS.md Should Cover

- Admin demo intro.
- Demo login/credentials.
- Scenario panel.
- Overview polish.
- Events polish.
- Compliance export polish.
- Cross-link to Consumer.
- Admin-specific QA.

### Consumer TASKS.md Should Cover

- No-camera demo path.
- Static QR/demo product.
- Transparency view polish.
- Plain-language trust copy.
- Cross-link to Admin.
- Consumer-specific QA.

### Shared/Docs Tasks Should Cover

- README rewrite.
- Case study docs.
- Architecture diagrams.
- Recruiter script.
- Truth/scope audit.
- Release checklist.

---

## 11. Quality Bar

Eco Trace is ready for portfolio publication only when it satisfies all of the following.

### Product Bar

- [ ] The demo can be completed in under 10 minutes.
- [ ] A recruiter can understand the two-app architecture without help.
- [ ] The main scenario is coherent from Admin to Consumer.
- [ ] Demo data is realistic and clearly labeled.

### Technical Bar

- [ ] No broken links.
- [ ] No stale phase references.
- [ ] No unsupported claims.
- [ ] Build, test, and lint commands pass.
- [ ] Edge/Wasm verification path is preserved.
- [ ] Shared UI token usage is preserved.

### Storytelling Bar

- [ ] The project reads as enterprise verification architecture.
- [ ] The project does not read as wrapper SaaS.
- [ ] The README explains why the architecture matters in 2026.
- [ ] The collaborator story is visible and professional.

---

## 12. Non-Negotiable Scope Boundaries

- Do not rebuild completed core engine logic.
- Do not replace React Admin with Vue or Vue Consumer with React.
- Do not add AI claims unless functionality is actually implemented and tested.
- Do not claim real certifications, customers, transaction volume, or enterprise integrations.
- Do not add blockchain unless it solves a demonstrated problem and is implemented.
- Do not prioritize new features over demo clarity.
- Do not ship a demo path that requires camera access only.
- Do not leave recruiters guessing which app to open first.

---

## 13. Definition of Done

Phase 8 is complete when:

- [ ] `PLAN.md` is the active roadmap.
- [ ] README is updated to the new positioning.
- [ ] Admin and Consumer apps are connected through a clear demo flow.
- [ ] The canonical demo scenario works end-to-end.
- [ ] Recruiter can test without local setup.
- [ ] Camera-free Consumer testing is supported.
- [ ] Admin demo credentials or one-click demo login are available.
- [ ] Compliance export works with seeded scenario data.
- [ ] Architecture and validation docs are published.
- [ ] All unsupported claims are removed.
- [ ] The project is ready for LinkedIn, portfolio, and recruiter review.

---

## 14. Final Portfolio Positioning

Use this positioning consistently across README, portfolio, LinkedIn, and demo pages:

> **Eco Trace is a collaborative enterprise verification architecture demo built to show how modern teams can make supply-chain claims trustworthy, auditable, and consumer-verifiable using React 19, Vue 3.5 Vapor, Go/WebAssembly, Cloudflare D1, and deterministic governance.**

Short version:

> **Verifiable enterprise workflows for supply-chain claims.**
