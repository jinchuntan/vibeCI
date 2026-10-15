"""Tests for VibeCI CLI commands."""

import json
from pathlib import Path

from vibeci.cli import build_parser, handle_check, handle_doctor, handle_init


def test_cli_init_command(tmp_path: Path):
    parser = build_parser()
    args = parser.parse_args(["init", "-C", str(tmp_path)])
    code = handle_init(args)
    assert code == 0
    config_file = tmp_path / ".vibeci.toml"
    assert config_file.exists()
    assert "timeout_seconds" in config_file.read_text()


def test_cli_check_json_output(tmp_path: Path, capsys):
    # Setup mock python project with a test that passes
    (tmp_path / "pyproject.toml").write_text("[project]\nname='demo'\nversion='0.1.0'\n")
    tests_dir = tmp_path / "tests"
    tests_dir.mkdir()
    (tests_dir / "test_simple.py").write_text("def test_ok(): assert 1 == 1\n")

    parser = build_parser()
    args = parser.parse_args(["check", "--json", "-C", str(tmp_path)])
    code = handle_check(args)

    captured = capsys.readouterr()
    data = json.loads(captured.out)
    assert "status" in data
    assert "checks" in data
    assert "summary" in data


def test_cli_doctor(tmp_path: Path, capsys):
    parser = build_parser()
    args = parser.parse_args(["doctor", "-C", str(tmp_path)])
    code = handle_doctor(args)
    assert code == 0
    captured = capsys.readouterr()
    assert "VibeCI Doctor" in captured.out
