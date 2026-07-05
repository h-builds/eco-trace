# Eco Trace — 10-Minute Recruiter Demo Script

This document provides a step-by-step presentation script designed to walk a recruiter, hiring manager, or technical reviewer through the entire Eco Trace ecosystem in under 10 minutes. 

It highlights the system's role-specific interfaces, cryptographic verification, Edge-native architecture, and deterministic carbon calculations.

---

## Seeded Scenario Context
All steps of this demo revolve around the canonical **Verified Product Journey** scenario:
- **Asset ID:** `ASSET-COFFEE-2026-001`
- **Product Name:** `Andes Trace Coffee Lot 001`
- **The Story:** A sustainable coffee batch is harvested by *Andes Organic Cooperative*, processed by *Veridian Processing Node*, transported by *NorthStar Logistics*, and audited by *Eco Trace Demo Auditor*. It includes simulated security incidents: a **tampered payload attempt** (Event 4) and an **unauthorized actor attempt** (Event 5).

---

## Step 1 — Open Demo Hub

**Target URL:** `https://eco-trace-hub.achegideas.workers.dev/` (Production) or `http://localhost:5173` (Local Dev Hub)

### What to Show
1. Open the **Eco Trace Hub** landing experience.
2. Point out the top **Demo Mode Banner** indicating a seeded supply-chain verification scenario.
3. Review the three primary action cards representing the guided recruiter journey:
   - `1. Audit the claim` (Enter Auditor Workstation)
   - `2. Verify the product` (Open Consumer App)
   - `3. Inspect the architecture` (Read Case Study)
4. Highlight the **System Architecture** block showing the data and verification flows:
   `React Admin (Auditor Surface) → Go/Wasm (Trust Engine) → Cloudflare D1 (Edge State) → Vue Consumer (Public Verification)`
5. Point out the tags showcasing the modern stack: React 19, Vue 3.5 Vapor, Cloudflare Workers, Cloudflare D1, Go/Wasm, and Ed25519.

### What to Explain (Talking Points)
> "Eco Trace is a collaborative enterprise verification architecture demo. Instead of building another generic wrapper SaaS, we designed a two-surface system: an internal workstation for compliance auditors to govern supply-chain claims, and a lightweight, read-only public app for end-consumers to verify product authenticity. Both apps share a single Go/Wasm trust engine and run natively on Cloudflare Workers at the edge."

### Fallback Instructions
- **Issue: Local port conflict.** If `http://localhost:5173` is already in use by the Consumer app, Vite may assign the Hub to `http://localhost:5174`. Check your active terminal output for the correct URL.
- **Issue: Hub not running.** From the repository root, run `pnpm --filter hub run dev` to start the Hub server.

---

## Step 2 — Enter the Admin Workstation

**Target URL:** `https://eco-trace-admin.pages.dev/login` (Production) or `http://localhost:8788/login` (Local Dev Pages)

### What to Show
1. Click **Enter Auditor Workstation** from the Hub card.
2. Point out the **Demo Context** card explaining role-based access control (RBAC).
3. Click the **Use Demo Auditor** button to automatically pre-fill the credentials (`auditor` / `demo2026`).
4. Click **Sign In** and land on the `/dashboard/overview` page.
5. Highlight the **Guided Demo Stepper** on the sidebar or dashboard overview.
6. Review the four macro metric cards:
   - **Total Carbon Footprint:** Aggregated carbon footprint ($CF_{total} = \sum E_i \times EF_i$) computed from D1 database values.
   - **Active Assets:** Registered supply-chain assets (`ASSET-COFFEE-2026-001`).
   - **Verified Events:** Counts of events with `VALID` integrity.
   - **Integrity Violations:** Combined count of `INVALID` and `UNAUTHORIZED` events.
7. Point out the **Why this matters in 2026** callout.

### What to Explain (Talking Points)
> "The Admin Workstation represents the internal enterprise surface. The login flow demonstrates Edge-compatible session management utilizing Cloudflare Workers KV. The dashboard metrics are loaded progressively using React Server Components and React 19 Suspense streaming. Notice that the Carbon Footprint metric is computed deterministically rather than using backend estimation or rough averages."

### Fallback Instructions
- **Issue: Login fails.** If the pre-filled credentials return "Invalid credentials," the local D1 database may not be seeded. In `apps/admin`, run `npx wrangler d1 execute eco-trace-events --local --file=./seed.sql` to restore default credentials.
- **Issue: Session Expired alert is stuck.** Clear your browser cookies or local storage for the admin domain and reload the page.

---

## Step 3 — Inspect Event Integrity

**Target URL:** `/dashboard/events`

### What to Show
1. Click **Verify event integrity** in the stepper or navigate to **Integrity Events** in the sidebar.
2. Review the **Status Legend**:
   - 🟢 `VALID` — Payload and actor identity verified.
   - 🟡 `WARNING` — Verification inconclusive.
   - 🔴 `INVALID` — Tampered payload detected.
   - ⛔ `UNAUTHORIZED` — Unregistered actor blocked.
3. Walk through the chronological list of events for the canonical `ASSET-COFFEE-2026-001` journey:
   - `EVT-COFFEE-001` (Origin, VALID)
   - `EVT-COFFEE-002` (Transform, VALID)
   - `EVT-COFFEE-003` (Transport, VALID)
   - **`EVT-COFFEE-004` (Transform, INVALID):** Expand the row to show the warning details. Explain that a rogue actor attempted to modify the ESG payload retroactively without updating the cryptographic signature.
   - **`EVT-COFFEE-005` (Transport, UNAUTHORIZED):** Expand the row to explain that the signer's public key was mathematically intact but not registered in the Go Trust Registry.
   - `EVT-COFFEE-006` (Audit, VALID)
4. Show the **Ed25519 verification explainer** card that describes how the shared Go/Wasm engine performs these checks in the browser.

### What to Explain (Talking Points)
> "This is the core technical proof of the architecture. The workstation does not just read and display database strings. Every event is verified in the browser using the shared Go/WebAssembly engine. If an actor modifies a payload (like the energy footprint in Event 4) or submits an event using a key that is not registered (like the unrecognized logistics actor in Event 5), the system flags the integrity or identity violation instantly. It clearly separates 'broken signature' from 'unregistered signer' at near-native speeds."

### Fallback Instructions
- **Issue: Verification badges show errors.** Check that the Go/Wasm file is built and located in `apps/admin/public/main.wasm`. Rebuild it by navigating to `packages/engine` and running `./build.sh`.

---

## Step 4 — Export Compliance Evidence

**Target URL:** `/dashboard/compliance`

### What to Show
1. Click **Export evidence** in the stepper or navigate to **Compliance Export** in the sidebar.
2. Select `ASSET-COFFEE-2026-001` under the recommended demo export card.
3. Click the **Export PDF** button.
4. Open the generated PDF file and show the details:
   - Demo-data disclaimer at the top.
   - Core asset metadata.
   - Event status table containing the raw Ed25519 public keys and signatures.
5. Click **Export CSV** to demonstrate the raw data export option.

### What to Explain (Talking Points)
> "The compliance export allows corporate compliance officers or auditors to generate portable, audit-ready evidence. The PDF report is generated entirely client-side (using `jspdf`) and preserves all cryptographic integrity metadata, including actor public keys and digital signatures. It guarantees that the exported evidence matches the immutable database logs."

### Fallback Instructions
- **Issue: PDF download does not trigger.** Ensure your browser's pop-up blocker is not blocking the download, and verify that the page console does not throw bundle errors. As a fallback, trigger the **Export CSV** button which outputs the raw database logs as a text file.

---

## Step 5 — Open the Consumer Verification App

**Target URL:** `https://eco-trace-consumer.achegideas.workers.dev/?asset=ASSET-COFFEE-2026-001` (Production) or `http://localhost:5173/?asset=ASSET-COFFEE-2026-001` (Local Dev)

### What to Show
1. Click **Open Consumer Verification App** from the Guided Demo stepper or the compliance success card.
2. The page loads with the parameter `?asset=ASSET-COFFEE-2026-001` pre-filled.
3. Click **Use Demo Product** or **Open QR Scanner** (depending on camera access).
4. Review the **Product Transparency Screen**:
   - **Authenticity Badge:** Displays a prominent green verification status with details from the Go/Wasm engine.
   - **Carbon Formula:** Explains the calculation $CF = E_i \times EF_i$ in plain English and renders the final verified total (`725.40 kgCO2e`).
   - **Provenance Trail Timeline:** A clean, mobile-first chronological timeline of the product journey (Origin → Processing → Transport → Audit).
5. Point out that tampered and unauthorized events are highlighted as "Auditor-only findings" so consumers are warned about supply-chain integrity alerts.

### What to Explain (Talking Points)
> "The Consumer App represents the public trust surface. It is written in Vue 3.5 Vapor mode for maximum speed and zero-slop rendering. It reads from the same Cloudflare D1 database and imports the exact same Go/Wasm verification engine in a WebWorker. A consumer scanning a QR code gets instant, transparent verification of the product's origin, history, and carbon footprint without needing access to the secure Admin Workstation."

### Fallback Instructions
- **Issue: Camera permissions block the scanner.** The app is designed to gracefully handle camera denial. Click the primary **Use Demo Product** button or the secondary **Try without camera** link to bypass camera initialization and load the canonical demo scenario directly.

---

## Step 6 — Review the Technical Case Study

**Target URL:** `https://github.com/h-builds/eco-trace/blob/main/docs/case-study.md` or local documentation

### What to Show
1. Direct the reviewer to the **Case Study** link on the Demo Hub or repository.
2. Point out sections covering:
   - **The Trust Boundary:** Go/Wasm registry-based access.
   - **Two-App Framework Choice:** Next.js for SSR/SEO admin workstation vs. Vue Vapor for instant mobile-first consumer views.
   - **Edge Persistence:** SQLite replication via Cloudflare D1.

### What to Explain (Talking Points)
> "To wrap up, Eco Trace demonstrates how modern software engineers build trustworthy, edge-first architectures. By decoupling our UI from the core logic with a WebAssembly-compiled Go verification engine, we ensure identical security rules run on both React and Vue apps. This project showcases architectural judgment, performance optimization, and concrete governance over AI wrapper solutions."

---

## Quick Reference Summary

| Item | Value |
|------|-------|
| **Demo Login** | User: `auditor` / Password: `demo2026` |
| **Canonical Asset ID** | `ASSET-COFFEE-2026-001` |
| **Total Carbon Footprint** | `725.40 kgCO2e` (excluding invalid/unauthorized events) |
| **Demo Hub URL** | `http://localhost:5173` (Hub package) |
| **Admin Dev URL** | `http://localhost:8788` (Pages dev server) |
| **Consumer Dev URL** | `http://localhost:5173` (Vite port fallback) |
