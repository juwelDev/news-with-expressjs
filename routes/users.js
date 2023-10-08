var express = require("express");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now() + '_' + file.originalname);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("profileimg");

var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");

var UserModel = require("../models/userModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post(
  "/register",
  body("name", "Name is required.").notEmpty(),
  body("email", "Email is required.").notEmpty(),
  body("email", "Email is not valid.").isEmail(),
  body("username", "Username is required.").notEmpty(),
  body("password", "Password is min 6.").isLength({ min: 6 }),
  body("password2", "Password and confirm password does not match.").custom(
    (value, { req }) => value === req.body.password
  ),
  async function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    console.log(req.body);

    // Form Validator
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      res.render("register", {
        title: "User account register",
        errors: errors.errors,
        user: req.user,
      });
    } else {
      var newUser = new UserModel({
        //User or UserModel ?
        name: name,
        email: email,
        username: username,
        password: password,
        profileimg: "",
        role: "user",
      });
      const userName = await UserModel.findOne({ username: username });
      if (userName) {
        const errdt = [
          {
            value: username,
            msg: `${username} This username isn't available!!!`,
            param: "username",
            location: "body",
          },
        ];
        res.render("register", {
          title: "User account register",
          errors: errdt,
          user: req.user,
        });
      } else {
        const emailData = await UserModel.findOne({ email: email });

        if (emailData) {
          const errdt = [
            {
              value: email,
              msg: `${email} This email isn't available!!!`,
              param: "email",
              location: "body",
            },
          ];
          res.render("register", {
            title: "User account register",
            errors: errdt,
            user: req.user,
          });
        } else {
          UserModel.createUser(newUser, function (err, user) {
            console.log(err);
            if (err) throw err;
            console.log(user);
          });

          req.flash("success", "You are now registered and can loging now..");
          // res.location("/");
          res.redirect("/");
        }
      }
    }
  }
);

module.exports = router;
