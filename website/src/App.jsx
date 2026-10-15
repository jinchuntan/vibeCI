import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, CheckCircle2, ChevronRight, Circle, Command, Copy, Github, LockKeyhole, Menu, Play, ShieldCheck, Terminal, X, Zap } from 'lucide-react';

const githubUrl = 'https://github.com/piyush588/vibeCI';

function Brand({ compact = false }) {
  return <a className="brand" href="#top" aria-label="VibeCI home"><span className="brand-mark"><span /><span /><span /></span><span>vibe<span className="brand-ci">ci</span></span>{!compact && <span className="brand-version">OPEN SOURCE</span>}</a>;
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
  const replay = () => { setPhase(0); setReplayKey(k => k + 1); };
  return <div className="terminal-shell" aria-label="Animated example of VibeCI checking code">
    <div className="terminal-topbar">
      <div className="window-dots"><i /><i /><i /></div>
      <div className="terminal-tab"><Terminal size={13} /> verify</div>
      <div className="terminal-live"><span className="live-dot" /> LOCAL RUN</div>
      <button className="icon-button replay" onClick={replay} aria-label="Replay terminal animation"><Play size={13} fill="currentColor" /></button>
    </div>
    <div className="terminal-body">
      <div className="terminal-path"><span>~/my-project</span><span className="path-branch"><GitBranchIcon /> main</span></div>
      <div className="terminal-line"><span className="prompt">$</span><span>vibeci verify</span><span className="cursor" /></div>
      <div className={`terminal-output ${phase >= 1 ? 'visible' : ''}`}><span className="out-icon violet"><Command size={13} /></span><span>Detecting project &amp; available checks</span><span className="out-state">found</span></div>
      <div className={`terminal-output ${phase >= 2 ? 'visible' : ''}`}><span className="out-icon violet"><ShieldCheck size={13} /></span><span>Scanning for exposed secrets</span><span className="out-state">passed</span></div>
      <div className={`terminal-output ${phase >= 3 ? 'visible' : ''}`}><span className="out-icon amber"><Circle size={12} /></span><span>Checking environment variables</span><span className="out-state warning">1 warning</span></div>
      <div className={`terminal-output ${phase >= 4 ? 'visible' : ''}`}><span className="out-icon green"><Check size={13} /></span><span>Running project tests</span><span className="out-state">passed</span></div>
      <div className={`terminal-result ${phase >= 5 ? 'visible' : ''}`}>
        <div className="result-heading"><CheckCircle2 size={16} /><span>Verification complete</span><span className="result-time">1.42s</span></div>
        <div className="result-stats"><span><b>3</b> passed</span><span><b className="amber-text">1</b> warning</span><span><b>0</b> failed</span></div>
        <div className="result-note"><span className="note-dot" /> Review 1 environment variable warning before pushing.</div>
      </div>
      <div className={`terminal-footer ${phase >= 5 ? 'visible' : ''}`}><span>vibeci</span><span>checks run locally <LockKeyhole size={11} /></span></div>
    </div>
  </div>;
}
function GitBranchIcon() { return <span className="branch-glyph">⑂</span>; }

function CopyInstall() {
  const [copied, setCopied] = useState(false);
  const command = 'uv tool install vibeci';
  const copy = async () => {
    try { await navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    catch { window.location.href = `mailto:?subject=Install%20VibeCI&body=${encodeURIComponent(command)}`; }
  };
  return <button className="install-command" onClick={copy} aria-label="Copy install command"><span className="command-dollar">$</span><code>{command}</code><span className="copy-label">{copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</span></button>;
}

const features = [
  { n: '01', icon: <ShieldCheck />, title: 'Catch the obvious stuff', text: 'Surface potential secret leaks, missing configuration, and common issues before they become someone else’s problem.' },
  { n: '02', icon: <Terminal />, title: 'Use the tools you already have', text: 'Work with your project’s existing tests, linters, type checks, and build commands instead of replacing your toolchain.' },
  { n: '03', icon: <Zap />, title: 'Feedback before the push', text: 'Run checks locally, get a readable report, and give your coding agent something concrete to fix.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app" id="top">
    <div className="ambient-grid" aria-hidden="true" />
    <header className="nav-wrap"><nav className="nav container"><Brand /><div className={`nav-links ${menuOpen ? 'open' : ''}`}><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#principles" onClick={() => setMenuOpen(false)}>Principles</a><a href="#quickstart" onClick={() => setMenuOpen(false)}>Quick start</a><a href={githubUrl} target="_blank" rel="noreferrer" className="mobile-github">GitHub <ArrowRight size={14}/></a></div><div className="nav-actions"><a className="nav-github" href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRightIcon /></a><button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></div></nav></header>

    <main>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-pulse" /> LOCAL-FIRST CODE VERIFICATION <span className="eyebrow-line" /></div>
          <h1>Your AI wrote it.<br /><span>VibeCI checks it.</span></h1>
          <p className="hero-sub">Catch problems in AI-written code before they reach CI or production. Get useful feedback while you’re still in the flow.</p>
          <div className="hero-cta"><a className="button button-primary" href="#quickstart">Get started <ArrowRight size={16}/></a><a className="button button-secondary" href={githubUrl} target="_blank" rel="noreferrer"><Github size={16}/> Explore the repo</a></div>
          <div className="hero-proof"><span><Check size={13}/> Open source</span><span><Check size={13}/> Runs locally</span><span><Check size={13}/> Agent-friendly</span></div>
        </div>
        <div className="hero-visual"><div className="visual-label"><span className="visual-label-mark" /> A SMALL LOOK INSIDE <span className="visual-label-rule" /></div><LivingTerminal /><div className="terminal-caption"><span className="caption-dot" /> An example verification run <span className="caption-sep">/</span> <span>Illustrative output</span></div></div>
        <div className="hero-index"><span>01</span><span className="index-line"/><span>VERIFY BEFORE YOU PUSH</span></div>
      </section>

      <section className="manifesto container" id="how-it-works"><div className="section-kicker"><span>THE IDEA</span><span className="kicker-line"/><span>001 — 003</span></div><div className="manifesto-grid"><h2>Less waiting.<br /><span>More knowing.</span></h2><div className="manifesto-copy"><p>AI makes it easier to write code. Finding out whether that code actually works can still mean a slow loop of fixes, tests, and reruns.</p><p>VibeCI is being built to make that feedback loop simpler: run relevant checks, understand what failed, and decide what to do next.</p><a className="text-link" href="#quickstart">See the quick start <ArrowDownRight size={16}/></a></div></div></section>

      <section className="features-section"><div className="container"><div className="section-kicker"><span>BUILT FOR THE LOOP</span><span className="kicker-line"/><span>WHAT IT DOES</span></div><div className="feature-grid">{features.map(f => <article className="feature-card" key={f.n}><div className="feature-card-top"><span className="feature-number">/{f.n}</span><span className="feature-icon">{f.icon}</span></div><h3>{f.title}</h3><p>{f.text}</p><div className="feature-card-bottom"><span>VIBECI / CORE</span><ChevronRight size={14}/></div></article>)}</div></div></section>

      <section className="principles container" id="principles"><div className="principles-left"><div className="section-kicker"><span>THE BOUNDARIES MATTER</span><span className="kicker-line"/></div><h2>Useful checks.<br /><span>Honest results.</span></h2><p>No tool can promise that arbitrary software is bug-free. VibeCI should tell you what passed, what failed, what raised a warning, and what it couldn't verify.</p></div><div className="principle-list"><div className="principle-row"><span className="principle-symbol">01</span><div><h3>Local by default</h3><p>Designed to run on your machine, using your project’s existing workflow.</p></div><LockKeyhole size={17}/></div><div className="principle-row"><span className="principle-symbol">02</span><div><h3>Clear over clever</h3><p>Reports should be readable by developers and actionable for coding agents.</p></div><Terminal size={17}/></div><div className="principle-row"><span className="principle-symbol">03</span><div><h3>No false certainty</h3><p>Checks are evidence, not a guarantee. Unverified areas should stay visible.</p></div><ShieldCheck size={17}/></div></div></section>

      <section className="showcase-section" id="showcase">
        <div className="container">
          <div className="section-kicker"><span>REAL-WORLD WORKFLOW</span><span className="kicker-line"/><span>001 — 002</span></div>
          <div className="showcase-heading">
            <h2>See VibeCI<br /><span>in action.</span></h2>
            <p>From initial installation to locking your AI assistant into an automated self-healing verification loop.</p>
          </div>

          <div className="showcase-grid">
            <article className="showcase-card">
              <div className="showcase-tag">WORKFLOW / 01</div>
              <h3>Quick Start &amp; Project Verification</h3>
              <p>Install via <code>uv</code> or <code>pip</code>, run <code>vibeci</code> to discover checks, and pass <code>--json</code> to feed exact file:line:col diagnostics to your agent.</p>
              <div className="showcase-img-wrap">
                <img src="/assets/quickstart-guide.png" alt="VibeCI Quick Start guide and verification steps" className="showcase-img" loading="lazy" />
              </div>
            </article>

            <article className="showcase-card">
              <div className="showcase-tag">WORKFLOW / 02</div>
              <h3>1-Command AI Assistant Rules</h3>
              <p>Run <code>vibeci rule</code> to instantly configure Cursor, Claude Code, GitHub Copilot, and Google Antigravity to verify code before every finish.</p>
              <div className="showcase-img-wrap">
                <img src="/assets/terminal-agent-rules.png" alt="vibeci rule configuring AI agent verification rules" className="showcase-img" loading="lazy" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="quickstart-section" id="quickstart"><div className="container quickstart"><div className="quickstart-copy"><div className="section-kicker"><span>GET YOUR HANDS ON IT</span><span className="kicker-line"/><span>START HERE</span></div><h2>Try it on<br /><span>your project.</span></h2><p>VibeCI is open source and available now on PyPI. Run it on your project and give your AI coding agent zero-defect verification loops.</p><div className="quickstart-actions"><a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub <ArrowRight size={16}/></a><a className="button button-secondary" href="https://pypi.org/project/vibeci/" target="_blank" rel="noreferrer">PyPI Package <ArrowUpRightIcon /></a></div></div><div className="quickstart-code"><div className="code-head"><span><Terminal size={14}/> TERMINAL</span><span>INSTALL / 001</span></div><div className="code-body"><p className="code-comment"># 1. Install globally with uv (recommended)</p><CopyInstall /><p className="code-comment code-comment-gap"># 2. Configure AI agent verification rules</p><div className="code-static"><span>$</span> vibeci rule</div><p className="code-comment code-comment-gap"># 3. Run sub-second verification on your git changes</p><div className="code-static"><span>$</span> vibeci verify --diff --json</div><div className="code-footnote"><Circle size={11}/> Published on PyPI as <b>vibeci</b> (v0.3.0). Free &amp; Open Source (MIT).</div></div></div></div></section>

      <section className="closing container"><div className="closing-mark"><span/><span/><span/></div><p>Build with AI. Ship with more confidence.</p><h2>Your AI wrote it.<br /><span>VibeCI checks it.</span></h2><a href={githubUrl} target="_blank" rel="noreferrer" className="closing-link">Explore VibeCI on GitHub <ArrowRight size={16}/></a></section>
    </main>
    <footer className="footer"><div className="container footer-inner"><Brand compact/><span>Open source, built for the next coding workflow.</span><div className="footer-links"><a href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRightIcon/></a><a href="#top">Back to top ↑</a></div><span className="footer-copy">© {new Date().getFullYear()} VibeCI</span></div></footer>
  </div>;
}
function ArrowUpRightIcon() { return <span className="arrow-up-right">↗</span>; }

export default App;
