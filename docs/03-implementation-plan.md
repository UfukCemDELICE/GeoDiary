# Implementation Plan

All phases use the prerequisite chain **Need → Requirement → Design → Task → Code → Test → Traceability**. “Template” is present; “Intern” is assigned work.

| Phase                        | Objective / prerequisites             | Tasks and ownership                                                                         | Deliverables / acceptance                       | SRS / SDD              |
| ---------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------- |
| 1 — Express and MVC baseline | Learn request flow; read brief/SRS    | Template: bootstrap, views, errors                                                          | App/home/health run independently of listener   | NFR-005; §§2–5,13      |
| 2 — Google authentication    | Atlas and Google credentials; phase 1 | Template: Passport/session/logout. Intern: manual failure/expiry checks                     | Repeat login reuses user; protected redirect    | FR-001/002/012; §6     |
| 3 — Diary CRUD               | Auth and model knowledge              | Template: representative CRUD. Intern: UX, image-aware edits, richer error preservation     | Create/read/update/delete acceptance evidence   | FR-003/006/008–010; §7 |
| 4 — Ownership authorization  | CRUD; authentication vs authorization | Template: scoped queries/test. Intern: broaden mutation/list/map cases                      | Foreign and missing resources indistinguishable | FR-011; §§7,12         |
| 5 — Mapbox integration       | Public token; GeoJSON review          | Template: click/restore/markers. Intern: bounds, accessibility, interaction polish          | Valid coordinates and owned markers             | FR-004/007; §§8,10     |
| 6 — Image upload             | Multipart/security knowledge          | Template: local adapter/limits. Intern: replacement cleanup and object adapter design spike | Safe optional upload; no binary in DB           | FR-005; §9             |
| 7 — Validation and security  | Prior phases                          | Template: Helmet/CSRF/server rules. Intern: edge cases and threat review                    | Negative tests; safe errors                     | NFR-001/007; §§12–13   |
| 8 — Testing                  | Stable interfaces                     | Template: baseline unit/integration. Intern: full acceptance matrix                         | Offline suite passes and isolation proven       | All FRs; §15           |
| 9 — Documentation review     | Code/tests complete                   | Intern: reconcile SRS, SDD, ADRs, matrix                                                    | No stale path/status; peer review               | NFR-005; §15           |
| 10 — Final demonstration     | Exit criteria met                     | Intern: scripted OAuth/create/map/edit/delete/isolation demo                                | Checks green; limitations disclosed             | All; §§1–15            |
