var express = require('express');
var router = express.Router();

const base_url = process.env.BASEURL || 'http://localhost:3000';

/* GET home page. */
router.get('/', function (req, res, next) {

  const success = req.flash('success');
  const error = req.flash('error');
  const user = req.user;

  // console.log('flash success', success);
  // console.log('flash error', error);
  console.log('req user', req.user);

  const data = {
    title: 'Nes Express',
    baseUrl: base_url,
    flashSuccess: success,
    flashError: error,
    user: user,
    // posts: posts,
  };

  res.render('index', data);
});


router.get('/login', function (req, res, next) {
  const success = req.flash('success');
  const error = req.flash('error');

  res.render('login', {
    title: 'User account login',
    flashSuccess: success,
    flashError: error,
    user: req.user
  });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'User account register', errors: '', user: req.user });
});


module.exports = router;
