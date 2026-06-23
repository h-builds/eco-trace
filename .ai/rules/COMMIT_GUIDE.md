# Eco-Trace Commit Guide

## Purpose

This guide defines commit standards for human and AI-assisted changes.

Commits must be:

- atomic
- readable
- reviewable
- scoped
- reversible

---

## Commit Format

Use:

type(scope): short description

Examples:

- feat(admin): add event detail drawer to dashboard
- fix(engine): correct Ed25519 signature verification
- refactor(consumer): extract scanner composable
- docs(api): document event creation payload
- test(wasm): cover tamper detection scenarios
- chore(repo): align pnpm workspace scripts

---

## Allowed Types

- feat
- fix
- refactor
- docs
- test
- chore

---

## Scope Rules

Scope should describe the affected domain or layer.

Good scopes:

- admin
- consumer
- engine
- ui
- api
- wasm
- auth
- d1
- events
- crypto
- audit
- scanner
- landing
- docs
- repo

Avoid vague scopes:

- stuff
- update
- misc
- changes

---

## Description Rules

Description must:

- be short
- be explicit
- use present tense
- stay under 72 characters when possible

Good:

- feat(api): add GET /api/events endpoint with D1 query
- fix(engine): include actorId in hash computation
- feat(consumer): add QR scanner with camera fallback
- refactor(admin): extract session helpers to lib/

Bad:

- fix: update things
- refactor(code): improve logic
- chore: changes

---

## Atomic Commit Rule

Each commit should represent one logical change.

Allowed:

- one endpoint
- one bug fix
- one refactor
- one documentation update group

Avoid:

- mixing feature + refactor + docs without reason
- giant dump commits
- formatting-only noise mixed with behavior changes

---

## Commit Sequence Guidance

Preferred order when possible:

1. docs/spec changes
2. domain or contract changes
3. implementation
4. tests
5. integration
6. final docs sync

---

## AI-Assisted Commit Rule

If AI helped generate the change:

- review before commit
- remove meaningless comments
- remove fake placeholder logic
- ensure commit message reflects real behavior

Do not commit raw AI output without cleanup.

---

## Monorepo Scope Mapping

When a change spans multiple packages, use the most specific scope:

| Change Location | Scope |
|---|---|
| `apps/admin/` | admin |
| `apps/consumer/` | consumer |
| `packages/engine/` | engine |
| `packages/ui/` | ui |
| `apps/admin/app/api/` | api |
| `packages/engine/internal/crypto/` | crypto |
| `apps/admin/app/lib/session.ts` | auth |
| `apps/admin/schema.sql`, `seed.sql` | d1 |
| Wasm loader / `wasm_exec.js` | wasm |
| Root configs (`turbo.json`, `pnpm-workspace.yaml`) | repo |
| `.ai/` rules and context | docs |

---

## Examples

### Good Commit History

- docs(api): define event creation endpoint contract
- feat(api): add POST /api/events route handler
- feat(engine): implement carbon footprint calculation
- test(engine): cover Ed25519 signature validation
- feat(admin): render threaded audit trail on events page
- feat(consumer): add transparency screen with Wasm badge
- chore(repo): update turbo pipeline for consumer build

### Bad Commit History

- update files
- fix issues
- more changes
- final fix
