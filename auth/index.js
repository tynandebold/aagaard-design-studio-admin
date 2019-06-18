const passport = require('passport');
const express = require('express');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })
);

module.exports = router;
