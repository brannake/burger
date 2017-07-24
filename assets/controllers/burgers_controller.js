var express = require("express");

var router = express.Router();

var burger = require("../../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
    console.log(req.body);
  burger.insert([
    "burger_name", "devoured"
  ], [
    "Whataburger", true
  ], function() {
    res.redirect("/");
  });
});

module.exports = router;