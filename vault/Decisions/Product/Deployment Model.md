---
title: Deployment Model
date: 2026-05-09
status: resolved
tags: [decision, product, deployment]
---

# Deployment Model

**Decision: Self-hosted, single-user**

Mind Lab is a personal developer tool. No multi-tenancy, no shared infra. The user runs their own instance.

**Why:** This is a tool for one developer. SaaS complexity (org isolation, billing, shared infra) is unnecessary overhead at this stage.

**Future consideration:** Architecture should not actively block collaboration additions later. Keep auth and data model extensible (e.g. a `user_id` on all records even if there's only one user, so team support can be layered on).

**Impact on stack:**
- Auth: lightweight (Auth.js or even API key / local session — no Clerk needed for Phase 1)
- No multi-tenant DB isolation needed
- Simpler infra: Docker Compose is sufficient, no Kubernetes until/unless scale demands it

---

*Resolved in [[Sessions/2026-05-09 — Session 01]]*
