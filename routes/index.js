var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const counte = (15*5);

  res.render('index', { title: 'ExpressJS', counte: counte });
});

module.exports = router;
