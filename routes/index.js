var express = require("express");
var router = express.Router();

const base_url = process.env.BASEURL || "http://localhost:3000";

/* GET home page. */
router.get("/", function (req, res, next) {
  
  const success = req.flash("success");
  const error = req.flash("error");
  const data = {
    title: "Nes Express",
    baseUrl: base_url,
    flashsms: success,
    flasherr: error,
    // user: req.user,
    // posts: posts,
  };
  res.render("index", data);
});

router.get("/login", function (req, res, next) {
    const success = req.flash("success");
    const error = req.flash("error");

    console.log('user', req.user);
  res.render("login", {
    title: "User account login",
    flashsms: success,
    flasherr: error,
    user: req.user,
  });
});

router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "User account register",
    errors: "",
    user: req.user,
  });
});
module.exports = router;
