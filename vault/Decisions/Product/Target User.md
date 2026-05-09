---
title: Target User
date: 2026-05-09
status: resolved
tags: [decision, product, users]
---

# Target User

**Decision: Solo developer, with team/collaboration planned for future**

Phase 1 is built for one person. No team management, shared workspaces, or roles.

**Why:** The immediate use case is a single developer using multiple AI coding agent CLIs simultaneously. Team features add UI and data model complexity that would slow Phase 1.

**Future consideration:** Design data models with a `user_id` / `owner_id` field from the start so sharing and collaboration can be layered on without schema migrations. Avoid assumptions like "there is only ever one workspace."

**Impact on scope:**
- No roles/permissions system in Phase 1
- No shared session or workspace features
- Auth can be minimal (single user session or skipped entirely for local desktop)

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
