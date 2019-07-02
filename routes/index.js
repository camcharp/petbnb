const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.get("/services", (req, res) => {
  res.render("services/services");
});

router.get("/about", (req, res) => {
  res.render("services/about");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard/my_profile");
});

router.get("/bookings", (req, res) => {
  res.render("dashboard/my_bookings");
});

router.get("/cats", (req, res) => {
  res.render("dashboard/my_animals");
});

module.exports = router;
