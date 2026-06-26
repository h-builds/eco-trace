# Code Review Audit: feat/consumer

> **For AI agents:** This file is a checklist of violations found during the code review of the `feat/consumer` branch. Work through each unchecked task, mark it `[x]` when resolved, and commit the fix. Do not skip items or reorder work — dependencies are noted where relevant.

## Summary

The branch implements all required features correctly. All **15 tasks** across **6 violation groups** have been resolved. This PR is ready for merge.

---

## 1. Domain Structure (Rules 10, 29, 38)

**Why:** Components were dumped into a flat `src/components/` folder with mixed ownership. Rules 10, 29, and 38 require domain-based folder organization.

- [x] Create domain folders: `src/domains/landing/`, `src/domains/scanner/`, `src/domains/verification/`
- [x] Move `LandingPage.vue` and all `src/components/landing/*` files into `src/domains/landing/`
- [x] Move `ScannerView.vue` into `src/domains/scanner/`
- [x] Move `TransparencyScreen.vue`, `AuditTimeline.vue`, `AuthenticityBadge.vue`, `FormulaRenderer.vue` into `src/domains/verification/`
- [x] Move `DemoModeBanner.vue` into `src/domains/layout/` (shared layout concern)
- [x] Update all import paths across `App.vue` and other consumers

---

## 2. Naming (Rule 22)

**Why:** Rule 22 forbids generic names like `value`, `val`, `res`. Names must reflect business meaning.

- [x] In `ScannerView.vue`: rename emit payload `value` → `assetId` and callback param `val` → `scannedAssetId`
- [x] In `TransparencyScreen.vue` / `useVerificationStatus.ts`: rename `res` → `integrityResult`

---

## 3. Separation of Concerns (Rules 31, 38)

**Why:** `TransparencyScreen.vue` was a large file that mixed data-fetching, cryptographic business logic, and heavy UI presentation.

- [x] Extract the `overallStatus` computed property into a dedicated composable `useVerificationStatus.ts` under `src/domains/verification/composables/`
- [x] Ensure the composable is independently testable with a unit test
- [x] Reduce `TransparencyScreen.vue` to a thin container that delegates data-fetching to `useEventHistory` and verification to the new composable

---

## 4. Type Safety (Rules 26, 39)

**Why:** An explicit `as any` cast was used to bypass TypeScript when destructuring the event payload.

- [x] Remove the `as any` cast — destructuring now works directly against `SupplyChainEvent` type in both `useVerificationStatus.ts` and `AuditTimeline.vue`

---

## 5. Performance — LCP & CLS (2026 Best Practices)

**Why:** The fallback QR code image in `ScannerView.vue` lacked native HTML sizing attributes and `fetchpriority`.

- [x] Add `width="128"` and `height="128"` to the QR code `<img>` tag
- [x] Add `fetchpriority="high"` to the QR code `<img>` tag

---

## 6. Accessibility — A11y (WCAG 2.1 AA)

**Why:** Several interactive elements fail tap-target sizing, decorative icons pollute the accessibility tree, and low-opacity text fails contrast ratios.

- [x] In `AuditTimeline.vue`: add `min-h-12 min-w-12` (48px) to the `<summary>` element for the "Technical details" disclosure
- [x] In `ScannerView.vue`: add sufficient padding (`py-3 px-4`) to the "Open Auditor Workstation" `<a>` link so it meets the 48x48px tap target
- [x] Add `aria-hidden="true"` to decorative SVG icons in `ScannerView.vue`, `HeroSection.vue`, `DemoModeBanner.vue`, `TransparencyScreen.vue`
- [x] In `ScannerView.vue`: change `text-white/40` to `text-white/70` to meet WCAG 2.1 AA 4.5:1 contrast ratio
- [x] In `AuditTimeline.vue` (line 102): add `aria-hidden="true"` to the chevron SVG inside the `<summary>` element

---

## Passed Rules (No Action Required)

These rules were followed correctly across all modified files:

- ✅ **Rule 21 (Comments):** Code is self-explanatory with no redundant or placeholder comments.
- ✅ **Rule 23 (Function Focus):** Handlers and emits are small and single-purpose.
- ✅ **Rule 28 (Error Handling):** Camera failures display safe, user-facing messages. Cryptographic errors are presented without leaking stack traces.
- ✅ **Rule 32 (No Fake Completeness):** Demo data is honestly labeled (`DemoModeBanner`, `DEMO_DATA_ONLY` chips). No mock logic masquerades as production code.
