const express = require("express");
const router = express.Router();

const User = require('../models/User');
const Host = require('../models/Host');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/services", (req, res) => {
  res.render("services/services");
});

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
