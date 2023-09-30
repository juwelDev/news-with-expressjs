var express = require('express');
var router = express.Router();

const base_url = process.env.BASEURL || 'http://localhost:3000';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ExpressJS',
    baseUrl: base_url,
    flashsms: req.flash('success'),
    flasherr: req.flash('error'),
  });
});


router.get('/login', function (req, res, next) {
  res.render('login', { title: 'User account login' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'User account register', errors: '', user: req.user });
});


module.exports = router;
