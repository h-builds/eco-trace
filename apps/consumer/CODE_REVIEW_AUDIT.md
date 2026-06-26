# Code Review Audit: feat/consumer

> **For AI agents:** This file is a checklist of violations found during the code review of the `feat/consumer` branch. Work through each unchecked task, mark it `[x]` when resolved, and commit the fix. Do not skip items or reorder work — dependencies are noted where relevant.

## Summary

The branch implements all required features correctly but violates several architectural, type-safety, performance, and accessibility rules. **6 violation groups** with **15 individual tasks** need to be resolved.

---

## 1. Domain Structure (Rules 10, 29, 38)

**Why:** Components are dumped into a flat `src/components/` folder with mixed ownership. Rules 10, 29, and 38 require domain-based folder organization.

- [ ] Create domain folders: `src/domains/landing/`, `src/domains/scanner/`, `src/domains/verification/`
- [ ] Move `LandingPage.vue` and all `src/components/landing/*` files into `src/domains/landing/`
- [ ] Move `ScannerView.vue` into `src/domains/scanner/`
- [ ] Move `TransparencyScreen.vue`, `AuditTimeline.vue`, `AuthenticityBadge.vue`, `FormulaRenderer.vue` into `src/domains/verification/`
- [ ] Move `DemoModeBanner.vue` into `src/domains/layout/` (shared layout concern)
- [ ] Update all import paths across `App.vue` and other consumers

---

## 2. Naming (Rule 22)

**Why:** Rule 22 forbids generic names like `value`, `val`, `res`. Names must reflect business meaning.

- [ ] In `ScannerView.vue`: rename emit payload `value` → `assetId` and callback param `val` → `scannedAssetId`
  ```typescript
  // Before
  defineEmits<{ (e: 'scan', value: string): void; }>();
  useScanner((val) => { emit('scan', val); });
  // After
  defineEmits<{ (e: 'scan', assetId: string): void; }>();
  useScanner((scannedAssetId) => { emit('scan', scannedAssetId); });
  ```
- [ ] In `TransparencyScreen.vue`: rename `res` → `integrityResult`
  ```typescript
  // Before
  const res = verifyIntegrity(payload, event.signature, event.public_key);
  // After
  const integrityResult = verifyIntegrity(payload, event.signature, event.public_key);
  ```

---

## 3. Separation of Concerns (Rules 31, 38)

**Why:** `TransparencyScreen.vue` is a large file that mixes data-fetching, cryptographic business logic, and heavy UI presentation. Rules 31 and 38 forbid mixed responsibilities inside one component and hiding complex behavior inside computed chains.

- [ ] Extract the `overallStatus` computed property into a dedicated composable `useVerificationStatus.ts` under `src/domains/verification/composables/`
- [ ] Ensure the composable is independently testable with a unit test
- [ ] Reduce `TransparencyScreen.vue` to a thin container that delegates data-fetching to `useEventHistory` and verification to the new composable

---

## 4. Type Safety (Rules 26, 39)

**Why:** An explicit `as any` cast is used to bypass TypeScript when destructuring the event payload. Rules 26 and 39 forbid casual casting and loose object shapes.

- [ ] In `TransparencyScreen.vue` (or the extracted composable): remove the `as any` cast and use `Omit<SupplyChainEvent, 'signature' | 'public_key' | 'integrity_status'>` or a typed utility to safely extract the verification payload
  ```typescript
  // Before (forbidden)
  const { signature, public_key, integrity_status, ...payload } = event as any;
  // After (compliant)
  const { signature, public_key, integrity_status, ...payload } = event;
  // Ensure SupplyChainEvent type includes these keys so destructuring is safe
  ```

---

## 5. Performance — LCP & CLS (2026 Best Practices)

**Why:** The fallback QR code image in `ScannerView.vue` lacks native HTML sizing attributes, which causes Cumulative Layout Shift (CLS). It also lacks `fetchpriority`, which impacts Largest Contentful Paint (LCP) for the scanner view.

- [ ] Add `width="128"` and `height="128"` to the QR code `<img>` tag
- [ ] Add `fetchpriority="high"` to the QR code `<img>` tag
  ```html
  <!-- Before -->
  <img src="/qr-demo.png" alt="Demo QR Code for ASSET-COFFEE-2026-001" class="w-32 h-32 bg-white p-2 rounded shadow-md" />
  <!-- After -->
  <img src="/qr-demo.png" alt="Demo QR Code for ASSET-COFFEE-2026-001" width="128" height="128" fetchpriority="high" class="w-32 h-32 bg-white p-2 rounded shadow-md" />
  ```

---

## 6. Accessibility — A11y (WCAG 2.1 AA)

**Why:** Several interactive elements fail tap-target sizing, decorative icons pollute the accessibility tree, and low-opacity text fails contrast ratios.

- [ ] In `AuditTimeline.vue`: add `min-h-12 min-w-12` (48px) padding to the `<summary>` element for the "Technical details" disclosure
- [ ] In `ScannerView.vue`: add sufficient padding to the "Open Auditor Workstation" `<a>` link so it meets the 48x48px tap target
- [ ] Add `aria-hidden="true"` to all decorative SVG icons inside buttons across modified files (`ScannerView.vue`, `HeroSection.vue`, `DemoModeBanner.vue`, `TransparencyScreen.vue`)
- [ ] In `ScannerView.vue`: change `text-white/40` to `text-white/70` (or higher) to meet WCAG 2.1 AA 4.5:1 contrast ratio

---

## Passed Rules (No Action Required)

These rules were followed correctly across all modified files:

- ✅ **Rule 21 (Comments):** Code is self-explanatory with no redundant or placeholder comments.
- ✅ **Rule 23 (Function Focus):** Handlers and emits are small and single-purpose.
- ✅ **Rule 28 (Error Handling):** Camera failures display safe, user-facing messages. Cryptographic errors are presented without leaking stack traces.
- ✅ **Rule 32 (No Fake Completeness):** Demo data is honestly labeled (`DemoModeBanner`, `DEMO_DATA_ONLY` chips). No mock logic masquerades as production code.
