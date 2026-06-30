# Eco Trace Admin Workstation

> **React 19 auditor surface for governing cryptographically verified supply-chain claims.**

The Admin Workstation is the internal enterprise interface of the Eco Trace ecosystem. It demonstrates role-based access control, trusted actor governance, supply-chain event integrity verification (via Go/WebAssembly + Ed25519), and compliance evidence export — all running on Cloudflare's edge.

This application is one half of a two-app architecture:

| Surface | Stack | Purpose |
|---------|-------|---------|
| **Admin Workstation** (this app) | React 19, Next.js, Cloudflare D1 | Govern actors, verify events, export evidence |
| **Consumer Verification App** | Vue 3.5 Vapor, Vite | Public QR-driven product transparency |

Both apps share a Go/WebAssembly verification engine and the `@eco-trace/ui` design token package.

---

## Demo Credentials

The Admin Workstation ships with three pre-seeded RBAC accounts:

| Username | Password | Role | Permissions |
|----------|----------|------|-------------|
| `auditor` | `demo2026` | `AUDITOR` | Full dashboard access (recommended for demo) |
| `admin` | `admin2026` | `ADMIN` | Full dashboard + administrative actions |
| `viewer` | `viewer2026` | `VIEWER` | Read-only dashboard access |

The login page at `/login` includes a **Use Demo Auditor** button that pre-fills the auditor credentials without auto-submitting.

> **Note:** Authentication uses Edge-compatible session tokens backed by Cloudflare Workers KV. Passwords are stored as plaintext hashes in this demo environment — production implementations would use bcrypt/argon2.

---

## Local Setup

### Prerequisites

- Node.js ≥ 18
- pnpm (workspace manager)
- Go ≥ 1.21 (only if regenerating the Wasm engine)

### Install Dependencies

From the **monorepo root**:

```bash
pnpm install
```

### Start the Dev Server

```bash
# Standard Next.js dev server (no D1 bindings)
pnpm dev --filter admin

# Edge-compatible dev server with Cloudflare D1 and KV bindings
pnpm dev --filter admin  # then proxy via wrangler as needed
```

The Admin app runs on `http://localhost:3000` by default.

### Build for Production

```bash
pnpm build --filter admin
```

---

## Seed Data Reset

The Admin database uses Cloudflare D1 (SQLite at the edge). To restore the canonical demo scenario from scratch:

### Step 1 — Regenerate Keys and Seed SQL

```bash
cd apps/admin
npx tsx lib/seed.ts
```

This script:
1. Generates fresh Ed25519 key pairs for all trusted actors.
2. Updates the Go engine's internal registry (`packages/engine/internal/crypto/registry.go`) with the new public keys.
3. Produces a deterministic `seed.sql` file containing users, actors, assets, and events.

### Step 2 — Reset the Database Schema

```bash
npx wrangler d1 execute eco-trace-events --local --file=./schema.sql
```

### Step 3 — Populate Demo Data

```bash
npx wrangler d1 execute eco-trace-events --local --file=./seed.sql
```

### Step 4 — Rebuild the Wasm Engine (if keys changed)

```bash
cd ../../packages/engine
GOOS=js GOARCH=wasm go build -o engine.wasm
cp engine.wasm ../../apps/admin/public/main.wasm
```

> **Important:** After regenerating seed data, the Go registry is updated with new public keys. The Wasm binary must be recompiled so the browser-side verification engine recognizes the new trusted actors.

### Seeded Demo Scenario

The seed process creates the **Verified Product Journey** scenario:

| Entity | Identifier |
|--------|-----------|
| Primary Asset | `ASSET-COFFEE-2026-001` — Andes Trace Coffee Lot 001 |
| Trusted Supplier | Andes Organic Cooperative |
| Processing Actor | Veridian Processing Node |
| Logistics Actor | NorthStar Logistics |
| Demo Auditor | Eco Trace Demo Auditor |

Events in the scenario:

| Event ID | Action | Status | Actor |
|----------|--------|--------|-------|
| `EVT-COFFEE-001` | ORIGIN | VALID | Andes Organic Cooperative |
| `EVT-COFFEE-002` | TRANSFORM | VALID | Veridian Processing Node |
| `EVT-COFFEE-003` | TRANSPORT | VALID | NorthStar Logistics |
| `EVT-COFFEE-004` | TRANSFORM | INVALID | Veridian Processing Node (tampered signature) |
| `EVT-COFFEE-005` | TRANSPORT | UNAUTHORIZED | Unknown Logistics (unregistered actor) |
| `EVT-COFFEE-006` | AUDIT | VALID | Eco Trace Demo Auditor |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_CONSUMER_URL` | No | — | Base URL of the Consumer Verification App. Used to generate cross-app links. When absent, consumer CTAs display a disabled fallback. |

### Environment Files

| File | Purpose |
|------|---------|
| `.env` | Local development defaults |
| `.env.example` | Template for new developers |
| `.env.production` | Production deployment values |

### Cloudflare Bindings (wrangler.toml)

| Binding | Type | Purpose |
|---------|------|---------|
| `DB` | D1 Database | Primary data store for events, users, actors, assets, and audit logs |
| `SESSION_KV` | KV Namespace | Edge-compatible session token storage |

---

## Routes Overview

### Pages

| Route | Description |
|-------|-------------|
| `/` | Application gate — redirects to `/dashboard/overview` |
| `/login` | Auditor login with demo credentials and RBAC explainer |
| `/dashboard/overview` | Executive summary: metrics, scenario card, quick links, tech callout |
| `/dashboard/entities` | Trusted Actors & Assets management with governance controls |
| `/dashboard/events` | Integrity Events log with Wasm-backed verification and audit trail |
| `/dashboard/compliance` | Compliance evidence export (PDF and CSV) with date/actor filters |

### API Routes

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/events` | `GET`, `POST` | Supply-chain event CRUD. `GET` supports `?asset_id=` filtering. Cross-origin restricted to `GET`/`OPTIONS`. |
| `/api/compliance/export` | `GET` | Compliance data export endpoint for PDF/CSV generation |

### Dashboard Layout Features

- **Demo Mode Banner** — persistent banner across all `/dashboard/*` routes identifying seeded demo data.
- **Guided Demo Stepper** — 5-step guided overlay: Review health → Inspect actors → Verify integrity → Export evidence → Open consumer view.
- **RBAC Architecture Card** — explains the role-based access model.
- **Dashboard Navigation** — route-aware sidebar with active state indicators.

---

## Consumer URL Contract

The Admin app links to the Consumer Verification App using a standardized URL contract:

```
${NEXT_PUBLIC_CONSUMER_URL}?asset=${assetId}
```

### Implementation

The helper in `lib/consumer.ts` provides:

```typescript
// Check if Consumer URL is configured
isConsumerUrlConfigured(): boolean

// Build the full Consumer product URL
getConsumerProductUrl(assetId: string): string
// Returns: "${NEXT_PUBLIC_CONSUMER_URL}?asset=${encodedAssetId}"
// Fallback: "#" when NEXT_PUBLIC_CONSUMER_URL is not set
```

### Where Consumer Links Appear

- **Overview page** — "Open Consumer Verification App" CTA
- **Events page** — "Open this product in Consumer App" CTA
- **Compliance page** — post-export "View in Consumer App" CTA
- **Guided Demo Stepper** — Step 5 "Open consumer view"

### Deployment URLs

| Environment | Admin URL | Consumer URL |
|-------------|-----------|-------------|
| Local | `http://localhost:3000` | `http://localhost:5173` |
| Production | `https://eco-trace-admin.pages.dev` | `https://eco-trace-consumer.achegideas.workers.dev` |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 + Next.js (App Router) | Server Components, Server Actions, Edge rendering |
| Styling | Tailwind CSS v4 + `@eco-trace/ui` tokens | Design system governance |
| Database | Cloudflare D1 (SQLite at edge) | Events, users, actors, assets, audit logs |
| Sessions | Cloudflare Workers KV | Edge-compatible session storage |
| Verification | Go/WebAssembly | Ed25519 signing, integrity verification, carbon footprint |
| Deployment | Cloudflare Pages | Edge-first deployment |

---

## Related Documentation

- [Project Plan](../../PLAN.md) — Phase 8 roadmap and execution order
- [Architecture](../../.ai/knowledge/ARCHITECTURE.md) — system design overview
- [Data Dictionary](../../.ai/knowledge/DATA_DICTIONARY.md) — field definitions and constraints
- [Demo Flow Guide](./docs/demo-flow.md) — step-by-step recruiter walkthrough
- [Truth & Scope](../../docs/demo/truth-and-scope.md) — what is real vs. demo vs. future
