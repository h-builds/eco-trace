# Eco Trace — Truth & Scope Document

This document outlines the technical boundaries of the **Eco Trace Enterprise Verification Architecture Demo**. It serves as a guide for technical reviewers and recruiters to distinguish between fully implemented software architecture, seed/demo data, and simulated or future-facing scope.

---

## 1. Core Architectural Pillars (Fully Implemented)

The following components are fully implemented, tested, and operational. They represent the core engineering and design work of the Eco Trace ecosystem.

### A. Admin Workstation (Next.js 15 & React 19)
- **Edge-Compatible Authentication:** Secure login flow utilizing Edge-compatible session tokens backed by Cloudflare Workers KV.
- **Role-Based Access Control (RBAC):** Implementation of roles (`ADMIN`, `AUDITOR`, `VIEWER`) enforced via Next.js Middleware.
- **Server Component Analytics:** Progressive data streaming of macro analytics on the Overview Dashboard via React Server Components (RSCs) and `<Suspense>`.
- **Edge-Native Server Actions:** Data mutation and retrieval (onboarding actors, registering assets, filtering lists) using Server Actions executing directly against Cloudflare D1.
- **Compliance Export:** Dynamic client-side PDF and CSV export using immutable JSON payloads retrieved from D1.

### B. Consumer Verification App (Vue 3.5 Vapor Mode)
- **Vapor Rendering Strategy:** High-performance, compile-time optimized rendering using Vue 3.5 Vapor mode.
- **Edge Data Hydration:** Zero-slop SWR (Stale-While-Revalidate) client caching via composables targeting Node Edge API endpoints.
- **Client-Side Verification Bridge:** Dynamic loading of the Go/Wasm cryptographic engine in a WebWorker.
- **Native QR Scanner:** Direct camera integration using `qr-scanner` running in a separate worker thread.
- **Product Transparency Screen:** Rich UI showing verified provenance, the authenticity badge, carbon formula rendering, and the immutable audit timeline.

### C. Shared Verification Engine (Go / WebAssembly)
- **Cryptographic Signatures:** Ed25519 signature generation and verification.
- **Carbon Calculations:** Deterministic calculation of ESG carbon-footprint aggregation.
- **Integrity Status Mapping:** Status resolution (VALID, WARNING, INVALID, UNAUTHORIZED) based on payload signature check and registered actor verification.

---

## 2. Seed & Demo Data (Realistically Simulated)

To provide an interactive experience without requiring live supply chain hardware, certain data layers are seeded or mock-simulated:

- **D1 Seed Data:** A deterministic SQL schema is pre-seeded with a realistic mock supply chain for sustainable coffee and cacao distribution.
- **Supply Chain Actors:** Simulated entities (Growers, Processors, Roasters, Logistics partners) equipped with pre-generated Ed25519 key pairs.
- **Asset Registration:** Pre-seeded SKU items matching the mock supply chain flow.
- **Integrity Events:** Simulated compliance logs (e.g., harvesting events, milling events, shipping events) with pre-signed cryptographic payloads.
- **Simulated Violations:** Seeded anomaly events (e.g., unsigned transactions, signatures from unauthorized keys) designed to demonstrate the Wasm engine's detection capabilities.

---

## 3. Out of Scope & Future Roadmap (Simulated/Not Implemented)

The following features represent enterprise integrations that are discussed in the conceptual architecture but are not implemented in this demo:

- **Live Certification Authority APIs:** Interactions with official certification bodies (e.g., USDA Organic, Fair Trade USA) are simulated via pre-seeded certificates in the D1 database.
- **IoT Cold Chain Telemetry:** Environmental sensor feeds (e.g., live temperature and GPS logs) are simulated in the seed data payloads, not streamed from live hardware.
- **Enterprise ERP Connectors:** Live synchronization with platforms like SAP, Oracle NetSuite, or Microsoft Dynamics is represented by standardized REST API endpoints and schema models rather than real third-party connectors.
- **Payment & Billing Gateways:** Financial ledger entries and billing features are simulated or omitted, as the focus is purely on provenance and ESG auditing.

---

## 4. Archival Status of Previous Phases

All core features originally planned under **Phases 1 through 7** are complete. They serve as the frozen, immutable baseline for the current presentation layer:

- **Phases 1–3 (Scaffolding & Core API contracts):** Complete.
- **Phases 4–5 (Edge Hydration & Consumer Scanner):** Complete.
- **Phases 6–7 (Admin Entity Management & Compliance Export):** Complete.

All updates in **Phase 8** are strictly additive, focusing on demo entry orchestration, visual polish, recruiter pathways, and truth in documentation.
