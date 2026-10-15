# VibeCI ⚡

<p align="center">
  <b>Local Software Verification Engine for AI-Generated Code</b><br>
  <i>Catch secret leaks, missing env vars, and build/runtime defects locally — even with <b>zero tests</b>.</i>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-the-5-verification-layers">Verification Layers</a> •
  <a href="#-smart-change-aware-verification---diff">Smart Diff</a> •
  <a href="#-automated-pre-push-hook">Git Hook</a> •
  <a href="#-ai-agent-integration">AI Agents</a> •
  <a href="docs/ARCHITECTURE.md">Architecture</a>
</p>

---

## 💡 Why VibeCI?

AI coding assistants (Claude Code, Cursor, Copilot, Codex) have made generating code instant. But discovering whether that code *actually works* is the new bottleneck.

Most AI-generated projects have **few or zero unit tests**. Standard test runners (`npm test`, `pytest`) can only test what someone has already written. When AI creates scratch files with hardcoded credentials, references new undocumented environment variables, or breaks production bundlers, traditional test runners report that everything passed.

**VibeCI is a local software verification engine.** It inspects, builds, analyzes, and exercises your application across **5 verification layers** before code reaches remote CI or production.

---

## 🏗️ The 5 Verification Layers

```
       ┌────────────────────────┐
       │   AI Coding Agent /    │  Cursor / Claude Code / Copilot / Human
       │       Developer        │
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

1. **Layer 1: Static Health & Preflight (Works with Zero Tests):**
   - **Environment Preflight:** Compares referenced `process.env` / `os.environ` variables against `.env.example` to catch undocumented configuration before deployment.
   - **Secret Leak Detection:** Scans for hardcoded AWS keys, database connection strings, and tokens.
   - **Type & Lint Checks:** Fast project analysis via TypeScript, mypy, ESLint, or Ruff.
2. **Layer 2: Production Build Verification:**
   - Compiles and bundles using project build systems (`npm run build`, `turbo build`, `vite build`, `uv build`).
   - Catches bundling failures that survive syntax checking.
3. **Layer 3: Runtime Smoke Testing:**
   - Boots the app in a sandboxed process group, verifies it doesn't crash on startup, and exercises HTTP routes (`/`, health checks).
4. **Layer 4: Behavior & Existing Tests:**
   - Executes discovered Jest, Vitest, and pytest test suites with forced non-interactive CI flags.
5. **Layer 5: Honest Unverified Accounting:**
   - Transparently lists what could **not** be verified (e.g. unconfigured database queries, third-party payment gateways).

---

## 🚀 Quick Start

### Installation

Install globally using `uv` (recommended) or `pip`:

```bash
# Using uv (fastest)
uv tool install vibeci

# Or with pip
pip install -e .
```

### Run Verification

In any project repository root:

```bash
# Run full 5-layer software verification
vibeci verify

# Or simply:
vibeci
```

---

## ⚡ Smart Change-Aware Verification (`--diff`)

Don't wait for full repository builds on every small AI prompt. Using `vibeci verify --diff`, VibeCI inspects git changes and verifies **only modified files in under 1 second**:

```bash
# Verify only uncommitted / unstaged files modified by AI
vibeci verify --diff

# Compare changes against a specific commit or branch
vibeci verify --diff --since main
vibeci verify --diff --since HEAD~1
```

*Benchmark:* On a production Turborepo with clean working tree, `vibeci verify --diff` completes in **40 milliseconds**.

---

## 🛡️ Automated Pre-Push Hook (`vibeci hook install`)

Never accidentally push broken code, secret leaks, or missing environment variables to GitHub again:

```bash
# Install automated pre-push hook (1 command)
vibeci hook install

# Check hook status
vibeci hook status

# Remove hook
vibeci hook remove
```

Once installed, running `git push` automatically runs VibeCI change-aware verification and blocks the push if any defects are detected.

---

## 🤖 AI Agent Integration

Instruct your AI coding agent (Cursor, Claude Code, Copilot, Antigravity) to verify its work automatically:

> *"After making code changes, run `vibeci verify --diff --json`. If any checks fail or have warnings, inspect the `failure_details`, `file_locations`, and `summary` in the JSON report, fix the issues, and rerun `vibeci verify --diff --json`."*

See the [AI Agent Integration Guide](docs/AGENT_INTEGRATION.md) for ready-to-use `.cursorrules` and `CLAUDE.md` snippets.

---

## 📋 Real-World Verification Report

Below is actual output produced by VibeCI on a production Next.js/Turborepo project:

```
╭──────────────────────────────────────────────────────────────────────────────╮
│ ⚡ VibeCI • Local Verification for AI-Written Code                           │
│ Project: Park Conscious  |  Ecosystem: javascript                            │
╰──────────────────────────────────────────────────────────────────────────────╯
  ⚠ WARNING  env:preflight      env          4.13s  119 referenced env vars missing from .env.example
  ✘ FAILED  security:secrets   security     2.42s  Detected 2 potentially leaked secret(s) in source code
  ✔ PASSED  npm:lint           lint         7.06s  Tasks: 1 successful, 1 total
  ✔ PASSED  npm:build          build        9.39s  Tasks: 2 successful, 2 total
  ✔ PASSED  npm:test:events    test         1.67s  Tasks: 1 successful, 1 total

── What Needs Fixing? ───────────────────────────────────────────
╭───────────────────────── [FAILED] security:secrets ──────────────────────────╮
│ Issue: Detected 2 potentially leaked secret(s) in source code.               │
│ Locations:                                                                   │
│   • scratch/test_pending_email_direct.js:5 — Hardcoded database connection   │
│   • scratch/test_pending_email_meetup.js:5 — Hardcoded database connection   │
╰──────────────────────────────────────────────────────────────────────────────╯

── Unverified Capabilities (Honest Boundaries) ─────────────────
  ○ Database Integration        — Database drivers are installed, but no test DB was configured.
  ○ External Third-Party APIs   — Live third-party API credentials were not exercised.
  ○ End-to-End Browser Flows    — No browser automation tool configured.

╭──────────────────────────────────────────────────────────────────────────────╮
│ ✘ VERDICT: FAILED                                                            │
│ 1 check(s) failed. Review evidence above or feed JSON to your AI agent.      │
╰──── 3 Passed  •  1 Failed  •  1 Warnings  •  3 Not Checked  (in 24.67s) ─────╯
```

---

## 🛠️ CLI Command Reference

| Command | Flags | Description |
| :--- | :--- | :--- |
| `vibeci verify` | `--diff` / `--changed-only` | Verify only files modified in git diff. |
| | `--since <ref>` | Compare changes against a git reference (e.g. `main`, `HEAD~1`). |
| | `--no-build` | Skip production build compilation. |
| | `--no-static` | Skip static health and environment preflight checks. |
| | `--smoke` | Exercise application boot and runtime HTTP probing. |
| | `--build-only` | Run only production build verification. |
| | `--json` | Output machine-readable JSON for AI agents. |
| | `--fail-fast` | Abort immediately on the first failed check. |
| | `--timeout <sec>` | Set maximum execution duration per check. |
| `vibeci hook` | `install` / `remove` / `status` | Manage automated git pre-push verification guard. |
| `vibeci check` | `--failed-only` / `--only <name>` | Legacy task runner interface. |
| `vibeci doctor` | | Inspect environment, virtualenvs, and detected tools. |
| `vibeci init` | | Generate a `.vibeci.toml` configuration file. |

---

## 🔒 Privacy & Local-First Guarantee

- **100% Local:** VibeCI makes **zero network calls**.
- **No Telemetry:** No code, error snippets, or metadata leaves your laptop.
- **Safe Execution:** Subprocesses are sandboxed with process group isolation and strict timeouts.

---

## 📖 Documentation

- [Architecture & Technical Specification](docs/ARCHITECTURE.md)
- [AI Agent Integration Guide (Cursor / Claude Code / Copilot)](docs/AGENT_INTEGRATION.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Vision & Product Definition](VISION.md)

---

## 🛡️ License

[MIT](LICENSE) © 2026 Piyush Kumar
