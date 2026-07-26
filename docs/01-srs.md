# Software Requirements Specification

## 1. Introduction

This simplified IEEE 29148-inspired SRS defines observable GeoDiary behavior.

## 2. Purpose

It is the source of truth for implementation and acceptance.

## 3. Scope

A private, browser-based, location diary.

## 4. Definitions and abbreviations

**Diary:** dated text tied to a point. **OAuth:** delegated authentication. **GeoJSON:** geographic JSON. **Owner:** user who created a diary.

## 5. Overall description

The browser communicates with one server-rendered application and external identity, map, database, and image systems.

## 6. User classes

Visitors may sign in; authenticated users manage only their own entries; operators configure and run the service.

## 7. Assumptions and dependencies

JavaScript is enabled for maps; Google, Mapbox, and Atlas credentials are configured; production image storage is durable.

## 8. Functional requirements

Each requirement's actor is the visitor for FR-001 and authenticated user otherwise. Unless stated, precondition is a valid session; inputs are submitted UI values; failures retain privacy and show a safe error.

- **FR-001 Google authentication.** A visitor selects Google, consents, and returns authenticated. Cancellation returns safely; success creates or reuses one profile and opens diaries. Acceptance: repeat login never duplicates an account.
- **FR-002 Session management.** After authentication the system maintains identity across requests until expiry/logout. Invalid/expired sessions request sign-in. Acceptance: protected pages reject visitors.
- **FR-003 Diary creation.** Given title, content, date, and valid point, the user submits and the system saves an owned diary. Invalid input shows field errors without saving. Acceptance: saved entry appears in owner list.
- **FR-004 Map location selection.** The user clicks a map; the system records longitude and latitude and restores the point during edit. Missing/out-of-range values fail validation. Acceptance: selected coordinates persist in correct order.
- **FR-005 Optional photograph upload.** A supported image within size policy may accompany an entry; omission remains valid. Unsupported/oversize files fail safely. Acceptance: only metadata is persisted.
- **FR-006 Diary list.** The system lists only the user's entries, newest diary date first, with an empty state. Acceptance: no other owner's data appears.
- **FR-007 Diary map.** The system plots only owned entries with links and minimum marker data. Acceptance: each owned valid point is represented.
- **FR-008 Diary detail.** The owner can read one diary. Missing or foreign entries produce identical not-found behavior.
- **FR-009 Diary update.** The owner may replace validated editable values; failure leaves stored data unchanged. Acceptance: subsequent detail reflects updates.
- **FR-010 Diary deletion.** The owner confirms a form submission and the system removes the entry; foreign/missing IDs are not found. Acceptance: deleted entry disappears.
- **FR-011 User data isolation.** All diary reads/writes derive owner identity from the server session. Request-provided user IDs have no effect. Acceptance: cross-user access never discloses existence or content.
- **FR-012 Logout.** An authenticated user submits logout and the session ends. GET must not log out. Acceptance: protected access redirects afterward.

Postcondition for successful FR-003/009/010 is durable state change; for reads it is none.

## 9. Non-functional requirements

- **NFR-001 Security:** CSRF, secure cookies, CSP, validation, escaping, safe errors, upload allowlist, and least disclosure.
- **NFR-002 Performance:** indexed owner/date and geospatial access; ordinary pages should respond within 2 seconds under normal educational load excluding external latency.
- **NFR-003 Usability:** keyboard-usable forms, clear labels/errors, and useful empty states.
- **NFR-004 Reliability:** controlled startup/shutdown and no partial database writes in baseline flows.
- **NFR-005 Maintainability:** small CommonJS MVC modules, automated lint/format/tests, traceable TODOs.
- **NFR-006 Browser compatibility:** current evergreen desktop/mobile browsers.
- **NFR-007 Privacy:** private-by-default diaries and minimum data sent to map/browser.

## 10. External interface requirements

HTML forms and pages comprise the UI; Google OAuth authenticates, Mapbox supplies maps, Atlas persists records, and an image provider stores bytes.

## 11. Data requirements

User profiles and owned diaries retain timestamps. A point is longitude then latitude. Photo records contain metadata, never binary/Base64. Operators define retention/backups.

## 12. Business rules

Ownership is immutable from client input; foreign and absent diaries are indistinguishable; logout is POST; photo is optional.

## 13. Acceptance criteria

All FR acceptance statements pass; baseline automated tests and documented manual OAuth/Mapbox/upload checks pass; NFR security controls are reviewed.
