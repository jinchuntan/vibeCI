// Interactive Terminal Content and Copy Handlers

const TERMINAL_OUTPUTS = {
  verify: `<div class="term-line"><span class="prompt-symbol">$</span> <span class="term-cmd">vibeci verify --diff</span></div>
<div class="term-line term-dim">⚡ VibeCI • Local Verification for AI-Written Code (Diff Mode)</div>
<div class="term-line term-dim">──────────────────────────────────────────────────────────</div>
<div class="term-line"><span class="term-pass">✔ PASSED</span>  env:preflight      env          0.01s  All referenced env vars documented</div>
<div class="term-line"><span class="term-pass">✔ PASSED</span>  security:secrets   security     0.02s  No exposed API keys detected</div>
<div class="term-line"><span class="term-pass">✔ PASSED</span>  uv:build           build        0.08s  Successfully compiled wheel & sdist</div>
<div class="term-line"><span class="term-pass">✔ PASSED</span>  pytest             test         0.18s  18 passed in 0.18s (selective suite)</div>
<div class="term-line term-dim">──────────────────────────────────────────────────────────</div>
<div class="term-line"><span class="term-pass">✔ VERDICT: PASSED</span> — 4 checks completed with zero defects found. Ready to push.</div>`,

  rule: `<div class="term-line"><span class="prompt-symbol">$</span> <span class="term-cmd">vibeci rule</span></div>
<div class="term-line"><span class="term-pass">✔ Successfully configured VibeCI AI verification rules:</span></div>
<div class="term-line">  • <span class="term-cyan">.cursorrules</span></div>
<div class="term-line">  • <span class="term-cyan">.cursor/rules/vibeci.mdc</span></div>
<div class="term-line">  • <span class="term-cyan">CLAUDE.md</span></div>
<div class="term-line">  • <span class="term-cyan">.github/copilot-instructions.md</span></div>
<div class="term-line">  • <span class="term-cyan">AGENTS.md</span> (Antigravity & Universal)</div>
<div class="term-line term-dim">──────────────────────────────────────────────────────────</div>
<div class="term-line">🤖 Your AI coding assistant will now automatically:</div>
<div class="term-line">  1. Run <span class="term-cyan">vibeci verify --diff --json</span> after creating or editing code.</div>
<div class="term-line">  2. Inspect the JSON report for exact error coordinates and secrets.</div>
<div class="term-line">  3. Self-heal and rerun verification before finishing.</div>`,

  json: `<div class="term-line"><span class="prompt-symbol">$</span> <span class="term-cmd">vibeci verify --diff --json</span></div>
<div class="term-line">{</div>
<div class="term-line">  <span class="term-cyan">"vibeci_version"</span>: <span class="term-pass">"0.3.0"</span>,</div>
<div class="term-line">  <span class="term-cyan">"status"</span>: <span class="term-pass">"passed"</span>,</div>
<div class="term-line">  <span class="term-cyan">"total_duration_ms"</span>: 284,</div>
<div class="term-line">  <span class="term-cyan">"summary"</span>: { <span class="term-cyan">"total"</span>: 4, <span class="term-cyan">"passed"</span>: 4, <span class="term-cyan">"failed"</span>: 0 },</div>
<div class="term-line">  <span class="term-cyan">"checks"</span>: [</div>
<div class="term-line">    { <span class="term-cyan">"name"</span>: <span class="term-pass">"security:secrets"</span>, <span class="term-cyan">"status"</span>: <span class="term-pass">"passed"</span>, <span class="term-cyan">"file_locations"</span>: [] },</div>
<div class="term-line">    { <span class="term-cyan">"name"</span>: <span class="term-pass">"pytest"</span>, <span class="term-cyan">"status"</span>: <span class="term-pass">"passed"</span>, <span class="term-cyan">"exit_code"</span>: 0 }</div>
<div class="term-line">  ],</div>
<div class="term-line">  <span class="term-cyan">"unverified_capabilities"</span>: []</div>
<div class="term-line">}</div>`
};

document.addEventListener("DOMContentLoaded", () => {
  const terminalBody = document.getElementById("terminalBody");
  const terminalTabs = document.querySelectorAll(".terminal-tab");
  const installBar = document.getElementById("installBar");
  const heroCopyBtn = document.getElementById("heroCopyBtn");

  // Render initial terminal state
  if (terminalBody) {
    terminalBody.innerHTML = TERMINAL_OUTPUTS.verify;
  }

  // Terminal tab switching
  terminalTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      terminalTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const tabKey = tab.getAttribute("data-tab");
      if (TERMINAL_OUTPUTS[tabKey] && terminalBody) {
        terminalBody.innerHTML = TERMINAL_OUTPUTS[tabKey];
      }
    });
  });

  // Generic copy helper
  function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btnElement.innerText;
      btnElement.innerText = "Copied!";
      btnElement.classList.add("copied");
      setTimeout(() => {
        btnElement.innerText = originalText;
        btnElement.classList.remove("copied");
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  }

  // Install bar copy
  if (installBar && heroCopyBtn) {
    installBar.addEventListener("click", () => {
      copyToClipboard("uv tool install vibeci", heroCopyBtn);
    });
  }

  // Snippet copy buttons
  document.querySelectorAll(".snippet-copy").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const code = btn.getAttribute("data-copy");
      if (code) {
        copyToClipboard(code, btn);
      }
    });
  });
});
