"""Unit tests for VibeCI multi-layer verification engine."""

from pathlib import Path

from vibeci.engine.coordinator import VerificationEngine
from vibeci.engine.health.env_audit import EnvAuditor
from vibeci.engine.health.secret_scan import SecretScanner
from vibeci.models import CheckStatus


def test_secret_scanner_detects_hardcoded_keys(tmp_path: Path):
    leaky_file = tmp_path / "leak.js"
    leaky_file.write_text("const aws_key = 'AKIA1234567890ABCDEF';\n")

    scanner = SecretScanner(tmp_path)
    result = scanner.scan()
    assert result.status == CheckStatus.FAILED
    assert len(result.file_locations) > 0
    assert result.file_locations[0].file == "leak.js"


def test_env_auditor_flags_missing_example_vars(tmp_path: Path):
    (tmp_path / ".env.example").write_text("PORT=3000\n")
    code_file = tmp_path / "app.js"
    code_file.write_text("const secret = process.env.CUSTOM_NEW_SECRET;\n")

    auditor = EnvAuditor(tmp_path)
    result = auditor.audit()
    assert result.status == CheckStatus.WARNING
    assert "CUSTOM_NEW_SECRET" in result.summary or any("CUSTOM_NEW_SECRET" in d for d in result.failure_details)


def test_verification_engine_honest_unverified_accounting(tmp_path: Path):
    # Setup project with database dependency but no db tests
    (tmp_path / "package.json").write_text('{"dependencies": {"mongoose": "^7.0.0"}}')
    engine = VerificationEngine(tmp_path)
    unverified = engine.identify_unverified_capabilities([])
    names = [u.name for u in unverified]
    assert "Database Integration" in names
    assert "External Third-Party APIs" in names
