# GeoDiary

GeoDiary is a server-rendered educational MVC starter for keeping private, location-aware diary entries. It deliberately provides a secure, runnable foundation while leaving bounded feature refinements to an intern.

## Stack and prerequisites

Node.js 20+, Express, Pug, Passport Google OAuth, MongoDB/Mongoose, Mongo-backed sessions, Mapbox GL JS, Multer, Helmet, express-validator, Vitest/Supertest, ESLint, and Prettier. Obtain a MongoDB Atlas URI, Google OAuth web credentials, and a public Mapbox token.

## Setup

1. Run `npm install` and copy `.env.example` to `.env`.
2. Fill every credential. In Google Cloud, register the callback shown by `GOOGLE_CALLBACK_URL`; create an Atlas database user/IP rule; create a restricted public Mapbox token.
3. Run `npm run dev`, then visit `http://localhost:3000`. `npm start` is the production-style command.

Run `npm test`, `npm run lint`, and `npm run format:check`. Tests inject identity only when `NODE_ENV=test` and need no external systems.

## Structure

`app.js` composes middleware/routes without listening; `server.js` validates, connects, listens, and shuts down. `routes/`, `middleware/`, `controllers/`, `models/`, `services/`, `views/`, and `public/` form a conventional MVC monolith. `docs/` connects requirements to design, work, and tests.

## Reading order

1. Project Brief
2. SRS
3. SDD
4. ADRs
5. Implementation Plan
6. Test Plan
7. Traceability Matrix
8. Intern Guide

## Intern workflow

Follow **Need → Requirement → Design → Task → Code → Test → Traceability**. Cite requirement IDs in commits and update tests and the matrix with each change.

## Known limitations and production considerations

The starter implements representative CRUD and strict ownership queries, but image replacement/cleanup, richer map behavior, edge cases, flash messages, and acceptance coverage remain intern work. Local uploads are development-only; production needs durable object storage, HTTPS, managed secrets, observability, backups, dependency patching, and deployment-specific CSP review. Mapbox CDN origins in Helmet are the minimum needed for its script, styles, tiles/events, images, and web worker; secrets are never sent to views.
