const express = require("express");
const router = express.Router();

const User = require('../models/User');
const Host = require('../models/Host');

// Home Page
router.get("/", (req, res, next) => {
  res.render("index");
});

// Services Page
router.get("/services", (req, res) => {
  res.render("services/services");
});

// Hosts Page
router.get("/hosts", (req, res) => {
  res.render("services/hosts");
});

// Profile Page
router.get("/profile/:id", (req, res) => {
  console.log(req.params.id)
  User.findById(req.params.id)
  .then((user) => {
		res.render('dashboard/user_profile', { user });
	})
	.catch((err) => {
		res.render('dashboard/user_profile', { err: 'an error occured' });
	});
});

module.exports = router;
