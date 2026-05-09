---
title: Native Modules — node-pty Windows Build
date: 2026-05-09
status: open
tags: [question, tech, electron, pty, windows]
---

# Native Modules — node-pty Windows Build

> **?** How do we build or source `node-pty` for Electron 36 on Windows?

## Context

`node-pty` fails to compile on Windows because WinPTY's build script (`GetCommitHash.bat`) fails when run via node-gyp. `node-pty-prebuilt-multiarch` also fails — no prebuilt binaries exist for Node 24 on Windows.

`node-pty` is removed from `package.json` until this is resolved. `better-sqlite3` compiles fine on Electron 36.

## Options

1. **Find Electron 36 + Windows prebuilts** — check `node-pty` GitHub releases for Electron-specific `.node` binaries; configure `prebuild-install` to fetch them
2. **Use `windows-pty`** — ConPTY-based alternative (Windows 10+ only, no WinPTY dependency)
3. **Fix the WinPTY build** — ensure git and build tools are correctly wired so `GetCommitHash.bat` runs
4. **Use `@homebridge/node-pty-prebuilt-multiarch`** — more actively maintained fork with broader prebuilt coverage

## Must Decide Before

Building Phase 1 PTY session management.
