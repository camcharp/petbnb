const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/services", (req, res) => {
  res.render("services/services");
});

router.get("/profile", (req, res) => {
  res.render("dashboard/user_profile");
});

module.exports = router;
