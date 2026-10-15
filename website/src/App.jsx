import React, { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Command,
  Copy,
  FileText,
  Github,
  Layers,
  LockKeyhole,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sliders,
  Terminal,
  X,
  Zap,
} from 'lucide-react';

const githubUrl = 'https://github.com/piyush588/vibeCI';

function Brand({ compact = false }) {
  return (
    <a className="brand" href="#top" aria-label="VibeCI home">
      <img src="/assets/logo.png" alt="VibeCI Logo" className="brand-logo-img" />
      <span>
        vibe<span className="brand-ci">ci</span>
      </span>
      {!compact && <span className="brand-version">v0.3.0</span>}
    </a>
  );
}

function LivingTerminal() {
  const [phase, setPhase] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2750),
      setTimeout(() => setPhase(4), 3750),
      setTimeout(() => setPhase(5), 4750),
    ];
    return () => timers.forEach(clearTimeout);
  }, [replayKey]);
  const replay = () => {
    setPhase(0);
    setReplayKey((k) => k + 1);
  };
  return (
    <div className="terminal-shell" aria-label="Animated example of VibeCI checking code">
      <div className="terminal-topbar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="terminal-tab">
          <Terminal size={13} /> verify
        </div>
        <div className="terminal-live">
          <span className="live-dot" /> LOCAL RUN
        </div>
        <button className="icon-button replay" onClick={replay} aria-label="Replay terminal animation">
          <Play size={13} fill="currentColor" />
        </button>
      </div>
      <div className="terminal-body">
        <div className="terminal-path">
          <span>~/my-project</span>
          <span className="path-branch">
            <GitBranchIcon /> main
          </span>
        </div>
        <div className="terminal-line">
          <span className="prompt">$</span>
          <span>vibeci verify</span>
          <span className="cursor" />
        </div>
        <div className={`terminal-output ${phase >= 1 ? 'visible' : ''}`}>
          <span className="out-icon violet">
            <Command size={13} />
          </span>
          <span>Detecting project &amp; available checks</span>
          <span className="out-state">found</span>
        </div>
        <div className={`terminal-output ${phase >= 2 ? 'visible' : ''}`}>
          <span className="out-icon violet">
            <ShieldCheck size={13} />
          </span>
          <span>Scanning for exposed secrets</span>
          <span className="out-state">passed</span>
        </div>
        <div className={`terminal-output ${phase >= 3 ? 'visible' : ''}`}>
          <span className="out-icon amber">
            <Circle size={12} />
          </span>
          <span>Checking environment variables</span>
          <span className="out-state warning">1 warning</span>
        </div>
        <div className={`terminal-output ${phase >= 4 ? 'visible' : ''}`}>
          <span className="out-icon green">
            <Check size={13} />
          </span>
          <span>Running project tests</span>
          <span className="out-state">passed</span>
        </div>
        <div className={`terminal-result ${phase >= 5 ? 'visible' : ''}`}>
          <div className="result-heading">
            <CheckCircle2 size={16} />
            <span>Verification complete</span>
            <span className="result-time">1.42s</span>
          </div>
          <div className="result-stats">
            <span>
              <b>3</b> passed
            </span>
            <span>
              <b className="amber-text">1</b> warning
            </span>
            <span>
              <b>0</b> failed
            </span>
          </div>
          <div className="result-note">
            <span className="note-dot" /> Review 1 environment variable warning before pushing.
          </div>
        </div>
        <div className={`terminal-footer ${phase >= 5 ? 'visible' : ''}`}>
          <span>vibeci</span>
          <span>
            checks run locally <LockKeyhole size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}
function GitBranchIcon() {
  return <span className="branch-glyph">⑂</span>;
}

function QuickstartTerminal() {
  const [pkgManager, setPkgManager] = useState('pip'); // 'pip' | 'uv'
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedStep, setCopiedStep] = useState(null);

  const installCmd = pkgManager === 'pip' ? 'pip install vibeci' : 'uv tool install vibeci';
  const ruleCmd = 'vibeci rule';
  const verifyCmd = 'vibeci verify --diff --json';

  const copyText = async (text, stepKey) => {
    try {
      await navigator.clipboard.writeText(text);
      if (stepKey === 'all') {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 1800);
      } else {
        setCopiedStep(stepKey);
        setTimeout(() => setCopiedStep(null), 1800);
      }
    } catch {
      // fallback
    }
  };

  const allCommands = `${installCmd}\n${ruleCmd}\n${verifyCmd}`;

  return (
    <div className="quickstart-code">
      <div className="code-head">
        <div className="code-head-left">
          <span>
            <Terminal size={14} /> TERMINAL
          </span>
          <div className="pkg-toggle" role="tablist" aria-label="Package manager selection">
            <button
              className={`pkg-tab ${pkgManager === 'pip' ? 'active' : ''}`}
              onClick={() => setPkgManager('pip')}
              type="button"
            >
              pip
            </button>
            <button
              className={`pkg-tab ${pkgManager === 'uv' ? 'active' : ''}`}
              onClick={() => setPkgManager('uv')}
              type="button"
            >
              uv
            </button>
          </div>
        </div>
        <button
          className="copy-all-btn"
          onClick={() => copyText(allCommands, 'all')}
          title="Copy all commands in sequence"
          type="button"
        >
          {copiedAll ? (
            <>
              <Check size={13} /> All Copied!
            </>
          ) : (
            <>
              <Copy size={13} /> Copy All Commands
            </>
          )}
        </button>
      </div>

      <div className="code-body">
        {/* Step 1 */}
        <div className="code-step-label">
          <span># 1. Install via {pkgManager === 'pip' ? 'pip (standard)' : 'uv (recommended)'}</span>
        </div>
        <div
          className="command-row"
          onClick={() => copyText(installCmd, 'step1')}
          role="button"
          tabIndex={0}
          title="Click to copy install command"
        >
          <span className="command-dollar">$</span>
          <code>{installCmd}</code>
          <button
            className="row-copy-btn"
            onClick={(e) => {
              e.stopPropagation();
              copyText(installCmd, 'step1');
            }}
            type="button"
            aria-label="Copy install command"
          >
            {copiedStep === 'step1' ? (
              <>
                <Check size={13} /> Copied
              </>
            ) : (
              <>
                <Copy size={13} /> Copy
              </>
            )}
          </button>
        </div>

        {/* Step 2 */}
        <div className="code-step-label code-comment-gap">
          <span># 2. Configure AI agent verification rules (Cursor, Claude, Copilot, Antigravity)</span>
        </div>
        <div
          className="command-row"
          onClick={() => copyText(ruleCmd, 'step2')}
          role="button"
          tabIndex={0}
          title="Click to copy rule command"
        >
          <span className="command-dollar">$</span>
          <code>{ruleCmd}</code>
          <button
            className="row-copy-btn"
            onClick={(e) => {
              e.stopPropagation();
              copyText(ruleCmd, 'step2');
            }}
            type="button"
            aria-label="Copy rule command"
          >
            {copiedStep === 'step2' ? (
              <>
                <Check size={13} /> Copied
              </>
            ) : (
              <>
                <Copy size={13} /> Copy
              </>
            )}
          </button>
        </div>

        {/* Step 3 */}
        <div className="code-step-label code-comment-gap">
          <span># 3. Run sub-second verification on your git changes</span>
        </div>
        <div
          className="command-row"
          onClick={() => copyText(verifyCmd, 'step3')}
          role="button"
          tabIndex={0}
          title="Click to copy verify command"
        >
          <span className="command-dollar">$</span>
          <code>{verifyCmd}</code>
          <button
            className="row-copy-btn"
            onClick={(e) => {
              e.stopPropagation();
              copyText(verifyCmd, 'step3');
            }}
            type="button"
            aria-label="Copy verify command"
          >
            {copiedStep === 'step3' ? (
              <>
                <Check size={13} /> Copied
              </>
            ) : (
              <>
                <Copy size={13} /> Copy
              </>
            )}
          </button>
        </div>

        <div className="code-footnote">
          <Circle size={11} /> Published on PyPI as <b>vibeci</b> (v0.3.0). Free &amp; Open Source (MIT).
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    n: '01',
    icon: <ShieldCheck />,
    title: 'Catch the obvious stuff',
    text: 'Surface potential secret leaks, missing configuration, and common issues before they become someone else’s problem.',
  },
  {
    n: '02',
    icon: <Terminal />,
    title: 'Use the tools you already have',
    text: 'Work with your project’s existing tests, linters, type checks, and build commands instead of replacing your toolchain.',
  },
  {
    n: '03',
    icon: <Zap />,
    title: 'Feedback before the push',
    text: 'Run checks locally, get a readable report, and give your coding agent something concrete to fix.',
  },
];

/* ==================== DOCUMENTATION DATA ==================== */
const docCommands = [
  {
    cmd: 'vibeci verify',
    desc: 'Run full project verification across static health, secrets, builds, tests, and optional smoke testing.',
    flags: [
      { flag: '--diff / --changed-only', desc: 'Sub-second verification: verify only files touched in Git diff / working tree.' },
      { flag: '--since <ref>', desc: 'Compare changes against a Git reference (e.g. main, HEAD~1).' },
      { flag: '--json', desc: 'Output structured JSON with file:line:col coordinates for AI coding agents.' },
      { flag: '--smoke', desc: 'Exercise application boot in an isolated process group and probe HTTP endpoints.' },
      { flag: '--fail-fast', desc: 'Stop execution immediately upon the first failed check.' },
      { flag: '--build-only', desc: 'Run only production build verification (skipping tests & runtime smoke).' },
      { flag: '--no-preflight', desc: 'Skip static health and environment variable preflight checks.' },
      { flag: '--timeout <sec>', desc: 'Maximum execution duration in seconds for each check.' },
      { flag: '-C, --project-dir <dir>', desc: 'Target project directory (default: current directory).' },
    ],
    example: 'vibeci verify --diff --json',
  },
  {
    cmd: 'vibeci check',
    desc: 'Execute discovered project test, lint, and type-check commands with granular filtering.',
    flags: [
      { flag: '--only <checks...>', desc: 'Run only specified checks (e.g. vibeci check --only pytest ruff).' },
      { flag: '--failed-only', desc: 'Rerun only checks that failed in the previous run.' },
      { flag: '--list', desc: 'List all discovered checks and commands without executing them.' },
      { flag: '--json', desc: 'Output structured machine-readable JSON result report.' },
      { flag: '--fail-fast', desc: 'Halt immediately when any test fails.' },
      { flag: '--timeout <sec>', desc: 'Execution timeout per check (default: 60s).' },
    ],
    example: 'vibeci check --only pytest',
  },
  {
    cmd: 'vibeci rule',
    desc: 'Configure AI assistants (Cursor, Claude Code, GitHub Copilot, Google Antigravity) with 1 command.',
    flags: [
      { flag: 'install (default)', desc: 'Automatically writes verification rules to your assistant configs.' },
      { flag: 'status', desc: 'Inspect configured AI assistant rule files across your project.' },
      { flag: 'print', desc: 'Display generated AI verification instructions without writing to files.' },
      { flag: '--agent <target>', desc: 'Target assistant: all (default), cursor, claude, copilot, antigravity, universal.' },
    ],
    example: 'vibeci rule --agent all',
  },
  {
    cmd: 'vibeci doctor',
    desc: 'Inspect project environment, detected toolchains, runtimes (Node, Python, Bun), and configuration health.',
    flags: [{ flag: '-C <dir>', desc: 'Target directory to inspect.' }],
    example: 'vibeci doctor',
  },
  {
    cmd: 'vibeci hook',
    desc: 'Manage automated Git pre-push hook to guarantee unverified code can never be pushed to remotes.',
    flags: [
      { flag: 'install', desc: 'Install .git/hooks/pre-push with automated VibeCI verification.' },
      { flag: 'status', desc: 'Check whether the pre-push hook is active and properly linked.' },
      { flag: 'remove', desc: 'Safely uninstall and remove the pre-push hook.' },
    ],
    example: 'vibeci hook install',
  },
  {
    cmd: 'vibeci upgrade',
    desc: 'Upgrade VibeCI to the latest release published on PyPI (alias: vibeci update).',
    flags: [
      { flag: '--check', desc: 'Check if a newer version is available without installing.' },
      { flag: '--dry-run', desc: 'Show the upgrade command that would be executed.' },
    ],
    example: 'vibeci upgrade',
  },
  {
    cmd: 'vibeci init',
    desc: 'Generate a starter .vibeci.toml configuration file tailored for your repository.',
    flags: [{ flag: '-C <dir>', desc: 'Target directory where .vibeci.toml should be written.' }],
    example: 'vibeci init',
  },
  {
    cmd: 'vibeci help',
    desc: 'Display detailed help and argument documentation for VibeCI or any specific subcommand.',
    flags: [{ flag: '[subcommand]', desc: 'Command name (verify, check, rule, doctor, hook, upgrade).' }],
    example: 'vibeci help verify',
  },
];

const docLayers = [
  {
    title: 'Secret Leak Scanner',
    tag: 'LAYER / 01',
    desc: 'High-entropy credential detection that catches exposed AWS access keys (AKIA...), GitHub tokens (ghp_...), private RSA/EC keys, database connection strings, and Bearer tokens before commit.',
    points: [
      'Scans git changes in sub-second diff mode',
      'Flags exact file and line coordinates',
      'Excludes harmless test fixtures and mock variables',
    ],
  },
  {
    title: 'Environment Variable Preflight',
    tag: 'LAYER / 02',
    desc: 'Audits AST and code references for environment variables (process.env.* in JS/TS and os.environ / os.getenv in Python) against .env.example documentation.',
    points: [
      'Prevents silent runtime crashes caused by forgotten environment variables',
      'Reports undeclared variables as actionable warnings',
      'Works with standard .env.example, .env.sample, and .env.template files',
    ],
  },
  {
    title: 'Production Build Verification',
    tag: 'LAYER / 03',
    desc: 'Validates that your code compiles and packages successfully using the actual production build pipeline (vite build, turbo build, npm run build, uv build).',
    points: [
      'Catches bundler and asset errors that pure type-checkers miss',
      'Differentiates compile errors from benign build warnings',
      'Supports npm, pnpm, yarn, bun, and uv',
    ],
  },
  {
    title: 'Runtime Smoke Testing (--smoke)',
    tag: 'LAYER / 04',
    desc: 'Exercises the application in an isolated process group. Detects socket listener readiness and probes health endpoints to confirm the service boots properly.',
    points: [
      'Probes / and /api/health with automatic timeout guards',
      'Guarantees clean process tree termination with no orphaned ports',
      'Flags HTTP 5xx responses as verification failures',
    ],
  },
  {
    title: 'Native Test Suites',
    tag: 'LAYER / 05',
    desc: 'Discovers and executes configured project test runners (pytest, vitest, jest) with non-interactive flags so processes never hang in watch mode.',
    points: [
      'Zero proprietary runners — uses your existing pytest or vitest setup',
      'Change-aware filtering to run only affected test files',
      'Parses failure output into clean line numbers for AI self-healing',
    ],
  },
  {
    title: 'Honest Verification Boundaries',
    tag: 'LAYER / 06',
    desc: 'Unlike tools that claim 100% false certainty, VibeCI explicitly reports what could not be verified (e.g. unconfigured database, live third-party payment APIs, untested routes).',
    points: [
      'Separates verified evidence from unexercised capabilities',
      'Prevents AI agents from hallucinating false security',
      'Clearly states verification limits in JSON output',
    ],
  },
];

function DocumentationSection() {
  const [activeTab, setActiveTab] = useState('commands'); // 'commands' | 'layers' | 'agents' | 'config'
  const [search, setSearch] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 1800);
    } catch {
      // fallback
    }
  };

  const filteredCommands = docCommands.filter(
    (c) =>
      c.cmd.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase()) ||
      c.flags.some((f) => f.flag.toLowerCase().includes(search.toLowerCase()) || f.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredLayers = docLayers.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.desc.toLowerCase().includes(search.toLowerCase()) ||
      l.points.some((p) => p.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="docs-section" id="docs">
      <div className="container">
        <div className="section-kicker">
          <span>REFERENCE &amp; CAPABILITIES</span>
          <span className="kicker-line" />
          <span>DOCUMENTATION</span>
        </div>

        <div className="docs-header">
          <div>
            <h2>
              Complete documentation<br />
              <span>&amp; CLI reference.</span>
            </h2>
            <p>Explore all commands, verification gates, AI assistant protocols, and configuration schemas.</p>
          </div>

          <div className="docs-search-wrap">
            <Search size={16} className="docs-search-icon" />
            <input
              type="text"
              placeholder="Search commands, flags, or features..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="docs-search-input"
              aria-label="Search documentation"
            />
            {search && (
              <button className="docs-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Documentation Navigation Tabs */}
        <div className="docs-tabs" role="tablist">
          <button
            className={`doc-tab-btn ${activeTab === 'commands' ? 'active' : ''}`}
            onClick={() => setActiveTab('commands')}
            role="tab"
            aria-selected={activeTab === 'commands'}
          >
            <Terminal size={15} /> CLI Commands
          </button>
          <button
            className={`doc-tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
            onClick={() => setActiveTab('layers')}
            role="tab"
            aria-selected={activeTab === 'layers'}
          >
            <Layers size={15} /> Verification Layers
          </button>
          <button
            className={`doc-tab-btn ${activeTab === 'agents' ? 'active' : ''}`}
            onClick={() => setActiveTab('agents')}
            role="tab"
            aria-selected={activeTab === 'agents'}
          >
            <Code2 size={15} /> AI Agent Rules
          </button>
          <button
            className={`doc-tab-btn ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
            role="tab"
            aria-selected={activeTab === 'config'}
          >
            <FileText size={15} /> Configuration (.vibeci.toml)
          </button>
        </div>

        {/* TAB 1: CLI COMMANDS */}
        {activeTab === 'commands' && (
          <div className="doc-content-grid">
            {filteredCommands.map((item, idx) => (
              <article className="doc-card" key={idx}>
                <div className="doc-card-head">
                  <div className="doc-cmd-box">
                    <span className="doc-prompt">$</span>
                    <code>{item.cmd}</code>
                  </div>
                  <button
                    className="doc-copy-btn"
                    onClick={() => copyCode(item.example || item.cmd, `cmd-${idx}`)}
                    title="Copy command"
                    type="button"
                  >
                    {copiedCmd === `cmd-${idx}` ? (
                      <>
                        <Check size={13} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy
                      </>
                    )}
                  </button>
                </div>

                <p className="doc-card-desc">{item.desc}</p>

                <div className="doc-flags-section">
                  <div className="doc-sublabel">OPTIONS &amp; FLAGS</div>
                  <div className="doc-flags-list">
                    {item.flags.map((f, fIdx) => (
                      <div className="doc-flag-row" key={fIdx}>
                        <span className="doc-flag-name">{f.flag}</span>
                        <span className="doc-flag-desc">{f.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {item.example && (
                  <div className="doc-example-wrap">
                    <span className="doc-sublabel">EXAMPLE USAGE</span>
                    <div className="doc-example-code" onClick={() => copyCode(item.example, `cmd-${idx}`)} title="Click to copy">
                      <span>$</span> {item.example}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* TAB 2: VERIFICATION LAYERS */}
        {activeTab === 'layers' && (
          <div className="doc-layers-grid">
            {filteredLayers.map((layer, idx) => (
              <article className="doc-layer-card" key={idx}>
                <div className="doc-layer-tag">{layer.tag}</div>
                <h3>{layer.title}</h3>
                <p>{layer.desc}</p>
                <ul className="doc-layer-points">
                  {layer.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <Check size={14} className="point-check" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        {/* TAB 3: AI AGENT RULES */}
        {activeTab === 'agents' && (
          <div className="doc-agent-guide">
            <div className="doc-card full-width">
              <div className="doc-card-head">
                <h3>Autonomous AI Verification Loop</h3>
                <span className="doc-badge">Cursor · Claude Code · Copilot · Antigravity</span>
              </div>
              <p className="doc-card-desc">
                When you run <code>vibeci rule</code>, VibeCI creates or updates agent instruction files (
                <code>.cursorrules</code>, <code>CLAUDE.md</code>, <code>.github/copilot-instructions.md</code>,{' '}
                <code>AGENTS.md</code>). The instructions establish a strict protocol:
              </p>

              <div className="protocol-steps">
                <div className="protocol-step">
                  <div className="protocol-num">1</div>
                  <div>
                    <h4>Execute Verification</h4>
                    <p>Agent runs <code>vibeci verify --diff --json</code> immediately after modifying any code files.</p>
                  </div>
                </div>
                <div className="protocol-step">
                  <div className="protocol-num">2</div>
                  <div>
                    <h4>Inspect Diagnostic Coordinates</h4>
                    <p>
                      Agent checks <code>status</code>. If <code>failed</code> or <code>warnings</code>, it reads{' '}
                      <code>file_locations</code> (exact file, line, column coordinates) and <code>failure_details</code>.
                    </p>
                  </div>
                </div>
                <div className="protocol-step">
                  <div className="protocol-num">3</div>
                  <div>
                    <h4>Self-Healing Loop</h4>
                    <p>Agent fixes the issues at the exact coordinates and re-verifies until <code>status: passed</code>.</p>
                  </div>
                </div>
              </div>

              <div className="doc-sublabel" style={{ marginTop: '24px' }}>
                AI REPORT JSON STRUCTURE
              </div>
              <div className="json-schema-box">
                <pre>{`{
  "vibeci_version": "0.3.0",
  "status": "passed",
  "checks": [
    {
      "name": "security:secrets",
      "status": "passed",
      "file_locations": []
    },
    {
      "name": "env:preflight",
      "status": "passed",
      "summary": "All referenced env vars documented in .env.example"
    }
  ]
}`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONFIGURATION */}
        {activeTab === 'config' && (
          <div className="doc-config-guide">
            <div className="doc-card full-width">
              <div className="doc-card-head">
                <div>
                  <h3>.vibeci.toml Configuration File</h3>
                  <p className="doc-card-desc">
                    VibeCI works automatically with zero configuration. You can optionally create <code>.vibeci.toml</code> via{' '}
                    <code>vibeci init</code> to customize rules, timeouts, and smoke test endpoints.
                  </p>
                </div>
                <button
                  className="doc-copy-btn"
                  onClick={() =>
                    copyCode(
                      `[project]
name = "my-application"
type = "auto" # or "javascript", "python"

[verification]
fail_fast = false
timeout = 60 # seconds
skip_preflight = false

[smoke]
enabled = false
command = "npm start"
ready_timeout = 15 # seconds
endpoints = ["/", "/api/health"]
expected_status = 200

[rules]
auto_heal = true
require_secret_scan = true`,
                      'config-code'
                    )
                  }
                  title="Copy configuration template"
                  type="button"
                >
                  {copiedCmd === 'config-code' ? (
                    <>
                      <Check size={13} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy TOML
                    </>
                  )}
                </button>
              </div>

              <div className="config-code-block">
                <pre>{`[project]
name = "my-application"
type = "auto" # "auto", "javascript", or "python"

[verification]
fail_fast = false
timeout = 60 # seconds
skip_preflight = false

[smoke]
enabled = false
command = "npm start"
ready_timeout = 15 # seconds
endpoints = ["/", "/api/health"]
expected_status = 200

[rules]
auto_heal = true
require_secret_scan = true`}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDiagram, setActiveDiagram] = useState('both');
  return (
    <div className="app" id="top">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="nav-wrap">
        <nav className="nav container">
          <Brand />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#quickstart" onClick={() => setMenuOpen(false)}>
              Quick start
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#architecture" onClick={() => setMenuOpen(false)}>
              Architecture
            </a>
            <a href="#docs" onClick={() => setMenuOpen(false)}>
              Documentation
            </a>
            <a href="#principles" onClick={() => setMenuOpen(false)}>
              Principles
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="mobile-github">
              GitHub <ArrowRight size={14} />
            </a>
          </div>
          <div className="nav-actions">
            <a className="nav-github" href={githubUrl} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub <ArrowUpRightIcon />
            </a>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-pulse" /> LOCAL-FIRST CODE VERIFICATION <span className="eyebrow-line" />
            </div>
            <h1>
              Your AI wrote it.<br />
              <span>VibeCI checks it.</span>
            </h1>
            <p className="hero-sub">
              Catch problems in AI-written code before they reach CI or production. Get useful feedback while you’re
              still in the flow.
            </p>
            <div className="hero-cta">
              <a className="button button-primary" href="#quickstart">
                Get started <ArrowRight size={16} />
              </a>
              <a className="button button-secondary" href={githubUrl} target="_blank" rel="noreferrer">
                <Github size={16} /> Explore the repo
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <Check size={13} /> Open source
              </span>
              <span>
                <Check size={13} /> Runs locally
              </span>
              <span>
                <Check size={13} /> Agent-friendly
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-label">
              <span className="visual-label-mark" /> A SMALL LOOK INSIDE <span className="visual-label-rule" />
            </div>
            <LivingTerminal />
            <div className="terminal-caption">
              <span className="caption-dot" /> An example verification run <span className="caption-sep">/</span>{' '}
              <span>Illustrative output</span>
            </div>
          </div>
          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>VERIFY BEFORE YOU PUSH</span>
          </div>
        </section>

        {/* ==================== QUICKSTART SECTION (ON TOP) ==================== */}
        <section className="quickstart-section" id="quickstart">
          <div className="container quickstart">
            <div className="quickstart-copy">
              <div className="section-kicker">
                <span>GET YOUR HANDS ON IT</span>
                <span className="kicker-line" />
                <span>START HERE</span>
              </div>
              <h2>
                Try it on<br />
                <span>your project.</span>
              </h2>
              <p>
                VibeCI is open source and available now on PyPI. Run it on your project and give your AI coding agent
                zero-defect verification loops.
              </p>
              <div className="quickstart-actions">
                <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">
                  View on GitHub <ArrowRight size={16} />
                </a>
                <a
                  className="button button-secondary"
                  href="https://pypi.org/project/vibeci/"
                  target="_blank"
                  rel="noreferrer"
                >
                  PyPI Package <ArrowUpRightIcon />
                </a>
              </div>
            </div>

            <QuickstartTerminal />
          </div>
        </section>

        <section className="manifesto container" id="how-it-works">
          <div className="section-kicker">
            <span>THE IDEA</span>
            <span className="kicker-line" />
            <span>001 — 003</span>
          </div>
          <div className="manifesto-grid">
            <h2>
              Less waiting.<br />
              <span>More knowing.</span>
            </h2>
            <div className="manifesto-copy">
              <p>
                AI makes it easier to write code. Finding out whether that code actually works can still mean a slow loop
                of fixes, tests, and reruns.
              </p>
              <p>
                VibeCI is being built to make that feedback loop simpler: run relevant checks, understand what failed, and
                decide what to do next.
              </p>
              <a className="text-link" href="#quickstart">
                See the quick start <ArrowDownRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="section-kicker">
              <span>BUILT FOR THE LOOP</span>
              <span className="kicker-line" />
              <span>WHAT IT DOES</span>
            </div>
            <div className="feature-grid">
              {features.map((f) => (
                <article className="feature-card" key={f.n}>
                  <div className="feature-card-top">
                    <span className="feature-number">/{f.n}</span>
                    <span className="feature-icon">{f.icon}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <div className="feature-card-bottom">
                    <span>VIBECI / CORE</span>
                    <ChevronRight size={14} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="principles container" id="principles">
          <div className="principles-left">
            <div className="section-kicker">
              <span>THE BOUNDARIES MATTER</span>
              <span className="kicker-line" />
            </div>
            <h2>
              Useful checks.<br />
              <span>Honest results.</span>
            </h2>
            <p>
              No tool can promise that arbitrary software is bug-free. VibeCI should tell you what passed, what failed,
              what raised a warning, and what it couldn't verify.
            </p>
          </div>
          <div className="principle-list">
            <div className="principle-row">
              <span className="principle-symbol">01</span>
              <div>
                <h3>Local by default</h3>
                <p>Designed to run on your machine, using your project’s existing workflow.</p>
              </div>
              <LockKeyhole size={17} />
            </div>
            <div className="principle-row">
              <span className="principle-symbol">02</span>
              <div>
                <h3>Clear over clever</h3>
                <p>Reports should be readable by developers and actionable for coding agents.</p>
              </div>
              <Terminal size={17} />
            </div>
            <div className="principle-row">
              <span className="principle-symbol">03</span>
              <div>
                <h3>No false certainty</h3>
                <p>Checks are evidence, not a guarantee. Unverified areas should stay visible.</p>
              </div>
              <ShieldCheck size={17} />
            </div>
          </div>
        </section>

        <section className="architecture-section" id="architecture">
          <div className="container">
            <div className="section-kicker">
              <span>SYSTEM ARCHITECTURE</span>
              <span className="kicker-line" />
              <span>001 — 002</span>
            </div>
            <div className="architecture-header">
              <div>
                <h2>
                  How VibeCI<br />
                  <span>verifies code.</span>
                </h2>
                <p>From an autonomous AI coding agent loop to the modular local execution engine and normalized verification reports.</p>
              </div>
              <div className="architecture-tabs" role="tablist" aria-label="Diagram display options">
                <button
                  className={`arch-tab-btn ${activeDiagram === 'both' ? 'active' : ''}`}
                  onClick={() => setActiveDiagram('both')}
                  role="tab"
                  aria-selected={activeDiagram === 'both'}
                >
                  Both Diagrams
                </button>
                <button
                  className={`arch-tab-btn ${activeDiagram === 'workflow' ? 'active' : ''}`}
                  onClick={() => setActiveDiagram('workflow')}
                  role="tab"
                  aria-selected={activeDiagram === 'workflow'}
                >
                  AI Agent Loop
                </button>
                <button
                  className={`arch-tab-btn ${activeDiagram === 'architecture' ? 'active' : ''}`}
                  onClick={() => setActiveDiagram('architecture')}
                  role="tab"
                  aria-selected={activeDiagram === 'architecture'}
                >
                  System Pipeline
                </button>
              </div>
            </div>

            <div className={`diagram-grid ${activeDiagram !== 'both' ? 'single-view' : ''}`}>
              {(activeDiagram === 'both' || activeDiagram === 'workflow') && (
                <article className="diagram-card">
                  <div className="diagram-tag">WORKFLOW / 01</div>
                  <h3>AI Coding Agent Verification Loop</h3>
                  <p>When an AI agent modifies code, VibeCI executes static analysis, production builds, behavioral suites, and runtime health checks before generating a single actionable report.</p>
                  <div className="diagram-img-wrap">
                    <img
                      src="/assets/workflow.svg"
                      alt="AI coding agent verification workflow with VibeCI Verification Engine and four check categories"
                      className="diagram-img"
                      loading="lazy"
                    />
                  </div>
                </article>
              )}

              {(activeDiagram === 'both' || activeDiagram === 'architecture') && (
                <article className="diagram-card">
                  <div className="diagram-tag">SYSTEM / 02</div>
                  <h3>Detection &amp; Execution Pipeline</h3>
                  <p>CLI and agent interface triggers project detection and execution planning, runs modular checks with zero configuration, and normalizes findings through the result engine.</p>
                  <div className="diagram-img-wrap">
                    <img
                      src="/assets/architecture.svg"
                      alt="VibeCI system architecture showing CLI interface, project detector, check runners, and result engine"
                      className="diagram-img"
                      loading="lazy"
                    />
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* ==================== DOCUMENTATION SECTION ==================== */}
        <DocumentationSection />

        <section className="closing container">
          <img src="/assets/logo.png" alt="VibeCI Logo" className="closing-logo-img" />
          <p>Build with AI. Ship with more confidence.</p>
          <h2>
            Your AI wrote it.<br />
            <span>VibeCI checks it.</span>
          </h2>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="closing-link">
            Explore VibeCI on GitHub <ArrowRight size={16} />
          </a>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <Brand compact />
          <span>Open source, built for the next coding workflow.</span>
          <div className="footer-links">
            <a href="#docs">Docs</a>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRightIcon />
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
          <span className="footer-copy">© {new Date().getFullYear()} VibeCI</span>
        </div>
      </footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <span className="arrow-up-right">↗</span>;
}

export default App;
