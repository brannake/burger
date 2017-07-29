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

router.post("/insert", function(req, res) {
    var add = req.body.burger_name;
  burger.insert([
    "burger_name", "devoured"
  ], [
    add, false
  ], function() {
    res.redirect("/");
  });
});

router.post("/update/:id", function(req, res) {
    console.log(req.params.id);
    var condition = "id = " + req.params.id;
  burger.update(true,
    condition, function() {
    res.redirect("/");
  });
});

router.post("/update2/:id", function(req, res) {
    console.log(req.params.id);
    console.log(req.body.thing);
    var condition = "id = " + req.params.id;
    var name = req.body.thing;
  burger.update2(name,
    condition, function() {
    res.redirect("/");
  });
});

router.post("/delete/:id", function(req, res) {
    console.log(req.params.id);
    var condition = req.params.id;
  burger.delete(
    condition, function() {
    res.redirect("/");
  });
});

module.exports = router;