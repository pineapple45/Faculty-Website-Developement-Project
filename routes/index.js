const express = require('express');
const router = express.Router();

const {
  ensureAuthenticated
} = require('../config/auth');


//Welcome page
// router.get('/', (req, res) => res.render('welcome'));
router.get('/', (req, res) => res.redirect('/dashboard'));

//Dashboard page
// router.get('/dashboard', (req, res) => res.render('dashboard'));
// router.get('/dashboard/gallery', (req, res) => res.render('gallery'));

module.exports = router;
