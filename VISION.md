# VibeCI — Local Verification for AI-Written Code

> **Your AI wrote it. VibeCI checks it.**

**Product:** VibeCI — Local Software Verification Engine for AI-Generated Code  
**Category:** Open-source developer tool & AI coding safety layer  
**Target users:** Beginners, solo developers, and developers building with AI coding agents  
**Core principle:** Find evidence of defects locally *before* code reaches remote CI or production — even when zero tests have been written.

---

## 1. What is VibeCI?

VibeCI is **not just a test runner**. It is a **local software verification engine** built specifically for the era of AI-generated code.

When an AI coding agent writes or modifies code, developers often have no unit tests, or only test a tiny fraction of the system. Pushing to GitHub or deploying to production is a leap of faith.

VibeCI acts as an automated safety layer that inspects, builds, analyzes, and exercises the project locally:

```
       ┌────────────────────────┐
       │    AI Coding Agent     │  (Writes or modifies code)
       └───────────┬────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│             VibeCI Verification Engine                 │
│                                                        │
│  Layer 1: Project Health & Static Scanner              │
│           • Broken imports & missing dependencies      │
│           • Environment variable audit (.env.example)  │
│           • Secret leak detection (hardcoded keys)     │
│           • Type inconsistencies & syntax defects      │
│                                                        │
│  Layer 2: Production Build Verification                │
│           • Bundling & compilation failures            │
│           • Missing build-time assets & dependencies   │
│                                                        │
│  Layer 3: Runtime Smoke Testing                        │
│           • Application boot & startup crash check     │
│           • HTTP route & health check response probe   │
│           • Clean process lifecycle management         │
│                                                        │
│  Layer 4: Behavior & Existing Tests                    │
│           • Project unit & integration test suites     │
│                                                        │
│  Layer 5: Honest Unverified Capabilities               │
│           • Explicitly states what could NOT be checked│
│             (e.g., unconfigured DB, live 3rd-party APIs│
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│            Actionable Verification Report              │
│  • Passed / Failed / Warnings / Not Checked            │
│  • Exact evidence and file locations for AI agent      │
│  • Clear verdict and honest boundaries for human       │
└────────────────────────────────────────────────────────┘
```

---

## 2. The Verification Layers

### Layer 1: Project Health Scanner (Works with Zero Tests)
- **Environment Preflight:** Audits referenced `process.env` / `os.environ` variables against `.env.example` and local `.env` files to catch missing configuration before runtime.
- **Dependency & Import Audit:** Catches broken imports, uninstalled packages, and undeclared dependencies.
- **Secret & Safety Audit:** Scans modified files for accidental hardcoded secrets, private keys, or API tokens.
- **Type & Syntax Checking:** Invokes project type-checkers (`tsc --noEmit`, `mypy`) and fast linters (`ruff`, `eslint`) without low-value noise.

### Layer 2: Production Build Verification
- Identifies the project's production build command (`npm run build`, `turbo build`, `vite build`, `python -m build`).
- Executes the build in a sandboxed, non-interactive environment.
- Detects compilation, bundling, and asset resolution failures that survive static linting.
- Separates build warnings from hard build errors.

### Layer 3: Runtime Smoke Testing
- Boots the application using its configured dev or preview start command.
- Waits for readiness (port listener / HTTP readiness check).
- Immediately catches startup crashes (e.g. unhandled exceptions on boot, missing runtime config).
- Pings configured HTTP routes (e.g. `/`, `/api/health`) to ensure routes return HTTP 200/300 rather than 500s.
- Gracefully shuts down the process tree.

### Layer 4: Behavior & Test Verification
- Discovers and executes existing test suites (`pytest`, `vitest`, `jest`).
- Extracts precise failure lines, assertions, and file:line locations.

### Layer 5: Honest Accounting of Unverified Work
- Explicitly reports what was **not** verified (e.g. "Database integration was not checked because no test database was configured", "Payment gateway unverified").
- **Never** implies that passing checks means software is bug-free.

---

## 3. Product Roadmap

1. **Phase 1 — More than a Wrapper (Health Scanner + Build Verification):**
   - Environment preflight (`.env.example` vs code references).
   - Secret leak detection.
   - Import & dependency checks.
   - Production build verification (`vibeci verify` / `vibeci build`).
2. **Phase 2 — Runtime Smoke Testing:**
   - App boot & startup crash detection.
   - HTTP route probing (home page, health check endpoints).
   - Readiness wait and clean shutdown.
3. **Phase 3 — Change-Aware Impact Analysis:**
   - Git diff inspection to prioritize relevant checks and dependencies.
4. **Phase 4 — Missing-Test Behavior Checks:**
   - Detect untested critical functions and propose deterministic behavior assertions.
5. **Phase 5 — Automated Workflow:**
   - Watch mode and pre-push hooks.
