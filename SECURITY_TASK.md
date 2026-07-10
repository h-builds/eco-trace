# Security Remediation Tasks

This file tracks security findings detected in the Eco Trace codebase. Future developers or AI agents can use this list as a task queue to implement remediations.

> [!IMPORTANT]
> **Rules for Remediation:**
> 1. Resolve findings according to severity (Medium severity should generally be addressed first).
> 2. Ensure each fix is verified locally (e.g. by running tests/linters or utilizing specialized security scanning tools if available).
> 3. Do not introduce breaking changes to the baseline business logic.

---

## Findings Summary & Checklists

### 🔴 Medium Severity Findings

- [x] **Prototype Pollution / Arbitrary Code Execution (Bracket notation with user input)**
  - File: [route.ts:L88](./apps/admin/app/api/compliance/export/route.ts#L88)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [route.ts:L150](./apps/admin/app/api/events/route.ts#L150)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L75](./apps/admin/app/dashboard/events/page.tsx#L75)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L83](./apps/admin/app/dashboard/events/page.tsx#L83)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L88](./apps/admin/app/dashboard/events/page.tsx#L88)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L209](./apps/admin/app/dashboard/events/page.tsx#L209)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L214](./apps/admin/app/dashboard/events/page.tsx#L214)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L339](./apps/admin/app/dashboard/events/page.tsx#L339)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L354](./apps/admin/app/dashboard/events/page.tsx#L354)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [page.tsx:L392](./apps/admin/app/dashboard/events/page.tsx#L392)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [wasm_exec.js:L208](./apps/admin/public/wasm_exec.js#L208)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [wasm_exec.js:L530](./apps/admin/public/wasm_exec.js#L530)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [wasm_exec.js:L207](./apps/consumer/public/wasm_exec.js#L207)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [wasm_exec.js:L529](./apps/consumer/public/wasm_exec.js#L529)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [wasm_exec.js:L208](./public/wasm_exec.js#L208)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.
  - File: [wasm_exec.js:L530](./public/wasm_exec.js#L530)
    - *Issue:* Bracket object notation with user input is present, this might allow an attacker to access all properties of the object and even its prototype, leading to possible code execution.

- [x] **Path Traversal Vulnerabilities (Dynamic path construction)**
  - File: [seed.ts:L37](./apps/admin/lib/seed.ts#L37)
    - *Issue:* The application dynamically constructs file or path information. If the path information comes from user-supplied input, it could be abused to read sensitive files, access other users' data, or aid in exploitation to gain further system access. Use `path.normalize` and verification paths.
  - File: [seed.ts:L49](./apps/admin/lib/seed.ts#L49)
    - *Issue:* Same path traversal issue when constructing path/file information.
  - File: [seed.ts:L136](./apps/admin/lib/seed.ts#L136)
    - *Issue:* Same path traversal issue when constructing path/file information.

---

### 🟡 Low Severity Findings

- [x] **Dependency Hijacking / Confusion Attacks (Variant dependency versions)**
  - File: [package.json:L14](./apps/admin/apps/consumer/package.json#L14)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L14](./apps/admin/package.json#L14)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L18](./apps/admin/package.json#L18)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L26](./apps/admin/package.json#L26)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L12](./apps/hub/package.json#L12)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L14](./package.json#L14)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L22](./package.json#L22)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.
  - File: [package.json:L13](./packages/ui/package.json#L13)
    - *Issue:* Package dependencies with variant versions. Better to specify exact versions or lock files.

- [x] **Cross-Site Scripting (XSS) Vulnerability (innerHTML usage)**
  - File: [counter.ts:L5](./apps/hub/src/counter.ts#L5)
    - *Issue:* User controlled data in methods like `innerHTML`, `outerHTML`, or `document.write` can lead to XSS vulnerabilities.
