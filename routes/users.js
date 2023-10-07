var express = require("express");
var router = express.Router();
var multer = require("multer");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/register", function (req, res, next) {
  res.json(req);
  console.log("req", req);
});

module.exports = router;
