const express = require("express");
const router = express.Router();

const User = require('../models/User');
const Host = require('../models/Host');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", {scripts: ["form-register.js"]});
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
  User.find()
  .then((user) => {
    res.render("dashboard/my_profile", { user });
  })
  .catch((err) => {
    res.render("dashboard/my_profile", { err: 'an error occured' });
  });
});

router.get("/bookings", (req, res) => {
  res.render("dashboard/my_bookings");
});

router.get("/cats", (req, res) => {
  res.render("dashboard/my_animals");
});

/* router.get('/delete/:id', function(req, res) {
	Product.findByIdAndDelete(req.params.id)
		.then((products) => {
			console.log(products)
			res.redirect("/prod-manage");
		})
		.catch((err) => {
			res.render('collection', { err: 'an error occured' });
		});
	//res.send(req.body.data);
}); */

module.exports = router;
