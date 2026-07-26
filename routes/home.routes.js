const router = require('express').Router();
const controller = require('../controllers/home.controller');
router.get('/', controller.index);
router.get('/health', (_req, res) => res.json({ status: 'ok' }));
module.exports = router;
