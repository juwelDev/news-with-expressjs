var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next, item) {
  res.render("index", {
    title: `${item.name}`,
    // name: `khilkhet`,
    name: `<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 text-center bg-gray-500">
               
                <h3>${item.name}</h3>
                <p>${item.username}</p>
                <p>${item.email}</p>
                <p>${item.address.street}</p>
                <p>${item.address.suite}</p>
                <p>${item.address.city}</p>
                <p>${item.address.zipcode}</p>
                
            </div>`,
  });
  let imageJSON = "";
  let imageList = "";

  function loadPosts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      const photosList = JSON.parse(this.responseText);
      imageJSON = photosList;
      console.log("response", photosList);
      photosList.forEach((item, index) => {
        imageList += `        
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 text-center bg-gray-500">
               
                <h3>${item.name}</h3>
                <p>${item.username}</p>
                <p>${item.email}</p>
                <p>${item.address.street}</p>
                <p>${item.address.suite}</p>
                <p>${item.address.city}</p>
                <p>${item.address.zipcode}</p>
                
            </div>
            `;
      });

      document.getElementById("Images").innerHTML = imageList;
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhttp.send();
  }

  loadPosts();
});

module.exports = router;
