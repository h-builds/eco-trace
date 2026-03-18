# Architecture Overview: Eco-Trace

Technical design, reasoning orchestration, and the mission-critical Cognitive & Protocol Layer.

## 1. Reasoning Orchestration
- **Pattern:** ReAct (Reasoning + Acting).
- **Framework:** [LangGraph](https://langchain-ai.github.io/langgraph/) to manage cyclic agent states and stateful orchestration.
- **Core Strategy:** The architecture acts as a **Coordination Layer** that directs data flow and agent actions rather than just responding to stateless requests.

## 2. Model Context Protocol (MCP)
- **Standard:** Use MCP to connect agents to external tools, [Cloudflare D1](../../packages/consumer) databases, and the [Go/Wasm Sandbox](../../packages/engine).
- **Security:** Every MCP tool-call must be validated against the [Governance Rules](../rules/RULES.md).

## 3. Cognitive Tier: Two-Tier Memory System
To prevent hallucinations and maintain long-term architectural integrity:
- **Short-Term Memory:** Active session context managed via [CONTEXT.md](../context/CONTEXT.md). Use for immediate task state.
- **Long-Term Memory:** **Pinecone** (Serverless Vector DB) storage for:
  - Factual ESG data and Event Schemas.
  - Past architectural decisions and "Best Practice" patterns.
  - Audit logs for agentic workflows.

## 4. Context Management: Session Fragmentation
To prevent context saturation and maintain high precision:
- **Strategy:** Use "Session Splitting" to isolate different development phases:
  - **Phase 1: Design/Spec** (Focus on `.ai/context/`).
  - **Phase 2: Implementation** (Focus on `/packages/` and `.ai/rules/`).
  - **Phase 3: Testing/Eval** (Focus on `.ai/knowledge/EVALS.md`).

## 5. Model Hierarchy
- **L1 (Reasoning):** High-parameter models (e.g., Claude 3.5 Sonnet) for planning.
- **L2 (Execution):** Specialized models for boilerplate and refactoring.
- **L3 (Verify):** Independent models for security and accessibility audits.

## 6. A2A Collaboration (Future Scope)
- **Agent Cards:** Implement the **A2A (Agent-to-Agent) Protocol** using Agent Cards for cross-organizational auditing and collaboration, ensuring unified governance across different AI entities.
