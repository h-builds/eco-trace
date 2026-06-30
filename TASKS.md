# Execution Roadmap: Cross-Cutting & Documentation

Implementation plan for **root-level Phase 8 deliverables** that span the entire Eco Trace ecosystem.

> **Source of truth:** `PLAN.md`
> **Scope:** Root docs, shared infrastructure, monorepo QA, and deliverables not owned by Admin or Consumer
> **Primary goal:** Ensure all governance files, documentation, and cross-app concerns are coherent, truthful, and ready for portfolio review.

## Execution Order Summary

> Each section is annotated with its execution order `(N)`. Tasks at the same number can run in parallel. A task cannot start until all lower-numbered tasks are done.

| Order | Section                                       | Dependencies                               |
| ----- | --------------------------------------------- | ------------------------------------------ |
| (1)   | §0 Governance & Truth Alignment               | None — start here                          |
| (7)   | §1 Demo Hub Entry Experience                  | Admin §9 and Consumer §9 complete          |
| (9)   | §2 Architecture Case Study                    | All app pages polished                     |
| (9)   | §3 Architecture Flow Diagram                  | All app pages polished                     |
| (9)   | §4 Demo Scenario Doc                          | Seed data and transparency views finalized |
| (9)   | §5 Recruiter Script                           | Demo flow finalized                        |
| (9)   | §6 Validation Doc                             | Tests and eval gates passed                |
| (9)   | §7 README Final Rewrite                       | All other docs written                     |
| (10)  | §8 Release Checklist                          | All docs and QA complete                   |
| (10)  | §9 Monorepo QA Gate                           | All app QA gates passed                    |
| (10)  | §10 Anatomy Update                            | All structural changes done                |
| (11)  | §11 Enterprise Integration Preview (Optional) | Release gate passed                        |

> [!IMPORTANT]
> This file covers deliverables **not assigned** to `apps/admin/TASKS.md` or `apps/consumer/TASKS.md`. Coordinate with both app-level task files for the complete Phase 8 roadmap.

---

## 0. Governance & Truth Alignment — Execution Order (1)

> **Type:** Documentation / Governance
> **Priority:** Critical

Freeze the completed foundation and align all root-level documentation with the real current state.

### Tasks

- [x] Update `CONTEXT.md` session phase from Phase 4 → Phase 8.
- [x] Update `CONTEXT.md` focus to reflect demo polish and presentation.
- [x] Add Phase 8 activation entry to `CONTEXT.md` recent changes log.
- [x] Update `README.md` to remove stale Phase 4 references and badge.
- [x] Update `README.md` operational status to Phase 8.
- [x] Create `docs/demo/truth-and-scope.md` explaining what is implemented, what is demo data, and what is future scope.
- [x] Replace any unsupported claims in root-level docs (real certifications, real customers, real transaction volumes).
- [x] Add clear note that Phases 1–7 are baseline and archived.

### Exit Criteria

- [x] No root-level markdown file (outside `archive/`) references Phase 4 as current.
- [x] A technical reviewer can distinguish implemented features from demo data and future roadmap.

---

## 1. Demo Hub Entry Experience — Execution Order (7)

> **Type:** UX / Product / Demo Orchestration
> **Priority:** High

Create or identify a unified entry point that routes recruiters into both applications.

### Tasks

- [x] Define the Demo Hub location (separate static page, root landing, or Consumer landing).
- [x] Add clear CTAs: `Open Auditor Workstation`, `Open Consumer Verification App`, `Read Architecture Case Study`.
- [x] Add visual system map: React Admin → Vue Consumer → Go/Wasm → D1.
- [x] Add 3-step recruiter flow: `1. Audit the claim`, `2. Verify the product`, `3. Inspect the architecture`.
- [x] Add `Demo Mode` label.

### Extended Tasks (Subdomain Migration)

- [x] Scaffold `apps/hub` as a Vite + Vanilla TS package (HTML/CSS only) for maximum edge performance.
- [x] Migrate Demo Hub marketing content (CTAs, architecture map, recruiter flow) from Admin root to `apps/hub/index.html`.
- [x] Omit the `<AuditTester />` from the Hub to strictly preserve diagnostic functionality within the authenticated Admin boundaries.
- [x] Implement environment-agnostic `.env` routing (`VITE_ADMIN_URL`, `VITE_CONSUMER_URL`) for local port vs. production subdomain resolution.
- [x] Create `wrangler.toml` configuration for `apps/hub` to enable streamlined Cloudflare Workers Native Static Assets deployment.
- [x] Configure and document custom domain mappings (assigning `ecotrace.dev` to hub, `admin.ecotrace.dev` to admin, `verify.ecotrace.dev` to consumer) under the Workers architecture.
- [x] Refactor `apps/admin/app/page.tsx` to automatically redirect to `/dashboard/overview`, enforcing SaaS application entry patterns.
- [x] Update architecture and local setup documentation to reflect the new 3-tier Cloudflare Workers topology.

### Exit Criteria

- [x] A recruiter understands within 30 seconds why there are two apps.
- [x] Both apps are reachable from the entry point.
- [x] The standalone Demo Hub is deployed to the root domain.
- [x] Admin and Consumer apps are routed via distinct subdomains.

---

## 2. Architecture Case Study — Execution Order (9)

> **Type:** Technical Storytelling
> **Priority:** High

### Tasks

- [x] Create `docs/case-study.md`.
- [x] Cover: business problem, architecture decisions, trade-offs, validation approach.
- [x] Explain why Admin and Consumer are separate apps.
- [x] Explain Go/Wasm trust boundary design.
- [x] Add `Why this matters in 2026` section focused on enterprise verification.
- [x] Add collaborator credits.

### Exit Criteria

- [x] The case study explains the architecture without requiring repository exploration.

---

## 3. Architecture Flow Diagram — Execution Order (9)

> **Type:** Documentation / Diagrams
> **Priority:** High

### Tasks

- [ ] Create `docs/architecture-flow.md`.
- [ ] Include data flow from Admin → D1 → Consumer.
- [ ] Include Wasm verification flow.
- [ ] Include Ed25519 signing and verification paths.
- [ ] Use Mermaid diagrams where possible.

### Exit Criteria

- [ ] A developer can understand the full data flow from one document.

---

## 4. Demo Scenario Documentation — Execution Order (9)

> **Type:** Demo Documentation
> **Priority:** High

### Tasks

- [ ] Create `docs/demo/demo-scenario.md`.
- [ ] Document the canonical `Verified Product Journey` scenario.
- [ ] List all seeded actors, assets, events, and their expected integrity states.
- [ ] Cross-reference Admin and Consumer views.

### Exit Criteria

- [ ] Another developer can recreate or verify the demo scenario from this document alone.

---

## 5. Recruiter Script — Execution Order (9)

> **Type:** Demo Documentation
> **Priority:** High

### Tasks

- [ ] Create `docs/demo/recruiter-script.md`.
- [ ] Document the 6-step demo flow from PLAN.md §8.
- [ ] Include talking points for each step.
- [ ] Include fallback instructions if a step fails.

### Exit Criteria

- [ ] A presenter can follow the script without prior rehearsal.

---

## 6. Validation Documentation — Execution Order (9)

> **Type:** QA Documentation
> **Priority:** Medium

### Tasks

- [ ] Create `docs/validation.md`.
- [ ] Summarize golden test cases from `.ai/knowledge/EVALS.md`.
- [ ] Document verification commands and expected results.
- [ ] Map tests to the features they validate.

### Exit Criteria

- [ ] A reviewer can understand how the system is validated without reading EVALS.md.

---

## 7. README Final Rewrite — Execution Order (9)

> **Type:** Portfolio Documentation
> **Priority:** Critical

### Tasks

- [ ] Rewrite README with Phase 8 positioning from PLAN.md §14.
- [ ] Add: system diagram, demo links, recruiter evaluation path.
- [ ] Add: implemented features (from archive TASKS.md), demo data explanation, future scope.
- [ ] Add: Consumer app local setup instructions.
- [ ] Add: validation commands.
- [ ] Add: collaborator credits.
- [ ] Remove all unsupported production claims.

### Exit Criteria

- [ ] The project can be fully understood from the README alone.

---

## 8. Release Checklist — Execution Order (10)

> **Type:** Release Management
> **Priority:** Critical

### Tasks

- [ ] Create `docs/release-checklist.md`.
- [ ] Include: build validation, test validation, accessibility checks, demo flow walkthrough.
- [ ] Include: screenshot/recording capture instructions.
- [ ] Include: deployment verification for both apps.

### Exit Criteria

- [ ] A maintainer can follow the checklist before any public share.

---

## 9. Monorepo QA Gate — Execution Order (10)

> **Type:** QA / CI
> **Priority:** Critical

### Required Commands

```bash
pnpm build
pnpm test
pnpm lint
cd packages/engine && GOOS=js GOARCH=wasm go build -o main.wasm
```

### Tasks

- [ ] Validate all workspace builds pass.
- [ ] Validate all workspace tests pass.
- [ ] Validate lint passes.
- [ ] Validate Wasm engine compiles.
- [ ] Validate all links between Admin, Consumer, README, and docs.
- [ ] Document any justified exceptions.

### Exit Criteria

- [ ] Monorepo is clean and buildable.
- [ ] No broken cross-references.

---

## 10. Anatomy Update — Execution Order (10)

> **Type:** Governance
> **Priority:** Medium

### Tasks

- [ ] Run: `tree -a -I '.git|node_modules|.next|.wrangler|.vercel|dist|public|.turbo' > anatomy.md`
- [ ] Verify `anatomy.md` reflects all Phase 8 structural additions.

### Exit Criteria

- [ ] `anatomy.md` is current and accurate.

---

## 11. Enterprise Integration Preview (Optional) — Execution Order (11)

> **Type:** Architecture Extension / Future Scope
> **Priority:** Optional

### Tasks

- [ ] Add ERP webhook contract documentation if desired.
- [ ] Add example outbound event schema.
- [ ] Add demo-only integration diagram.
- [ ] Add AI anomaly detection design note if desired.

### Not Allowed

- Do not claim real SAP, Oracle, or enterprise integrations.
- Do not claim AI anomaly detection is live unless implemented.

### Exit Criteria

- [ ] Future scope feels enterprise-relevant.
- [ ] No future-facing item is confused with implemented functionality.

---

## Non-Negotiable Boundaries

- Do not modify archive files (`apps/*/archive/TASKS.md`).
- Do not claim completed features that are not implemented.
- Do not duplicate app-level tasks — this file covers root-level only.
- Do not add documentation that contradicts PLAN.md.

---

## Definition of Done

Root-level Phase 8 work is complete when:

- [ ] CONTEXT.md reflects Phase 8.
- [ ] README.md uses Phase 8 positioning.
- [ ] All `docs/` deliverables from PLAN.md §9 exist.
- [ ] Monorepo builds, tests, and lints pass.
- [ ] `anatomy.md` is current.
- [ ] No stale phase references remain in active docs.
- [ ] All three TASKS files (root, admin, consumer) use consistent execution order numbering.
