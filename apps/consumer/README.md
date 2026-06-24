# Eco Trace Consumer Verification App

> **The Eco Trace Consumer App is the public verification surface of a two-app enterprise trust demo. It lets anyone inspect a seeded product journey, verify authenticity, review carbon-footprint logic, and understand how supply-chain claims become consumer-verifiable evidence.**

This application is built with **Vue 3.5 Vapor** and provides a mobile-first, high-performance UI to verify products registered in the Eco Trace ecosystem.

For a full understanding of the architecture and demo scenario, please refer to the [Root PLAN.md](../../PLAN.md) and [Demo Scenario](../../docs/demo/demo-scenario.md) documents.

## Application Purpose & Characteristics

- **Read-Only Verification:** The Consumer app is entirely read-only. It cannot sign, mutate, or persist supply-chain events. It relies on deterministic verification of payloads.
- **Edge-Ready Performance:** Vapor-oriented rendering ensures near-instant loading, crucial for QR-scan experiences.
- **Two-App Ecosystem:** This app is designed to be demonstrated alongside the [Admin Workstation](../admin). The Admin app is used to govern the supply-chain claims, while the Consumer app is used to verify them.

## Recruiter Evaluation Path

You can evaluate the Consumer demo without any setup or camera permissions:

1. Open the Consumer app in your browser (desktop or mobile).
2. Click **"Use Demo Product"** to bypass the QR scanner.
3. Review the **Authenticity Badge** to see trust state explanations.
4. Review the **Carbon Formula** showing deterministic calculations based on supply-chain steps.
5. Review the **Audit Timeline** showing the chronological journey of the product.
6. Click **"Open Auditor Workstation"** to view the same data from the perspective of an auditor.

## Demo Product Path & Scanner Fallback

We have designed the demo to be as frictionless as possible:
- **Scanner with Camera:** If a camera is available and permitted, you can scan the static QR code asset for the demo scenario.
- **Camera Fallback / No-Camera Path:** If camera access is denied, unsupported, or if you simply prefer not to use it, the scanner gracefully degrades to a "Use Demo Product" fallback. This button automatically loads the canonical demo product (`ASSET-COFFEE-2026-001`).

## Local Development & Execution

### Prerequisites
- Node.js (v20+)
- pnpm

### Run Locally
From the root of the project:
```bash
pnpm install
pnpm dev --filter consumer
```

### Environment Variables
Copy `.env.example` to `.env` (or configure your deployment environment).

- `VITE_ADMIN_URL`: The URL to the Admin Workstation (used for cross-app links, like "Open Auditor Workstation"). If omitted, the app provides safe fallback copy.
- `VITE_API_URL`: The Edge API endpoint where verified events are fetched.

### Testing & Validation
We use Vitest and Lighthouse to validate the Consumer app's performance and accessibility.

```bash
pnpm test --filter consumer           # Run all unit and integration tests
pnpm test:accessibility --filter consumer # Run accessibility audit
pnpm build --filter consumer          # Verify production build
```

## Seeded Demo Data

**Note:** All data presented in this demo, including the canonical `ASSET-COFFEE-2026-001` product and the related supply chain actors (e.g., Andes Organic Cooperative, NorthStar Logistics), is seeded. The Consumer app reads from the same D1 database that the Admin Workstation uses, ensuring the data is aligned across both surfaces.
