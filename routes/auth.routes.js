const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/auth.controller');
const requireAuth = require('../middleware/require-auth');
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  controller.callback,
);
router.post('/logout', requireAuth, controller.logout);
module.exports = router;
