# Execution Roadmap: React 19 Admin Dashboard

Implementation plan for the remaining Phase 6/7 deliverables of the Eco-Trace auditor-facing dashboard.

> **Prerequisite (Complete):** Phase 4 core validation engine and Threaded Audit Trail are implemented.

## 1. Authentication & Access Control (RBAC)

- [ ] Implement secure auditor login flow with Edge-compatible session tokens (Cloudflare Workers KV). `[TODO]`
- [ ] Add session management middleware in Next.js App Router with automatic expiration and refresh. `[TODO]`
- [ ] Define RBAC roles: `ADMIN`, `AUDITOR`, `VIEWER` with granular permission matrix. `[TODO]` **(Ref: G07)**
- [ ] Protect all `/dashboard/*` routes with role-gated middleware — reject unauthorized access at the Edge. `[TODO]`
- [ ] Implement secure logout with session invalidation and cache purge. `[TODO]`
- [ ] Add audit log entry for every authentication event (login, logout, permission escalation). `[TODO]` **(Ref: G10)**

## 2. Macro Analytics & Data Aggregation

- [ ] Build `/dashboard/overview` page as a React Server Component with streaming data layout. `[TODO]`
- [ ] Implement Server Action to aggregate total $$CF_{total}$$ metrics across all registered assets from D1. `[TODO]` **(Ref: G03)**
- [ ] Use React 19 `use` hook for progressive data streaming with Suspense boundaries. `[TODO]`
- [ ] Render key metric cards: Total Carbon Footprint, Active Assets, Verified Events, Integrity Violations. `[TODO]`
- [ ] Implement time-range filters (7d, 30d, 90d, YTD) with Server Action-driven re-aggregation. `[TODO]`
- [ ] Consume **@eco-trace/ui** tokens for all dashboard visualizations — zero ad-hoc styles. `[TODO]`

## 3. Entity & Actor Management

- [ ] Create **Add Trusted Actor** form (Server Action) to onboard Suppliers and Logistics partners. `[TODO]` **(Ref: G07)**
- [ ] Create **Register Asset** form (Server Action) to insert new trackable assets into D1. `[TODO]` **(Ref: G05)**
- [ ] Validate all form inputs against [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md) schema constraints server-side. `[TODO]` **(Ref: G04, G05)**
- [ ] Implement Ed25519 public key association during actor onboarding for signature verification. `[TODO]` **(Ref: G01)**
- [ ] Add confirmation + audit trail entry for every entity mutation. `[TODO]` **(Ref: G10)**
- [ ] Build actor/asset list views with search, pagination, and status indicators as RSC. `[TODO]`

## 4. Compliance Reporting & Export

- [ ] Implement PDF export of the Threaded Audit Log with cryptographic verification metadata. `[TODO]` **(Ref: G02)**
- [ ] Implement CSV export of event history with all [DATA_DICTIONARY.md](../../.ai/knowledge/DATA_DICTIONARY.md) fields preserved. `[TODO]` **(Ref: G05)**
- [ ] Embed integrity hash and signature status per-event in exported reports. `[TODO]` **(Ref: G01, G02)**
- [ ] Add date-range and actor-based filtering for scoped compliance extracts. `[TODO]`
- [ ] Ensure all exported data is immutable — no client-side transformation of verified values. `[TODO]` **(Ref: G03)**
- [ ] Execute `pnpm test --filter admin && pnpm test:accessibility` with zero failures post-export feature. `[TODO]`

## 5. Future Scope / Backlog

- **AI-Driven Anomaly Detection**: Leverage Pinecone vector embeddings to flag statistically anomalous supply chain events — sudden emission spikes, unrecognized actors, or tampered payload patterns.
- **Webhook Management for ERP Integrations**: Admin UI for configuring outbound webhooks to enterprise systems (SAP, Oracle) triggered by verified supply chain events, enabling real-time ERP synchronization.
- **Multi-Tenant Isolation**: Tenant-scoped D1 database partitioning and RBAC policies to handle multiple independent supply chains within a single Eco-Trace deployment.
- **Real-Time Collaboration**: WebSocket-driven live audit sessions allowing multiple auditors to review and annotate the same event trail simultaneously.
- **Scheduled Compliance Reports**: Cron-triggered automated report generation and email delivery for periodic regulatory compliance submissions.

---

_Goal: Mature the Admin Dashboard into a full-featured auditor workstation with RBAC, macro analytics, entity management, and compliance-grade export capabilities._
