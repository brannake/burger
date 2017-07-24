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
    var add = req.body.burger_name;
  burger.insert([
    "burger_name", "devoured"
  ], [
    add, false
  ], function() {
    res.redirect("/");
  });
});

module.exports = router;