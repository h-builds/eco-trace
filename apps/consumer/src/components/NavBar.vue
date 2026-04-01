<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'landing'): void;
}>();

const AUDITOR_DASHBOARD_URL = '#';
</script>

<template>
  <!--
    TopNavBar — matches reference: .ai/docs/code.html line 95–109
    Three-column layout: [Wordmark] [Nav Link] [Icon Action]
    All styling uses --bp-* design tokens (no old token names).
  -->
  <nav class="nav-bar">
    <!-- Left: Brand wordmark -->
    <button
      @click="$emit('navigate', 'landing')"
      class="nav-wordmark"
      aria-label="Eco-Trace home"
    >
      ECO-TRACE
    </button>

    <!-- Center: Primary navigation link -->
    <div class="nav-center">
      <a
        :href="AUDITOR_DASHBOARD_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link-primary"
      >
        Enter Auditor Dashboard (React 19)
      </a>
    </div>

    <!-- Right: Icon action button -->
    <div class="nav-actions">
      <a
        :href="AUDITOR_DASHBOARD_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-icon-btn"
        aria-label="Open Auditor Dashboard in new tab"
      >
        <!-- Material Symbol equivalent using Unicode / inline SVG fallback -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
        </svg>
      </a>
    </div>
  </nav>
</template>

<style scoped>
/* ─── Nav container ────────────────────────────────────────────────── */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-bp-nav);

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: var(--spacing-bp-2) var(--spacing-bp-4);

  background-color: var(--color-bp-surface-glass);       /* white/80 equivalent */
  backdrop-filter: blur(var(--blur-bp-nav));
  -webkit-backdrop-filter: blur(var(--blur-bp-nav));

  border-bottom: 1px solid rgba(196, 198, 201, 0.30);    /* outline-variant/30 */
}

/* ─── Brand wordmark ───────────────────────────────────────────────── */
.nav-wordmark {
  font-family: var(--font-bp-display);           /* Space Grotesk */
  font-size: 1.25rem;                            /* text-xl */
  font-weight: var(--font-weight-bp-bold);
  letter-spacing: var(--tracking-bp-tight);      /* tracking-tighter */
  text-transform: uppercase;
  color: var(--color-bp-primary);

  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  transition: var(--transition-bp-colors);
}

.nav-wordmark:hover {
  opacity: 0.80;
}

/* ─── Center nav area ──────────────────────────────────────────────── */
.nav-center {
  display: none;                                 /* hidden on mobile */
}

@media (min-width: 768px) {
  .nav-center {
    display: flex;
    align-items: center;
    gap: 2rem;                                   /* gap-8 */
  }
}

/* ─── Primary nav link (active / underline style) ─────────────────── */
.nav-link-primary {
  font-family: var(--font-bp-display);           /* Space Grotesk */
  font-size: var(--font-size-bp-sm);             /* text-sm */
  font-weight: var(--font-weight-bp-bold);
  letter-spacing: var(--tracking-bp-tight);      /* tracking-tighter */
  text-transform: uppercase;
  color: var(--color-bp-primary);
  text-decoration: none;

  /* Active underline treatment — mirrors border-b-2 border-primary pb-1 */
  border-bottom: 2px solid var(--color-bp-primary);
  padding-bottom: 0.25rem;

  transition: var(--transition-bp-colors);
}

.nav-link-primary:hover {
  opacity: 0.80;
}

/* ─── Right-side action area ───────────────────────────────────────── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-bp-4);
}

/* ─── Icon action button ───────────────────────────────────────────── */
.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacing-bp-2);                  /* p-2 */
  color: rgba(68, 71, 74, 0.60);                 /* on-surface-variant/60 */

  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  transition:
    background-color var(--duration-bp-fast) var(--ease-bp-standard),
    transform var(--duration-bp-instant) var(--ease-bp-standard);
}

.nav-icon-btn:hover {
  background-color: var(--color-bp-surface-container-high); /* hover:bg-surface-container-high */
}

.nav-icon-btn:active {
  transform: scale(0.95);                        /* active:scale-95 */
}
</style>
