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
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .env.production
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
│   │   │   ├── DashboardNavigation.tsx
│   │   │   ├── DemoModeBanner.tsx
│   │   │   └── analytics
│   │   │       ├── MetricCard.tsx
│   │   │       ├── MetricsGrid.tsx
│   │   │       └── TimeRangeFilter.tsx
│   │   ├── docs
│   │   │   └── demo-flow.md
│   │   ├── hooks
│   │   │   └── useWasm.ts
│   │   ├── lib
│   │   │   ├── consumer.ts
│   │   │   ├── demoScenario.ts
│   │   │   ├── seed.ts
│   │   │   ├── wasm.d.ts
│   │   │   └── wasmLoader.ts
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   ├── tsconfig.json
│   │   ├── tsconfig.tsbuildinfo
│   │   └── wrangler.toml
│   ├── consumer
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .env.production
│   │   ├── .eslintrc.cjs
│   │   ├── .lighthouserc.json
│   │   ├── AGENTS.md
│   │   ├── README.md
│   │   ├── TASKS.md
│   │   ├── archive
│   │   │   └── TASKS.md
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── App.vue
│   │   │   ├── composables
│   │   │   │   ├── useEventHistory.ts
│   │   │   │   ├── useScanner.ts
│   │   │   │   └── useWasm.ts
│   │   │   ├── domains
│   │   │   │   ├── landing
│   │   │   │   │   ├── LandingPage.spec.ts
│   │   │   │   │   ├── LandingPage.vue
│   │   │   │   │   └── components
│   │   │   │   │       ├── ActiveNodeStats.vue
│   │   │   │   │       ├── BentoDashboard.vue
│   │   │   │   │       ├── ConsumerFooter.vue
│   │   │   │   │       ├── DemoGuideSection.vue
│   │   │   │   │       ├── HeroSection.spec.ts
│   │   │   │   │       ├── HeroSection.vue
│   │   │   │   │       └── InteropCallout.vue
│   │   │   │   ├── layout
│   │   │   │   │   ├── DemoModeBanner.vue
│   │   │   │   │   └── NavBar.vue
│   │   │   │   ├── scanner
│   │   │   │   │   └── ScannerView.vue
│   │   │   │   └── verification
│   │   │   │       ├── TransparencyScreen.vue
│   │   │   │       ├── components
│   │   │   │       │   ├── AuditTimeline.vue
│   │   │   │       │   ├── AuthenticityBadge.vue
│   │   │   │       │   └── FormulaRenderer.vue
│   │   │   │       └── composables
│   │   │   │           ├── __tests__
│   │   │   │           │   └── useVerificationStatus.spec.ts
│   │   │   │           └── useVerificationStatus.ts
│   │   │   ├── lib
│   │   │   │   ├── api
│   │   │   │   │   ├── cache.ts
│   │   │   │   │   ├── client.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── demo
│   │   │   │   │   └── demoScenario.ts
│   │   │   │   ├── env.ts
│   │   │   │   └── wasm
│   │   │   │       └── engine.ts
│   │   │   ├── main.ts
│   │   │   ├── style.css
│   │   │   ├── tokens.css
│   │   │   └── vite-env.d.ts
│   │   ├── test
│   │   │   ├── a11y.test.ts
│   │   │   ├── api.test.ts
│   │   │   ├── e2e-latency.test.ts
│   │   │   ├── latency.test.ts
│   │   │   ├── logic.test.ts
│   │   │   ├── reactivity.test.ts
│   │   │   ├── stress-latency.test.ts
│   │   │   ├── stress-vapor.test.ts
│   │   │   └── wasm.test.ts
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── vite.config.ts
│   │   ├── vitest.config.ts
│   │   └── wrangler.toml
│   └── hub
│       ├── .env
│       ├── .env.example
│       ├── .env.production
│       ├── .gitignore
│       ├── index.html
│       ├── package.json
│       ├── src
│       │   ├── assets
│       │   │   ├── hero.png
│       │   │   ├── typescript.svg
│       │   │   └── vite.svg
│       │   ├── counter.ts
│       │   ├── main.ts
│       │   └── style.css
│       ├── tsconfig.json
│       └── wrangler.toml
├── docs
│   ├── architecture-flow.md
│   ├── case-study.md
│   ├── demo
│   │   ├── demo-scenario.md
│   │   ├── recruiter-script.md
│   │   └── truth-and-scope.md
│   └── validation.md
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
│   │   ├── main.go
│   │   └── main.wasm
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

64 directories, 174 files
