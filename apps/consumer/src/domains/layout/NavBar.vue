<script setup lang="ts">
import { getAdminUrl } from '@/lib/env';

defineEmits<{
  (e: 'navigate', view: 'landing'): void;
}>();

const ADMIN_URL = getAdminUrl();
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
          class="nav-link-primary cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          :href="ADMIN_URL"
        >
          Open Auditor Workstation
        </a>
        <a
          class="nav-icon-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Auditor Workstation in new tab"
          :href="ADMIN_URL"
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
  z-index: 50;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0.5rem 1rem;

  background-color: rgba(248,249,250,0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  border-bottom: 1px solid var(--color-surface-border);
}

.nav-wordmark {
  font-family: var(--font-family-base);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: var(--color-brand-deep-charcoal);

  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  transition: all 0.15s ease;
}

.nav-wordmark:hover {
  opacity: 0.80;
}

.nav-dashboard-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  font-family: var(--font-family-base);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: var(--color-brand-deep-charcoal);
  text-decoration: none;

  border-bottom: 2px solid var(--color-brand-deep-charcoal);
  padding-bottom: 0.25rem;

  transition: all 0.15s ease;
}

.nav-link-primary:hover {
  opacity: 0.80;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  color: var(--color-functional-neutral);
  opacity: 0.60;

  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  transition:
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 0ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-icon-btn:hover {
  background-color: var(--color-surface-border);
}

.nav-icon-btn:active {
  transform: scale(0.95);
}
</style>
