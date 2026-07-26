# Intern Guide

## Start and read

Install Node 20+, run `npm install`, configure `.env`, and use `npm run dev`. Read documents in the README order before changing code.

## Required workflow

**Need → Requirement → Design → Task → Code → Test → Traceability.** Select one acceptance criterion, cite its `FR-*`/`NFR-*` ID in the branch, commit, and PR; review the matching SDD section and ADR; make a small change; add evidence; then update the matrix status. Example commit: `FR-007 fit diary marker bounds`.

## MVC boundaries

Routes only wire URLs/middleware/controllers. Middleware handles cross-cutting request concerns. Controllers coordinate validated input, model operations, and rendering. Models own persistence validation/indexes. Services isolate external storage/API details. Pug presents already prepared data.

Authentication proves who the user is; authorization decides whether that authenticated identity owns a resource. Never accept owner identity from the browser and never replace an ownership-filtered query with an ID-only lookup.

## Definition of Done

Acceptance criteria pass; ownership and negative cases are tested; lint/format/tests pass; safe errors and accessibility are reviewed; SRS/SDD and traceability remain accurate; no credentials or uploaded data enter Git; peer review is complete.

## Prohibited shortcuts

No database logic in routes/views, GET logout, client-only validation, client-provided owner IDs, ID-only diary lookup, binary/Base64 in MongoDB, permissive upload types, disabled Helmet/CSRF, swallowed errors, real OAuth in automated tests, unrelated frameworks, or vague TODOs.

## Recommended first task

Complete FR-011 mutation/list/map authorization coverage (TC-SEC-001/002) before UI polish. This reinforces the project's highest-risk rule using the existing safe query examples.
