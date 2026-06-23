.
├── anatomy.md
├── apps
│   ├── admin
│   │   ├── AGENTS.md
│   │   ├── app
│   │   │   ├── api
│   │   │   │   └── events
│   │   │   │       └── route.ts
│   │   │   ├── dashboard
│   │   │   │   └── events
│   │   │   │       └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── apps
│   │   │   └── consumer
│   │   │       ├── package.json
│   │   │       └── package-lock.json
│   │   ├── components
│   │   │   └── AuditTester.tsx
│   │   ├── hooks
│   │   │   └── useWasm.ts
│   │   ├── lib
│   │   │   ├── seed.ts
│   │   │   ├── wasm.d.ts
│   │   │   └── wasmLoader.ts
│   │   ├── next.config.mjs
│   │   ├── next-env.d.ts
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── public
│   │   │   ├── engine.wasm
│   │   │   └── wasm_exec.js
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   ├── TASKS.md
│   │   ├── tsconfig.json
│   │   └── wrangler.toml
│   └── consumer
│       ├── AGENTS.md
│       ├── index.html
│       ├── package.json
│       ├── public
│       │   ├── engine.wasm
│       │   ├── robots.txt
│       │   └── wasm_exec.js
│       ├── src
│       │   ├── App.vue
│       │   ├── components
│       │   │   ├── AuditTimeline.vue
│       │   │   ├── AuthenticityBadge.vue
│       │   │   ├── FormulaRenderer.vue
│       │   │   ├── landing
│       │   │   │   ├── ActiveNodeStats.vue
│       │   │   │   ├── BentoDashboard.vue
│       │   │   │   ├── ConsumerFooter.vue
│       │   │   │   ├── HeroSection.vue
│       │   │   │   └── InteropCallout.vue
│       │   │   ├── LandingPage.spec.ts
│       │   │   ├── LandingPage.vue
│       │   │   ├── NavBar.vue
│       │   │   ├── ScannerView.vue
│       │   │   └── TransparencyScreen.vue
│       │   ├── composables
│       │   │   ├── useEventHistory.ts
│       │   │   ├── useScanner.ts
│       │   │   └── useWasm.ts
│       │   ├── lib
│       │   │   ├── api
│       │   │   │   ├── cache.ts
│       │   │   │   ├── client.ts
│       │   │   │   └── types.ts
│       │   │   └── wasm
│       │   │       └── engine.ts
│       │   ├── main.ts
│       │   ├── style.css
│       │   ├── tokens.css
│       │   └── vite-env.d.ts
│       ├── TASKS.md
│       ├── test
│       │   ├── a11y.test.ts
│       │   ├── api.test.ts
│       │   ├── e2e-latency.test.ts
│       │   ├── latency.test.ts
│       │   ├── logic.test.ts
│       │   ├── reactivity.test.ts
│       │   ├── stress-latency.test.ts
│       │   ├── stress-vapor.test.ts
│       │   └── wasm.test.ts
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vite.config.ts
│       └── vitest.config.ts
├── CLAUDE.md
├── package.json
├── package-lock.json
├── packages
│   ├── engine
│   │   ├── build.sh
│   │   ├── cmd
│   │   │   └── test_verify
│   │   │       └── main.go
│   │   ├── go.mod
│   │   ├── internal
│   │   │   ├── crypto
│   │   │   │   ├── crypto.go
│   │   │   │   ├── crypto_test.go
│   │   │   │   └── registry.go
│   │   │   ├── logic
│   │   │   │   ├── calculator.go
│   │   │   │   └── calculator_test.go
│   │   │   └── types
│   │   │       └── types.go
│   │   ├── main.go
│   │   └── TASKS.md
│   └── ui
│       ├── index.ts
│       ├── package.json
│       ├── scripts
│       │   └── contrast-validator.ts
│       ├── tailwind.config.ts
│       ├── tokens.json
│       ├── tsconfig.json
│       └── variables.css
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public
│   └── wasm_exec.js
├── README.md
└── turbo.json

35 directories, 95 files
