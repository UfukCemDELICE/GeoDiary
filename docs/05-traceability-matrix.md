# Requirement Traceability Matrix

| Requirement | Design section | Intended implementation                                       | Test case        | Current status                           |
| ----------- | -------------- | ------------------------------------------------------------- | ---------------- | ---------------------------------------- |
| FR-001      | SDD §6         | `config/passport.js`, `routes/auth.routes.js`                 | TC-AUTH-002      | Template foundation; manual test pending |
| FR-002      | SDD §6         | `config/session.js`, `middleware/require-auth.js`             | TC-AUTH-001      | Baseline tested                          |
| FR-003      | SDD §7         | `controllers/diary.controller.js`, `views/diaries/new.pug`    | TC-DIARY-001/002 | Representative implementation            |
| FR-004      | SDD §8         | `public/js/diary-form-map.js`, `middleware/validate-diary.js` | TC-MAP-001       | Foundation; manual coverage pending      |
| FR-005      | SDD §9         | `middleware/upload.js`, `services/image.service.js`           | TC-IMAGE-001/002 | Foundation; lifecycle intern-owned       |
| FR-006      | SDD §7         | `controllers/diary.controller.js`, `views/diaries/index.pug`  | TC-DIARY-001     | Representative implementation            |
| FR-007      | SDD §8         | `views/diaries/map.pug`, `public/js/diary-list-map.js`        | TC-MAP-002       | Foundation; polish intern-owned          |
| FR-008      | SDD §7         | `controllers/diary.controller.js`, `views/diaries/show.pug`   | TC-SEC-001       | Baseline tested                          |
| FR-009      | SDD §7         | `controllers/diary.controller.js`, `views/diaries/edit.pug`   | TC-DIARY-003     | Foundation; upload replacement pending   |
| FR-010      | SDD §7         | `controllers/diary.controller.js`                             | TC-DIARY-003     | Foundation; image cleanup pending        |
| FR-011      | SDD §§7,12     | `controllers/diary.controller.js`                             | TC-SEC-001/002   | Core item isolation tested               |
| FR-012      | SDD §6         | `controllers/auth.controller.js`, `routes/auth.routes.js`     | TC-AUTH-003      | Foundation; manual test pending          |
