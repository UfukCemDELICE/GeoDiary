# Test Plan

## Scope and levels

Unit tests validate Mongoose rules without a database. Supertest integration tests cover routing, authentication gates, invalid IDs, and ownership with model doubles. Manual tests cover real OAuth, Mapbox behavior, multipart storage, responsive/accessibility behavior, and shutdown.

## Cases

| ID           | Scenario                                          | Expected                                        |
| ------------ | ------------------------------------------------- | ----------------------------------------------- |
| TC-AUTH-001  | Visitor requests protected route                  | Redirect to sign-in context                     |
| TC-AUTH-002  | First and repeat Google callback                  | One user; durable session                       |
| TC-AUTH-003  | POST logout with valid CSRF                       | Session ends; GET cannot log out                |
| TC-DIARY-001 | Valid create/list/detail                          | Entry persists and renders for owner            |
| TC-DIARY-002 | Missing fields, bad date, long text, malformed ID | Field 422 or safe 404; no raw error             |
| TC-DIARY-003 | Owner updates/deletes                             | Only targeted owned entry changes               |
| TC-MAP-001   | Click and edit existing point                     | Hidden values/restored marker match `[lng,lat]` |
| TC-MAP-002   | Map page                                          | Only owned minimal markers render               |
| TC-IMAGE-001 | No file and allowed JPEG/PNG/WebP                 | Optional succeeds; generated path and metadata  |
| TC-IMAGE-002 | Oversize, spoofed/unsupported type                | Rejected; no persisted diary/orphan             |
| TC-SEC-001   | User A requests User B diary                      | Same 404 as nonexistent; content absent         |
| TC-SEC-002   | Missing/invalid CSRF or body user ID              | 403; body identity ignored                      |

## Negative scenarios and data rules

Use invented users, unique ObjectIds, boundary coordinates, harmless tiny fixture images, and never production credentials or personal content. Test cancellation, expired session, unavailable dependencies, duplicate login, XSS-like text (rendered escaped), upload errors, and database errors.

## Manual procedure

Use two Google test accounts to exercise every read/write boundary; inspect browser network/HTML for minimum marker data; verify keyboard form operation and mobile layout; test process signals in a disposable environment.

## Exit criteria

All automated tests/lint/format pass; every FR has an executed automated or manual case; no severity-high security defect; authorization and validation negatives pass; evidence and matrix statuses are current.
