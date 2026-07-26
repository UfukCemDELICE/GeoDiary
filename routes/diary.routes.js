const router = require('express').Router();
const c = require('../controllers/diary.controller');
const requireAuth = require('../middleware/require-auth');
const validateId = require('../middleware/validate-object-id');
const csrf = require('../middleware/csrf');
const { diaryValidation } = require('../middleware/validate-diary');
router.use(requireAuth);
router.get('/', c.index);
router.get('/map', c.map);
router.get('/new', c.newForm);
router.post(
  '/',
  csrf,
  diaryValidation,
  c.create,
);
router.get('/:id', validateId, c.show);
router.get('/:id/edit', validateId, c.editForm);
router.patch(
  '/:id',
  validateId,
  csrf,
  diaryValidation,
  c.update,
);
router.delete('/:id', validateId, c.remove);
module.exports = router;
