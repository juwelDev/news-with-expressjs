var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var a = "Hello expressJS";
  res.render('index', { title: a });
});

module.exports = router;
