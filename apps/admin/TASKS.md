# Execution Roadmap: React 19 Admin Dashboard

Implementation plan for the remaining Phase 6/7 deliverables of the Eco-Trace auditor-facing dashboard.

> **Prerequisite (Complete):** Phase 4 core validation engine and Threaded Audit Trail are implemented.

## 1. Authentication & Access Control (RBAC)

- [x] Implement secure auditor login flow with Edge-compatible session tokens (Cloudflare Workers KV). `[DONE]`
- [x] Add session management middleware in Next.js App Router with automatic expiration and refresh. `[DONE]`
- [x] Define RBAC roles: `ADMIN`, `AUDITOR`, `VIEWER` with granular permission matrix. `[DONE]` **(Ref: G07)**
- [x] Protect all `/dashboard/*` routes with role-gated middleware — reject unauthorized access at the Edge. `[DONE]`
- [x] Implement secure logout with session invalidation and cache purge. `[DONE]`
- [x] Add audit log entry for every authentication event (login, logout, permission escalation). `[DONE]` **(Ref: G10)**


## 2. Macro Analytics & Data Aggregation

- [x] Build `/dashboard/overview` page as a React Server Component with streaming data layout. `[DONE]`
- [x] Implement Server Action to aggregate total $$CF_{total}$$ metrics across all registered assets from D1. `[DONE]` **(Ref: G03)**
- [x] Use React 19 `use` hook for progressive data streaming with Suspense boundaries. `[DONE]`
- [x] Render key metric cards: Total Carbon Footprint, Active Assets, Verified Events, Integrity Violations. `[DONE]`
- [x] Implement time-range filters (7d, 30d, 90d, YTD) with Server Action-driven re-aggregation. `[DONE]`
- [x] Consume **@eco-trace/ui** tokens for all dashboard visualizations — zero ad-hoc styles. `[DONE]`

## 3. Entity & Actor Management

- [x] Create **Add Trusted Actor** form (Server Action) to onboard Suppliers and Logistics partners. `[DONE]` **(Ref: G07)**
- [x] Create **Register Asset** form (Server Action) to insert new trackable assets into D1. `[DONE]` **(Ref: G05)**
- [x] Validate all form inputs against [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md) schema constraints server-side. `[DONE]` **(Ref: G04, G05)**
- [x] Implement Ed25519 public key association during actor onboarding for signature verification. `[DONE]` **(Ref: G01)**
- [x] Add confirmation + audit trail entry for every entity mutation. `[DONE]` **(Ref: G10)**
- [x] Build actor/asset list views with search, pagination, and status indicators as RSC. `[DONE]`

## 4. Compliance Reporting & Export

- [x] Implement PDF export of the Threaded Audit Log with cryptographic verification metadata. `[DONE]` **(Ref: G02)**
- [x] Implement CSV export of event history with all [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md) fields preserved. `[DONE]` **(Ref: G05)**
- [x] Embed integrity hash and signature status per-event in exported reports. `[DONE]` **(Ref: G01, G02)**
- [x] Add date-range and actor-based filtering for scoped compliance extracts. `[DONE]`
- [x] Ensure all exported data is immutable — no client-side transformation of verified values. `[DONE]` **(Ref: G03)**
- [x] Execute `pnpm test --filter admin && pnpm test:accessibility` with zero failures post-export feature. `[DONE]`

## 5. Future Scope / Backlog

- **AI-Driven Anomaly Detection**: Leverage Pinecone vector embeddings to flag statistically anomalous supply chain events — sudden emission spikes, unrecognized actors, or tampered payload patterns.
- **Webhook Management for ERP Integrations**: Admin UI for configuring outbound webhooks to enterprise systems (SAP, Oracle) triggered by verified supply chain events, enabling real-time ERP synchronization.
- **Multi-Tenant Isolation**: Tenant-scoped D1 database partitioning and RBAC policies to handle multiple independent supply chains within a single Eco-Trace deployment.
- **Real-Time Collaboration**: WebSocket-driven live audit sessions allowing multiple auditors to review and annotate the same event trail simultaneously.
- **Scheduled Compliance Reports**: Cron-triggered automated report generation and email delivery for periodic regulatory compliance submissions.

## 6. Portfolio Branding & Auditor Case Study

- [ ] **Technical Showcase Landing (Root `/`)**: Implement a "System Architecture First" view using @eco-trace/ui workbench aesthetic. `[TODO]`
- [ ] **Global Navigation & Ecosystem Bridge**:
  - [ ] Implement a minimal Navbar with a link to "Consumer QR App (Vue Vapor)" featuring an "external link" icon.
  - [ ] Primary Nav Action: "Documentation" or "Architecture Deep-Dive" anchor link. `[TODO]`
- [ ] **Focused Hero Section**:
  - [ ] Single Primary CTA: "Enter Auditor Workstation" (Internal route to `/dashboard`). `[TODO]`
- [ ] **"React 19 & Edge Integrity" Deep Dive**: Section explaining the use of Server Components and Streaming for high-density ESG data. `[TODO]`
- [ ] **Collaborative Architecture Narrative**: Integration of the shared technical copy explaining the React/Vue/Go synergy. `[TODO]`
- [ ] **Governance Footer**: Global footer with the unified business mantra and stack metadata. `[TODO]`

---

_Goal: Mature the Admin Dashboard into a full-featured auditor workstation with RBAC, macro analytics, entity management, and compliance-grade export capabilities._
