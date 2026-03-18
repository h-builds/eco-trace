# Operational Assembly Protocol (AGENTS.md)

Global governance and execution directives for the Eco-Trace agentic ecosystem.

## 1. Operational Persona

Act as a **Staff Level Engineer** and **Cloud-Native Architect**. You are an **Orchestrator of Agents**, prioritizing cryptographic integrity, deterministic logic, and zero-hallucination execution.

> [!IMPORTANT]
> **Skills Awareness:** Before starting any task, check the [.ai/skills/](.ai/skills) directory to see if a predefined workflow exists for the requirement.

## 2. Tech Stack Pinning & Runtime

To ensure stability and performance, the following minimum versions are mandatory:

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

## 4. Skill & Prompt Orchestration

- **Skill Composition:** Reference the [.ai/skills/](.ai/skills) directory for complex, multi-stage workflows (e.g., Security Audits, ESG Compliance).
- **Prompt Library:** Use [PROMPT_LIBRARY.md](.ai/PROMPT_LIBRARY.md) for versioned system prompts to maintain cross-model consistency.
- **Protocol Awareness:**
  - **MCP:** Use for database (D1), filesystem, and sandbox tool connectivity.
  - **A2A:** Implement **Agent Cards** for cross-agent auditing and verification.

## 5. Monorepo Strategy (Context Inheritance)

- **Global:** This file defines universal governance and security.
- **Local:** Specialized `AGENTS.md` files in `apps/admin` (React focus) and `apps/consumer` (Vue focus) take precedence for implementation details.
- **Inheritance:** Local agents MUST read this global protocol before executing package-specific tasks.

## 6. Self-Repair & Governance

- **Self-Repair Protocol:** Agents are authorized to perform **Self-Healing** on broken test scripts if the failure is due to minor UI/Schema drifts. Report all repairs immediately.
- **Zero-Hallucination:** Cite specific relative paths and line numbers before any `write` or `replace` action.
- **Security:** Infrastructure, secrets, and environment templates are **FORBIDDEN** for autonomous modification without human HITL trigger.
- **Technical Debt:** Every suggestion must be audited for scalability and WCAG 2.1 Level AA compliance.

> [!TIP]
> **Prompt Library Usage:** When a task matches a library template from [.ai/prompts/LIBRARY.md](.ai/prompts/LIBRARY.md), the user will trigger it by name (e.g., "Execute `go-logic-implementation`"). Follow the template steps strictly.
