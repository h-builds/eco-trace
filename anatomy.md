.
├── .ai
│   ├── context
│   │   ├── CONTEXT.md
│   │   └── SPEC.md
│   ├── docs
│   │   ├── DESIGN.md
│   │   └── code.html
│   ├── knowledge
│   │   ├── ARCHITECTURE.md
│   │   ├── DATA_DICTIONARY.md
│   │   └── EVALS.md
│   ├── prompts
│   │   └── LIBRARY.md
│   └── rules
│       ├── AGENTS.md
│       └── RULES.md
├── .antigravity
│   └── rules
├── .gitignore
├── .turbo
│   └── cache
├── .vscode
│   └── settings.json
├── CLAUDE.md
├── README.md
├── anatomy.md
├── apps
│   ├── admin
│   │   ├── AGENTS.md
│   │   ├── TASKS.md
│   │   ├── app
│   │   │   ├── api
│   │   │   │   └── events
│   │   │   │       └── route.ts
│   │   │   ├── dashboard
│   │   │   │   ├── events
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── lib
│   │   │   │   ├── auth-actions.ts
│   │   │   │   ├── logger.ts
│   │   │   │   └── session.ts
│   │   │   ├── login
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── page.tsx
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
│   │   ├── middleware.ts
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── engine.wasm
│   │   │   └── wasm_exec.js
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   ├── tsconfig.json
│   │   ├── tsconfig.tsbuildinfo
│   │   └── wrangler.toml
│   └── consumer
│       ├── .env.example
│       ├── .eslintrc.cjs
│       ├── .lighthouserc.json
│       ├── AGENTS.md
│       ├── TASKS.md
│       ├── index.html
│       ├── package.json
│       ├── public
│       │   ├── robots.txt
│       │   └── wasm_exec.js
│       ├── src
│       │   ├── App.vue
│       │   ├── components
│       │   │   ├── AuditTimeline.vue
│       │   │   ├── AuthenticityBadge.vue
│       │   │   ├── FormulaRenderer.vue
│       │   │   ├── LandingPage.spec.ts
│       │   │   ├── LandingPage.vue
│       │   │   ├── NavBar.vue
│       │   │   ├── ScannerView.vue
│       │   │   ├── TransparencyScreen.vue
│       │   │   └── landing
│       │   │       ├── ActiveNodeStats.vue
│       │   │       ├── BentoDashboard.vue
│       │   │       ├── ConsumerFooter.vue
│       │   │       ├── HeroSection.vue
│       │   │       └── InteropCallout.vue
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
├── package-lock.json
├── package.json
├── packages
│   ├── engine
│   │   ├── TASKS.md
│   │   ├── build.sh
│   │   ├── cmd
│   │   │   └── test_verify
│   │   │       └── main.go
│   │   ├── engine.wasm
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
│   │   └── main.go
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
│   ├── engine.wasm
│   └── wasm_exec.js
└── turbo.json
