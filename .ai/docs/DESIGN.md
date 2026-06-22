```markdown
# Design System Document: Industrial Editorial (Light Mode)

## 1. Overview & Creative North Star: "The Precision Blueprint"

This design system is a high-density, light-mode evolution of the "Industrial Editorial" aesthetic. Our Creative North Star is **The Precision Blueprint**. 

Unlike standard enterprise dashboards that rely on "boxy" cards and heavy shadows, this system treats the screen as a high-end technical schematic. It balances the raw, brutalist honesty of an industrial workbench with the sophisticated hierarchy of a premium architectural journal. We achieve this by rejecting traditional "container-ism" in favor of **Tonal Layering** and **Asymmetric Density**. The goal is a digital environment that feels like an engineered tool—precise, authoritative, and intentionally sparse where it matters, yet information-rich where the work happens.

---

## 2. Color & Surface Architecture

The palette transitions from the utilitarian `#F8F9FA` (Canvas) to the clinical `#FFFFFF` (Secondary Surface). We move away from the "flat" look by using Material-inspired surface tiers to imply depth without resorting to skeuomorphism.

### The "No-Line" Rule
**Explicit Instruction:** Do not use `1px solid` borders for sectioning. Structural boundaries must be defined through background color shifts. Use `surface_container_low` (`#f3f3f6`) to sit against the main `background` (`#f9f9fc`). If a hard edge is needed, use a change in tonal value, never a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
- **Base Layer:** `surface` (#f9f9fc) — The primary workbench.
- **Level 1 (Sections):** `surface_container_low` (#f3f3f6) — Large content areas.
- **Level 2 (Active Cards):** `surface_container_lowest` (#ffffff) — Floating interactive elements.
- **Level 3 (High-Detail Modals):** `surface_bright` (#f9f9fc) with Backdrop Blur.

### Signature Textures & Glass
- **The Integrity Gradient:** For primary actions, transition from `#8ED5B4` to `#7ABF9F` at a 135-degree angle. This adds a subtle "machined" sheen to buttons.
- **The Glass Overlay:** For command-center overlays, use `surface_container_lowest` at 85% opacity with a `20px` backdrop-blur. This keeps the industrial context visible beneath the active task.

---

## 3. Typography: The Editorial Engine

We utilize a high-contrast typographic scale to separate "Data" from "Context."

*   **Display & Headlines (Space Grotesk):** This is our "Industrial" voice. It is wide, geometric, and unapologetic. Use `headline-lg` (2rem) for section headers to establish an editorial rhythm.
*   **Metrics & Data (Geist Mono):** Every number, timestamp, or technical reading must use Geist Mono. This creates a "Command Center" feel where data looks engineered, not just typed.
*   **Body & Titles (Inter/Standard UI Sans):** Used for instructional text (`body-md`) and title-level metadata (`title-sm`).

**Editorial Rule:** Headers should often be paired with a `label-sm` "prefix" (e.g., "01 / SYSTEM STATUS") in all-caps Geist Mono to reinforce the technical blueprint aesthetic.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are too "soft" for an industrial workbench. We use light to imply structure, not fluff.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container` background creates a "lift" through contrast alone.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use a "Technical Shadow": `0px 4px 20px rgba(26, 28, 30, 0.06)`. It should be barely perceptible, mimicking the soft ambient light of a high-end lab.
*   **The Ghost Border Fallback:** If a border is required for accessibility, use `outline_variant` at **15% opacity**. A 100% opaque border is a failure of the layout's tonal logic.
*   **Zero Roundedness:** All `border-radius` tokens are set to `0px`. Precision is found in right angles.

---

## 5. Components

### Buttons & Inputs
*   **Primary Action:** `0px` radius. Gradient fill (Integrity Green). Typography: `label-md` (Space Grotesk), all-caps.
*   **Secondary/Tertiary:** No fill. Use `surface_container_high` for hover states. 
*   **Input Fields:** Use `surface_container_lowest` fill. The "active" state is indicated by a 2px bottom-bar of `primary_action`, rather than a full-box outline.

### Information Chips
*   **Technical Tags:** Use Geist Mono `label-sm`. Background `surface_container_highest`. No border. These should look like labels printed on a circuit board.

### Lists & Data Grids
*   **No Dividers:** Forbid the use of horizontal rules. Use `spacing.4` (0.9rem) or `spacing.6` (1.3rem) to create separation.
*   **Row Highlighting:** Use a subtle shift to `surface_container_low` on hover.

### The "Command Strip" (Custom Component)
A high-density vertical or horizontal bar containing Geist Mono metrics and micro-icons. It should use `surface_container_highest` (#e2e2e5) to visually "weight" the side of the screen, creating the asymmetric editorial look.

---

## 6. Do's and Don'ts

### Do:
*   **Use Mono for Numbers:** Always use Geist Mono for any value that can be measured (percentages, counts, IDs).
*   **Embrace White Space:** Use the large spacing tokens (`spacing.16` or `spacing.20`) between major editorial sections to allow the "Industrial" density of the components to breathe.
*   **Align to a Rigid Grid:** While the layout is asymmetric, every element must snap to the spacing scale.

### Don't:
*   **Don't use Rounded Corners:** Ever. The system is `0px` by design to maintain the "Workbench" feel.
*   **Don't use "Grey" for Shadows:** Use a tinted version of `on_surface` at low opacity to maintain a clean, premium light-mode feel.
*   **Don't use dividers:** If you feel the need for a line, try a 12px gap or a tonal background shift first. If a line is mandatory, it must be a "Ghost Border" (15% opacity).

### Accessibility Note:
Ensure the `primary` green (#8ED5B4) is used for all meaningful interactive states to maintain a 4.5:1 contrast ratio against the `surface` and `surface_container` tiers.