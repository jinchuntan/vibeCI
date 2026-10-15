"""Tests for VibeCI project check detectors."""

import json
from pathlib import Path

from vibeci.detectors.javascript import JavaScriptDetector
from vibeci.detectors.python import PythonDetector


def test_python_detector_with_pytest_and_ruff(tmp_path: Path):
    # Setup mock python project
    pyproject = tmp_path / "pyproject.toml"
    pyproject.write_text(
        """
[project]
name = "test-pkg"
version = "0.1.0"

[tool.pytest.ini_options]
minversion = "7.0"

[tool.ruff]
line-length = 88
""",
        encoding="utf-8",
    )
    tests_dir = tmp_path / "tests"
    tests_dir.mkdir()
    (tests_dir / "test_sample.py").write_text("def test_ok(): pass\n")

    detector = PythonDetector()
    assert detector.is_applicable(tmp_path) is True

    checks = detector.detect(tmp_path)
    check_names = [c.name for c in checks]
    assert "pytest" in check_names
    assert "ruff" in check_names


def test_javascript_detector_with_npm_scripts(tmp_path: Path):
    pkg_json = tmp_path / "package.json"
    pkg_json.write_text(
        json.dumps({
            "name": "mock-js-project",
            "scripts": {
                "test": "vitest run",
                "lint": "eslint .",
                "typecheck": "tsc --noEmit",
            },
        }),
        encoding="utf-8",
    )

    detector = JavaScriptDetector()
    assert detector.is_applicable(tmp_path) is True

    checks = detector.detect(tmp_path)
    check_names = [c.name for c in checks]
    assert any("test" in name for name in check_names)
    assert any("lint" in name for name in check_names)
    assert any("typecheck" in name for name in check_names)


def test_javascript_detector_ignores_npm_dummy_test(tmp_path: Path):
    pkg_json = tmp_path / "package.json"
    pkg_json.write_text(
        json.dumps({
            "name": "mock-js-project",
            "scripts": {
                "test": 'echo "Error: no test specified" && exit 1',
            },
        }),
        encoding="utf-8",
    )

    detector = JavaScriptDetector()
    checks = detector.detect(tmp_path)
    # The dummy test should be filtered out
    assert not any("test" in c.name for c in checks)
