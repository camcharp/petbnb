const express = require("express");
const router = express.Router();

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
