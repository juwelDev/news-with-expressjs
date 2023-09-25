const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:id", function (req, res, next) {
  const userId = req.params.id; // Get the user ID from the URL parameter

  // Load the JSON data file
  const userUrl = path.join(__dirname, "../public/data/data.json");

  fs.readFile(userUrl, "utf-8", function (err, data) {
    if (err) {
      console.error({ err: err });
      return res.status(500).send({ message: "Error reading json file" });
    }

    const userData = JSON.parse(data);
    console.log(userData);

    // Find the user with the specified ID
    const user = userData.find((u) => u.id == userId);
    console.log(user);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  });
});

module.exports = router;
