# Software Design Description

## 1. Introduction

This IEEE 1016-inspired SDD maps the SRS to concrete modules.

## 2. Architectural overview

Browser → Express route → middleware → controller → optional external service → Mongoose → Atlas → Pug. `app.js` composes; `server.js` owns process lifecycle.

## 3. Architectural constraints

CommonJS JavaScript, server-rendered Pug, one MVC monolith, no frontend framework or alternate ORM.

## 4. MVC layer responsibilities

`routes/` wires paths only; middleware authenticates, validates, uploads, handles CSRF/errors; controllers coordinate; models enforce persistence rules; Pug presents escaped values.

## 5. System decomposition

Home, authentication, and diary route/controller pairs share configuration and cross-cutting middleware. `image.service.js` is the external-storage seam.

## 6. Authentication module design

`passport.js` upserts by unique Google ID and serializes only Mongo user ID. `auth.routes.js` runs OAuth and POST logout. `session.js` uses `connect-mongo` with HttpOnly, SameSite=Lax, production Secure cookies (FR-001/002/012).

## 7. Diary module design

REST-like routes call small controller actions. Every collection query filters `user: req.user._id`; item reads/updates/deletes use combined `_id` and owner filters, returning one identical 404. Client user IDs are ignored (FR-003/006/008–011).

## 8. Map module design

Pug exposes only public token and `{id,title,diaryDate,coordinates}`. Browser modules select/restore a marker and render owned markers. Server validation enforces longitude/latitude ranges (FR-004/007).

## 9. Image-upload module design

`upload.js` provides generated filenames, MIME allowlist, and configured byte limit. `image.service.js` converts Multer output to metadata and is replaceable by object storage. Local bytes are development-only (FR-005).

## 10. Data design

`User` has unique indexed `googleId`. `Diary.user` references User; point is GeoJSON `[longitude, latitude]`; photo is metadata. Indexes are `{location:'2dsphere'}` and `{user:1,diaryDate:-1}`.

## 11. Interface and route design

`GET /`, `/health`; OAuth GET start/callback and POST logout; protected `GET /diaries`, `/map`, `/new`, `/:id`, `/:id/edit`; POST collection; PATCH/DELETE member via method override. Views mirror these pages.

## 12. Security design

Helmet retains CSP with narrowly listed Mapbox API/style/image/worker endpoints. Session synchronizer tokens protect unsafe methods. Pug escaping, validation, upload limits, environment secrets, test-only identity injection, and ownership filters provide defense in depth.

## 13. Error-handling design

Invalid ObjectIds become 404 before Mongoose. Async controllers forward errors; final 404 and error handlers render safe pages and hide stacks/database details.

## 14. Deployment design

A TLS reverse proxy hosts one Node process connected to Atlas, Google, Mapbox, and durable object storage. Shutdown stops HTTP then Mongoose; managed secrets and persistent logging are operator concerns.

## 15. Requirement-to-design traceability

Sections 6–9 realize FR-001–012; sections 10–14 realize data and NFR controls. The detailed mapping is `05-traceability-matrix.md`.
