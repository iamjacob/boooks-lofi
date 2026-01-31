# AI SPEC – BOOOKS PLATFORM

This document defines the mental model, invariants, and constraints
for AI systems working on the Boooks codebase.

AI systems MUST respect this document.

---

## CORE PRINCIPLES

### 1. Domain Separation (CRITICAL)

- `Book` is **canonical and global**
  - NO user state
  - NO reading status
  - NO ownership
  - NO shelf placement

- `UserBook` is **personal**
  - readingStatus (unread | reading | finished)
  - ownership
  - placement (later)
  - tags / notes (later)

AI must NEVER mix these concerns.

---

### 2. Offline-First (MANDATORY)

- The app must work fully offline.
- IndexedDB is the primary persistence layer.
- Network APIs are enhancements, not requirements.

AI must never assume network availability.

---

### 3. UI Architecture

- `Shells` orchestrate state (e.g. LibraryShell)
- `Components` are dumb and reusable
- `Editors` use local draft state and commit explicitly
- NO implicit save on keypress

---

### 4. Images & Assets

- Images are handled via a Cache API with adapters.
- UI NEVER stores blobs directly.
- All images are referenced via URIs.
- LOD (xs / s / m / l) is optional and asynchronous.
- Original image must always exist.

AI must never bypass the cache layer.

---

### 5. Identifiers

- IDs are generated via `crypto.randomUUID()`
- No external ID libraries (nanoid, uuid, etc.)

---

### 6. Packages Policy

- Minimal dependencies.
- Allowed: React, Next.js, R3F, Zustand (later), platform APIs.
- Disallowed unless explicitly approved:
  - Redux
  - React Query
  - Nanoid
  - Heavy abstraction libraries

AI must prefer native APIs and plain TypeScript.

---

### 7. Future Systems (Awareness Only)

AI should be aware (but not implement prematurely):

- ShelfInstance (contextual placement of UserBook)
- 3D bookshelf rendering
- Scanner hardware input
- ML / CV pipelines
- Cloud sync (optional, user-controlled)

---

## AI BEHAVIOR RULES

- Prefer clarity over cleverness.
- Do not refactor core models without explicit request.
- Do not introduce new global state patterns unless requested.
- Always explain architectural consequences.

---

## Reading & Time Awareness

Boooks treats reading time as a sacred signal, not a productivity metric.

- Reading time must work fully offline
- Time tracking must never block reading
- Sessions are explicit (start/stop), not inferred
- No dark patterns or pressure mechanics


## SUMMARY

Boooks is:
- Offline-first
- Canonical-data-driven
- User-context-aware
- Asset-heavy
- Future-ML-integrated

AI systems must preserve these properties.
