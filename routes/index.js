const express = require('express');
const router = express.Router();

const {
  ensureAuthenticated
} = require('../config/auth');


//Dashboard Redirect middleware
router.get('/', (req, res) => res.redirect('/dashboard'));

module.exports = router;
