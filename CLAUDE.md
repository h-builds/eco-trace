# Eco-Trace Optimization Protocol (Next.js + Vue Monorepo)

> [!IMPORTANT]
> **Priority: CRITICAL**
> Minimize KV Cache usage to avoid 7-day lockout.

## 1. Directory Exclusion (The "No-Fly" Zone)

To prevent redundant reads and token waste, **DO NOT** analyze or read:

- **Next.js Bloat:** `.next/`, `out/`, `build/`
- **Monorepo/Vue Bloat:** `node_modules/`, `dist/`, `.turbo/`, `.nuxt/` (if applicable)
- **Global:** `pnpm-lock.yaml`, `package-lock.json`, `.git/`

## 2. Context Strategy

- **Next.js Context:** When working on React/Next.js logic, focus **ONLY** on the relevant application directories (e.g., `app/`, `pages/`, `api/`, `components/`). Ignore Vue-specific workspace packages unless explicitly needed for a cross-app feature.
- **Vue Context:** When working on the Vue application, focus **ONLY** on its specific source directories (e.g., `src/`, `components/`, `views/`).
- **Zero-Redundancy:** Do not re-read `package.json`, `turbo.json`, `vite.config.ts`, or `next.config.js` once the workspace stack is identified.

## 3. Structural Intelligence

- Use `anatomy.md` as your primary source for file locations.
- **Tool Parsimony:** Prefer one `grep` command over multiple `read_file` calls to find function definitions.
- **Diff-Only Reporting:** Only output the specific React/Next.js methods or Vue components changed. Do not re-stream entire files.

## 4. Peak Hour Compliance (VET 07:00-13:00)

During peak hours, strictly lead with actions. No conversational filler or long explanations of reasoning.
