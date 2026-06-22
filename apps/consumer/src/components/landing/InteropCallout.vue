<template>
  <section class="w-full px-4 md:px-8 pb-16 md:pb-20">
    <div class="w-full collab-bridge">
      <div class="w-full sm:w-3/4 space-y-6">
        <h2
          class="font-mono text-xs font-bold tracking-[0.3em] uppercase"
          style="color: var(--color-bp-primary);"
        >
          Framework Interoperability
        </h2>

        <p
          class="font-['Space_Grotesk'] text-2xl md:text-3xl font-light leading-snug"
          style="color: var(--color-bp-on-surface);"
        >
          This ecosystem demonstrates a dual-engine strategy. While the
          <span
            class="font-bold"
            style="color: var(--color-bp-primary);"
          >
            Admin Dashboard
          </span>
          leverages React 19 for complex auditing, this
          <span
            class="font-bold"
            style="color: var(--color-bp-primary);"
          >
            Consumer App
          </span>
          utilizes Vue 3.5 Vapor for extreme mobile performance.
        </p>

        <div class="flex items-center gap-4 py-4">
          <div
            class="h-px flex-grow"
            style="background-color: var(--outline-bp-ghost);"
          />
          <span
            class="font-mono text-[10px] uppercase tracking-widest"
            style="color: var(--color-bp-on-surface-variant);"
          >
            Unified Validation Core [Go/Wasm]
          </span>
          <div
            class="h-px flex-grow"
            style="background-color: var(--outline-bp-ghost);"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collab-bridge {
  background-color: var(--color-bp-surface-container-lowest) !important;
  border-left: 4px solid var(--color-bp-primary) !important;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07) !important;
}
@media (min-width: 768px) {
  .collab-bridge {
    padding: 3rem;
  }
}
</style>
