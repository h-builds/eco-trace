.
├── apps
│   ├── admin
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
│   │   │       ├── package-lock.json
│   │   │       └── package.json
│   │   ├── components
│   │   │   └── AuditTester.tsx
│   │   ├── hooks
│   │   │   └── useWasm.ts
│   │   ├── lib
│   │   │   ├── seed.ts
│   │   │   ├── wasm.d.ts
│   │   │   └── wasmLoader.ts
│   │   ├── AGENTS.md
│   │   ├── TASKS.md
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   ├── tsconfig.json
│   │   └── wrangler.toml
│   └── consumer
│       ├── src
│       │   ├── components
│       │   │   ├── AuditTimeline.vue
│       │   │   ├── AuthenticityBadge.vue
│       │   │   ├── FormulaRenderer.vue
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
│       │   ├── App.vue
│       │   ├── main.ts
│       │   ├── style.css
│       │   └── vite-env.d.ts
│       ├── test
│       │   ├── api.test.ts
│       │   ├── latency.test.ts
│       │   ├── logic.test.ts
│       │   ├── reactivity.test.ts
│       │   └── wasm.test.ts
│       ├── AGENTS.md
│       ├── TASKS.md
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── packages
│   ├── engine
│   │   ├── cmd
│   │   │   └── test_verify
│   │   │       └── main.go
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
│   │   ├── TASKS.md
│   │   ├── build.sh
│   │   ├── engine.wasm
│   │   ├── go.mod
│   │   └── main.go
│   └── ui
│       ├── scripts
│       │   └── contrast-validator.ts
│       ├── index.ts
│       ├── package.json
│       ├── tailwind.config.ts
│       ├── tokens.json
│       ├── tsconfig.json
│       └── variables.css
├── README.md
├── anatomy.md
├── package-lock.json
├── package.json
├── pnpm-workspace.yaml
└── turbo.json

30 directories, 74 files
