<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'landing'): void;
}>();

const AUDITOR_DASHBOARD_URL = '#';
</script>

<template>
  <nav class="nav-bar">
    <button
      class="nav-wordmark"
      aria-label="Eco-Trace home"
      @click="$emit('navigate', 'landing')"
    >
      ECO-TRACE
    </button>

    <div class="nav-actions">
      <div class="nav-dashboard-group">
        <a
          class="nav-link-primary"
          target="_blank"
          rel="noopener noreferrer"
          :href="AUDITOR_DASHBOARD_URL"
        >
          Enter Auditor Dashboard (React 19)
        </a>
        <a
          class="nav-icon-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Auditor Dashboard in new tab"
          :href="AUDITOR_DASHBOARD_URL"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
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

  background-color: var(--color-bp-surface-glass);
  backdrop-filter: blur(var(--blur-bp-nav));
  -webkit-backdrop-filter: blur(var(--blur-bp-nav));

  border-bottom: 1px solid rgba(196, 198, 201, 0.30);
}

.nav-wordmark {
  font-family: var(--font-bp-display);
  font-size: 1.25rem;
  font-weight: var(--font-weight-bp-bold);
  letter-spacing: var(--tracking-bp-tight);
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

.nav-dashboard-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-bp-2);
}

.nav-dashboard-group .nav-link-primary {
  display: none;
}

@media (min-width: 768px) {
  .nav-dashboard-group .nav-link-primary {
    display: inline-block;
  }
}

.nav-link-primary {
  font-family: var(--font-bp-display);
  font-size: var(--font-size-bp-sm);
  font-weight: var(--font-weight-bp-bold);
  letter-spacing: var(--tracking-bp-tight);
  text-transform: uppercase;
  color: var(--color-bp-primary);
  text-decoration: none;

  border-bottom: 2px solid var(--color-bp-primary);
  padding-bottom: 0.25rem;

  transition: var(--transition-bp-colors);
}

.nav-link-primary:hover {
  opacity: 0.80;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-bp-4);
}

.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacing-bp-2);
  color: rgba(68, 71, 74, 0.60);

  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  transition:
    background-color var(--duration-bp-fast) var(--ease-bp-standard),
    transform var(--duration-bp-instant) var(--ease-bp-standard);
}

.nav-icon-btn:hover {
  background-color: var(--color-bp-surface-container-high);
}

.nav-icon-btn:active {
  transform: scale(0.95);
}
</style>
