---
title: Status Detection
date: 2026-05-09
status: active
tags: [decision, architecture, pty, status]
---

# Status Detection

**Decision: Heuristic output parsing per tool.** More accurate than exit-code-only; does not require changes to the CLI tools themselves.

Status is derived by parsing the raw PTY output stream as it arrives. Each supported tool gets a parser that maps output patterns to session states.

---

## Session Status Values

| Status | Meaning |
|---|---|
| `active` | Process running, producing output |
| `idle` | Process running, no recent output, not at a prompt |
| `waiting_input` | Process is waiting for user input (prompt detected) |
| `error` | Process exited with non-zero code, or error pattern detected |
| `exited` | Process exited cleanly |

---

## Claude Code Patterns (Phase 2)

| Pattern | Detected state |
|---|---|
| Spinner characters (`⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`) in output | `active` (thinking/running) |
| `>` or `$` prompt at end of output + no spinner | `waiting_input` |
| Tool use output blocks | `active` |
| `ESC[?25h` (cursor show) + silence | `idle` |
| Process exit code 0 | `exited` |
| Process exit code ≠ 0 | `error` |

**Implementation:** A per-tool `StatusParser` class receives PTY output chunks and emits status change events. The main process updates `sessions.status` in SQLite and notifies the renderer via IPC.

---

## Other Tools (Phase 2+)

Each new tool (Codex, Gemini CLI, etc.) gets its own parser registered in a `StatusParserRegistry`. Pattern lists are defined per tool, not hardcoded globally.

---

## Fallback

If no pattern matches within a configurable timeout after last output, status falls back to `idle`.

---

## Limitations

Heuristic parsing can misfire on unusual output or terminal sequences. Accepted for Phase 2. If accuracy proves insufficient, revisit:
- Process stdin/stdout wrapping with structured signals
- Claude Code plugin/hook if Anthropic exposes one

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
