var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'Express' });
=======
  res.render('index', { title: 'ExpressJS' });
>>>>>>> 704a6f27249fecd031cdba88b48276c3808c986f
});

module.exports = router;
