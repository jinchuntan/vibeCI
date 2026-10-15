# AI Agent Integration Guide 🤖

VibeCI is built ground-up to be **agent-native**. AI coding agents (Claude Code, Cursor, Codex, Antigravity, GitHub Copilot CLI) can use VibeCI to verify their code changes locally and self-heal before presenting changes to the developer.

---

## 1. System Prompt Snippet

Add this instruction to your project's agent instructions (e.g. `.cursorrules`, `CLAUDE.md`, or `AGENTS.md`):

```markdown
### Code Verification Protocol:
After creating or modifying code files, always run VibeCI verification locally:
1. Run: `vibeci verify --diff --json`
2. If `status` is `"passed"`, you may proceed.
3. If `status` is `"failed"` or contains warnings:
   - Inspect the `failure_details` and `file_locations` in the JSON response.
   - Fix the broken code, missing env variable, or secret leak.
   - Rerun `vibeci verify --diff --json` to confirm the fix.
```

---

## 2. Machine-Readable JSON Schema (`vibeci verify --json`)

The output schema is designed to be token-efficient, stable, and easily parseable:

```json
{
  "vibeci_version": "0.2.0",
  "status": "failed",
  "project_name": "my-app",
  "project_type": "javascript",
  "timestamp": "2026-10-15T14:20:28.000000+00:00",
  "total_duration_ms": 1420,
  "summary": {
    "total": 4,
    "passed": 3,
    "failed": 1,
    "warnings": 0,
    "timed_out": 0,
    "not_checked": 2
  },
  "checks": [
    {
      "name": "security:secrets",
      "layer": "security",
      "type": "security",
      "command": "vibeci-internal:secret-scanner",
      "status": "failed",
      "exit_code": 1,
      "duration_ms": 12,
      "summary": "Detected 1 potentially leaked secret(s) in source code.",
      "failure_details": [
        "Hardcoded database connection string with password in scratch/test_db.js:5"
      ],
      "file_locations": [
        {
          "file": "scratch/test_db.js",
          "line": 5,
          "message": "Hardcoded database connection string with password"
        }
      ]
    }
  ],
  "unverified_capabilities": [
    {
      "name": "Database Integration",
      "reason": "Database drivers are installed, but no test database or isolated DB tests were configured."
    }
  ],
  "agent_hint": {
    "action_required": "Inspect the failure_details and file_locations for failed checks, resolve the errors, and rerun verification.",
    "failed_check_names": ["security:secrets"]
  }
}
```

---

## 3. Fast Self-Correction Workflow

```
[Agent Writes Code] ➔ [vibeci verify --diff --json] ➔ [Failures in JSON?]
                                 │
              ┌──────────────────┴──────────────────┐
              ▼ (No)                                ▼ (Yes)
       [Report to Human]                  [Inspect file_locations]
                                                    │
                                                    ▼
                                          [Apply Code Fix]
                                                    │
                                                    ▼
                                     [Rerun: vibeci verify --diff --json]
```

---

## 4. Cursor Integration (.cursorrules)

Create a `.cursorrules` file in your repository:

```text
Always verify code changes using VibeCI before finishing your turn:
Command: `vibeci verify --diff --json`
Do not push or declare a task complete if VibeCI reports a failed check.
```

---

## 5. Claude Code Integration (CLAUDE.md)

Add to `CLAUDE.md`:

```markdown
## Verification
Before completing any task, execute:
`vibeci verify --diff`
Ensure all checks pass and no secret leaks or missing env variables are reported.
```
