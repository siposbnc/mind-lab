---
title: Model Support
date: 2026-05-09
status: resolved
tags: [decision, product, models]
---

# Model Support

**Decision: Claude Code first, other CLI tools by Phase 2**

Mind Lab manages OS processes running AI CLI tools — it does not wrap AI APIs. Claude Code is the first supported tool.

**Why:** Shipping fast matters. Claude Code is the primary tool in use. Other CLIs (Codex, Gemini CLI, Copilot) are added in Phase 2 via a pluggable `StatusParser` registry.

**Future consideration:** Each new CLI tool needs:
- A `StatusParser` for output-based status detection
- Registered tool ID and default args in the tool registry
- No AI SDK integration — the CLI handles its own API calls

**Impact on stack:**
- No Anthropic SDK or Vercel AI SDK in Mind Lab
- Tool support is a Phase 2 extension point, not a Phase 1 concern

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
