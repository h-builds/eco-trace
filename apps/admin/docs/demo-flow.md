# Admin Demo Flow Guide

> Step-by-step walkthrough for presenting the Eco Trace Admin Workstation to a recruiter or technical reviewer.

**Estimated time:** 5–7 minutes for the full path, 2–3 minutes for the fast path.

---

## Prerequisites

Before starting the demo, ensure:

- The Admin app is running (locally or deployed).
- Seed data has been populated (see [README.md](../README.md#seed-data-reset)).
- If demonstrating the Consumer handoff, the Consumer app should be accessible and `NEXT_PUBLIC_CONSUMER_URL` configured.

---

## Step 1 — Login

**Route:** `/login`

### What to Show

1. Open the Admin login page.
2. Point out the **Demo Context** card explaining RBAC and the auditor surface.
3. Note the visible demo credentials: `auditor` / `demo2026`.
4. Click **Use Demo Auditor** to pre-fill the credentials.
5. Click **Sign In**.

### What to Explain

> The Admin Workstation uses role-based access control with three roles: Admin, Auditor, and Viewer. The login flow demonstrates Edge-compatible session management backed by Cloudflare Workers KV. Credentials are pre-seeded for easy evaluation.

### Key Details

- Sessions are stored in Cloudflare Workers KV with a 24-hour TTL.
- Login and logout actions are recorded in an immutable audit log.
- Failed login attempts return meaningful error messages.
- After successful login, the user is redirected to the Overview page.

---

## Step 2 — Overview

**Route:** `/dashboard/overview`

### What to Show

1. Point out the **Demo Mode Banner** at the top — this communicates that all data is seeded.
2. Highlight the **Auditor Workstation** hero section and its subtitle.
3. Walk through the **Verified Product Journey** scenario card showing the canonical demo asset.
4. Review the four macro metric cards:
   - **Total Carbon Footprint** — aggregated CF = Σ(E × EF) from all events.
   - **Active Assets** — count of registered supply-chain assets.
   - **Verified Events** — count of events with VALID integrity.
   - **Integrity Violations** — count of INVALID + UNAUTHORIZED events.
5. Note the plain-English explanations beneath each metric.
6. Show the quick-navigation links to Entities, Events, Compliance, and the Consumer App.
7. Highlight the **Why this matters in 2026** callout about enterprise verification architecture.

### What to Explain

> This is the executive summary. It aggregates real-time metrics from Cloudflare D1 using React Server Components with progressive Suspense loading. The carbon footprint follows the deterministic formula from the Go/Wasm engine — no backend estimation.

---

## Step 3 — Trusted Actors & Assets (Entities)

**Route:** `/dashboard/entities`

### What to Show

1. Point out the page heading and explainer: *"Only trusted actors can contribute verifiable events."*
2. Show the **Trusted Actors** table:
   - Actor name, role derivation, public key preview, ACTIVE/REVOKED status badge, and related asset count.
3. Show the **Assets** table:
   - Asset ID (`ASSET-COFFEE-2026-001`), product name, owner actor, creation timestamp, and link to related events.
4. Optionally demonstrate the **Add Trusted Actor** form:
   - Show the Ed25519 public key requirement and demo-safe disclaimer.
5. Optionally demonstrate the **Register Asset** form:
   - Show the owner assignment from existing trusted actors.

### What to Explain

> This page demonstrates entity governance. In an enterprise supply chain, only pre-authorized actors with registered Ed25519 public keys can submit verifiable events. This is the trust boundary — actors outside the registry are flagged as UNAUTHORIZED when they attempt to contribute events.

### Key Details

- All form submissions affect only the demo D1 database.
- Actor public keys are validated against the Go/Wasm registry.
- The scenario filter highlights data for the canonical `ASSET-COFFEE-2026-001` journey.

---

## Step 4 — Integrity Events

**Route:** `/dashboard/events`

### What to Show

1. Point out the page heading and explainer about payload integrity, actor trust, and ESG logic.
2. Show the **Status Legend**:
   - 🟢 **VALID** — signature and actor verified.
   - 🟡 **WARNING** — verification inconclusive.
   - 🔴 **INVALID** — tampered payload detected.
   - ⛔ **UNAUTHORIZED** — unregistered actor blocked.
3. Walk through the **Canonical Product Journey** group:
   - `EVT-COFFEE-001` → Origin registered (VALID).
   - `EVT-COFFEE-002` → Processing completed (VALID).
   - `EVT-COFFEE-003` → Transport verified (VALID).
   - `EVT-COFFEE-004` → Tamper attempt detected (INVALID).
   - `EVT-COFFEE-005` → Unauthorized actor blocked (UNAUTHORIZED).
   - `EVT-COFFEE-006` → Audit reviewed (VALID).
4. Expand a threaded audit trail to show the chronological event history grouped by `event_id`.
5. Point out the **Ed25519 verification explainer** card.
6. Show the **Open this product in Consumer App** CTA.

### What to Explain

> This is the core technical proof. Every event is verified in the browser using a Go/WebAssembly engine that checks Ed25519 signatures against the trusted actor registry. The INVALID event has a deliberately corrupted signature. The UNAUTHORIZED event was signed with a valid key that is not in the registry — the system distinguishes between "broken signature" and "unknown signer."

### Key Details

- Wasm verification runs client-side — no server round-trip for integrity checks.
- The threaded audit trail groups related events by their logical `event_id`.
- Carbon footprint per event is computed deterministically: `CF = energy_kwh × emission_factor`.

---

## Step 5 — Compliance Export

**Route:** `/dashboard/compliance`

### What to Show

1. Point out the heading and explainer: *"Generate audit evidence from verified event history without mutating trusted values."*
2. Show the **Recommended demo export** callout pre-selecting the canonical scenario.
3. Demonstrate the date-range and actor filters.
4. Click **Export PDF** and show the generated report:
   - Scenario name and asset ID in the header.
   - Event statuses, actor metadata, and verification details.
   - Demo-data disclaimer at the top.
5. Click **Export CSV** to show the raw data format.
6. Point out the post-export **Consumer App** CTA.

### What to Explain

> The compliance export demonstrates how an auditor can extract evidence without mutating the underlying verified data. The PDF includes all integrity metadata — event statuses, actor identities, and verification details. This is the final step before handing the evidence to an external reviewer or regulatory body.

### Key Details

- PDF generation uses `jspdf` with `jspdf-autotable` — runs entirely client-side.
- CSV export preserves raw D1 field values without transformation.
- Export actions show success/failure states for UX reliability.

---

## Step 6 — Consumer Handoff

### What to Show

1. Click the **Open Consumer Verification App** link from any page (Overview, Events, Compliance, or the Guided Demo Stepper).
2. The Consumer app opens with the canonical asset pre-loaded via `?asset=ASSET-COFFEE-2026-001`.
3. Show the product transparency view: authenticity badge, carbon formula, and audit trail timeline.

### What to Explain

> The Admin and Consumer apps share the same underlying data and verification engine, but they serve different audiences. The Admin is the internal governance surface; the Consumer is the external trust surface. This separation is an architectural decision — not a limitation. Both apps connect through a standardized URL contract using the asset ID as the handoff parameter.

### Key Details

- The Consumer URL contract is: `${CONSUMER_URL}?asset=${assetId}`.
- If `NEXT_PUBLIC_CONSUMER_URL` is not configured, CTAs display a disabled fallback instead of broken links.
- The Consumer app reads from the same D1 database (via the Admin's API) but enforces a read-only boundary.

---

## Guided Demo Stepper

The Admin layout includes a persistent **Guided Demo** stepper overlay that tracks progress through the demo:

| Step | Label | Route |
|------|-------|-------|
| 1 | Review system health | `/dashboard/overview` |
| 2 | Inspect trusted actors | `/dashboard/entities` |
| 3 | Verify event integrity | `/dashboard/events` |
| 4 | Export evidence | `/dashboard/compliance` |
| 5 | Open consumer view | External → Consumer App |

The stepper highlights the current step based on the active route.

---

## Quick Reference

| Item | Value |
|------|-------|
| Demo login | `auditor` / `demo2026` |
| Canonical asset | `ASSET-COFFEE-2026-001` |
| Scenario name | Verified Product Journey |
| Admin local URL | `http://localhost:3000` |
| Consumer local URL | `http://localhost:5173` |
| Full demo time | 5–7 minutes |
| Fast demo time | 2–3 minutes |
