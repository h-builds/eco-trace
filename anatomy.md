.
├── .agents
│   └── AGENTS.md
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
│       ├── COMMIT_GUIDE.md
│       └── RULES.md
├── .antigravity
│   └── rules
├── .gitignore
├── .vscode
│   └── settings.json
├── CLAUDE.md
├── PLAN.md
├── README.md
├── TASKS.md
├── anatomy.md
├── apps
│   ├── admin
│   │   ├── .env.example
│   │   ├── AGENTS.md
│   │   ├── README.md
│   │   ├── TASKS.md
│   │   ├── app
│   │   │   ├── api
│   │   │   │   ├── compliance
│   │   │   │   │   └── export
│   │   │   │   │       └── route.ts
│   │   │   │   └── events
│   │   │   │       └── route.ts
│   │   │   ├── dashboard
│   │   │   │   ├── compliance
│   │   │   │   │   ├── ExportButtons.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── entities
│   │   │   │   │   ├── ActorForm.tsx
│   │   │   │   │   ├── AssetForm.tsx
│   │   │   │   │   ├── actions.ts
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── events
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── overview
│   │   │   │       ├── OverviewClient.tsx
│   │   │   │       ├── actions.ts
│   │   │   │       ├── error.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── globals.css
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
│   │   ├── archive
│   │   │   └── TASKS.md
│   │   ├── components
│   │   │   ├── AuditTester.tsx
│   │   │   ├── DemoModeBanner.tsx
│   │   │   └── analytics
│   │   │       ├── MetricCard.tsx
│   │   │       ├── MetricsGrid.tsx
│   │   │       └── TimeRangeFilter.tsx
│   │   ├── hooks
│   │   │   └── useWasm.ts
│   │   ├── lib
│   │   │   ├── consumer.ts
│   │   │   ├── demoScenario.ts
│   │   │   ├── seed.ts
│   │   │   ├── wasm.d.ts
│   │   │   └── wasmLoader.ts
│   │   ├── middleware.ts
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── postcss.config.mjs
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
│       ├── archive
│       │   └── TASKS.md
│       ├── index.html
│       ├── package.json
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
├── docs
│   └── demo
│       └── truth-and-scope.md
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
└── turbo.json

52 directories, 142 files
