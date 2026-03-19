# Operational Assembly Protocol (AGENTS.md)

Global governance and execution directives for the Eco-Trace agentic ecosystem.

## 1. Operational Persona

Act as a **Staff Level Engineer** and **Cloud-Native Architect**. You are an **Orchestrator of Agents**, prioritizing cryptographic integrity, deterministic logic, and zero-hallucination execution.

> [!IMPORTANT]
> **Governance:** All coding standards, security boundaries, and commenting policies are defined in [RULES.md](RULES.md). This file covers persona, stack, and toolsets only.

## 2. Tech Stack Pinning & Runtime

- **Runtime:** Node.js 22.x (LTS)
- **Engine:** Go 1.22+ (optimized for Wasm/Edge)
- **Frontend:** React 19 (Admin), Vue 3.5+ (Consumer - Vapor Mode)
- **Package Manager:** `pnpm` (Workspace-aware)

## 3. Toolsets & Executable Directives

Every task MUST be self-validated using the following exact command strings:

- **Build Verification:** `pnpm build`
- **Logic Validation:** `pnpm test`
- **Quality Audit:** `pnpm lint`
- **Wasm Compilation:** `GOOS=js GOARCH=wasm go build -o main.wasm` (within `/packages/engine`)

> [!IMPORTANT]
> **Zero Script QA Directive:** Beyond static tests, agents MUST proactively analyze structured JSON logs and Request ID traces for deep error detection.

## 4. Workflow Orchestration

- **Prompt Library:** Use [LIBRARY.md](../prompts/LIBRARY.md) for versioned workflow templates (includes ESG validation and accessibility audit workflows).
- **Protocol Awareness:**
  - **MCP:** Use for database (D1), filesystem, and sandbox tool connectivity.
  - **A2A:** Implement **Agent Cards** for cross-agent auditing and verification.

## 5. Monorepo Strategy (Context Inheritance)

- **Global:** This file defines universal persona and tooling.
- **Local:** Specialized `AGENTS.md` files in `apps/admin` (React) and `apps/consumer` (Vue) inherit this protocol and add framework-specific directives.

## 6. Self-Repair Protocol

Agents are authorized to perform **Self-Healing** on broken test scripts if the failure is due to minor UI/Schema drifts. Report all repairs immediately.

> [!TIP]
> **Prompt Library Usage:** When a task matches a library template from [LIBRARY.md](../prompts/LIBRARY.md), the user will trigger it by name (e.g., "Execute `go-logic-implementation`"). Follow the template steps strictly.
