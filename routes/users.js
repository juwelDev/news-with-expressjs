const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const userUrl = path.join(__dirname, "../public/data/data.json");

  fs.readFile(userUrl, "utf-8", function (err, data) {
    if (err) {
      console.error({ err: err });
      return res.status(500).send({ message: "Error reading json file" });
    }

    const userData = JSON.parse(data);

    res.status(200).send(userData);
  });
});

module.exports = router;
