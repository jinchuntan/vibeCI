# Contributing to VibeCI ⚡

Thank you for your interest in contributing to VibeCI!

---

## 🛠️ Development Setup

VibeCI uses Python 3.11+ and [`uv`](https://github.com/astral-sh/uv) for fast package management.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vibeCI.git
cd vibeCI
```

### 2. Set up virtual environment & install dependencies
```bash
# Create venv and install dependencies
uv sync

# Install VibeCI in editable mode
uv pip install -e .
```

### 3. Run the test suite
```bash
uv run pytest
```

---

## 🧪 Project Structure

```
src/vibeci/
├── cli.py                    # CLI commands (verify, check, hook, doctor, init)
├── config.py                 # Configuration loader (.vibeci.toml)
├── models.py                 # Data models & result schema
├── runner.py                 # Non-interactive process execution & timeouts
├── engine/
│   ├── coordinator.py        # Master 5-layer verification coordinator
│   ├── diff/                 # Smart git-diff change analyzer
│   ├── health/               # Secret scanner, environment preflight
│   ├── build/                # Production build verifier
│   └── runtime/              # Runtime smoke tester & port prober
├── detectors/                # Auto-detectors for Python, Node, Turborepo
└── formatters/               # Rich console UI and agent JSON formatters
```

---

## 📜 Pull Request Guidelines

1. **Verify VibeCI on itself**:
   ```bash
   uv run vibeci verify
   ```
2. **Ensure all tests pass**:
   ```bash
   uv run pytest
   ```
3. Keep code modular, type-annotated, and maintain documentation integrity.
