# 🌿 Eco-Trace: Radical ESG Traceability

> **High-Performance, Edge-Native Supply Chain Intelligence**

![Phase: Alpha](https://img.shields.io/badge/Phase-Alpha--Implementation_Setup-blueviolet?style=for-the-badge) ![Stack: Hybrid Edge](https://img.shields.io/badge/Stack-React_19_+_Vue_3.5_Vapor_+_Go_Wasm-blue?style=for-the-badge) ![Compliance: WCAG 2.1 AA](https://img.shields.io/badge/Compliance-WCAG_2.1_AA-green?style=for-the-badge)

---

## 🎯 Project Vision

**Eco-Trace** is an industrial traceability ecosystem designed for radical transparency. We provide deterministic validation and ultra-low latency data delivery at the **Edge** to transform ESG (Environmental, Social, and Governance) metrics into verifiable digital assets.

---

## 🏗️ Agentic Architecture

This monorepo functions as a **Cognitive Substrate**, optimizing human-AI collaboration through the **UCP** (Unified Context Protocol).

### **The Three Pillars**

| Component           | Technology         | Role                | Operational Focus                                      |
| :------------------ | :----------------- | :------------------ | :----------------------------------------------------- |
| **Core Engine**     | **Go / Wasm**      | Deterministic Logic | Cryptographic integrity and $CF_{total}$ validation.   |
| **Admin Dashboard** | **React 19 + RSC** | Auditor Interface   | High-density monitoring leveraging the React Compiler. |
| **Consumer App**    | **Vue 3.5 Vapor**  | Transparency App    | Mobile-first speed with Signals-based reactivity.      |

---

## 🧠 Intelligence Infrastructure (`.ai/`)

Project governance resides in a decentralized intelligence layer that guides autonomous execution.

- **[Context](./.ai/context/CONTEXT.md):** Active state and session memory management.
- **[Rules](./.ai/rules/RULES.md):** Technical constitution enforcing **Zero-Hallucination** and **Zero-Slop Commenting** policies.
- **[Library](./.ai/prompts/LIBRARY.md):** Versioned prompt library for mission-critical workflows and skill execution.

---

## ⚡ Technical Pillars

- **Deterministic Math:** All carbon footprint calculations strictly follow the immutable formula:
  $$CF_{total} = \sum_{i=1}^{n} (E_i \times EF_i)$$
- **Edge-Native Persistence:** Architected on **Cloudflare Workers + D1** for immutable global persistence.
- **Shared Identity:** Framework-agnostic design system at `@eco-trace/ui` with automated compile-time contrast validation.

---

## 🚦 Current Operational Status

**Current Phase:** `Phase 3: Go Engine Core Initialized`
**Focus:** Core validation engine operational with deterministic ESG logic, live Ed25519 Cryptographic Gate (Wasm), and Trusted Actor Registry active on the React Admin UI. Engineered a Threaded High-Density Audit Trail grouping unique `event_id` flows natively, equipped with Wasm Shadow Key Simulation for cryptographic impersonation testing.

> [!CAUTION]
> **Strict Governance:** Any changes to the "Bridge" infrastructure require a Staff-level technical audit and validation against [EVALS.md](./.ai/knowledge/EVALS.md) test cases.

---

## 🛠️ Local Development Quick Start

Follow these instructions to configure the Edge environment, compile the WebAssembly engine, and initialize the Cloudflare D1 database.

### 1. Prerequisites
- **Node.js**: `v22.x` (LTS highly recommended)
- **Go**: `v1.22+` (Required for Wasm cryptographic compilation)
- **Package Manager**: `pnpm` (`npm install -g pnpm`)

### 2. Installation
Clone the repository and install all workspace dependencies:
```bash
git clone git@github.com:h-builds/eco-trace.git
cd eco-trace
pnpm install
```

### 3. Engine Compilation (WebAssembly)
The Go Cryptographic Gate must be compiled to WebAssembly and injected into the Admin application's public directory.
```bash
cd packages/engine
./build.sh
cd ../..
```

### 4. Database Setup (Cloudflare D1)
Initialize the local SQLite Edge database, apply the schema, and seed it with cryptographically valid test pairs seamlessly linked to the Wasm engine:
```bash
cd apps/admin
# 1. Apply Schema
npx wrangler d1 execute eco-trace-events --local --file=./schema.sql
# 2. Generate Deterministic Key Pairs and Mock Data
npx tsx lib/seed.ts
# 3. Seed Database
npx wrangler d1 execute eco-trace-events --local --file=./seed.sql
```

### 5. Running the Edge Server
Boot the Next.js server equipped with the Wrangler proxy to simulate Edge compatibility locally:
```bash
# Still in apps/admin
pnpm run dev:edge
```
Access the High-Density Event Log at `http://localhost:3001/dashboard/events`.

> [!NOTE]
> Ensure the `pages_build_output_dir` parameter remains commented out (`# pages_build_output_dir`) in `apps/admin/wrangler.toml` during local development to prevent Wrangler proxy network collisions.

---

## 🤖 AI Agentic Workflow

If operating as an autonomous entity:
1. Adopt the **Operational Persona** defined in [AGENTS.md](./.ai/rules/AGENTS.md).
2. Execute templates and capabilities continuously via [LIBRARY.md](./.ai/prompts/LIBRARY.md).

---

_Built for the Edge. Engineered for Trust. Managed from South America._
