const express = require("express");
const router = express.Router();
const uploader = require("./../config/cloudinary");

const User = require("../models/User");
const Cat = require("../models/Cat");
// const Host = require('../models/Host');

// User Page
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});
router.get("/dashboard", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then(user => {
      res.render("dashboard/my_profile", { user });
    })
    .catch(err => {
      res.render("dashboard/my_profile", { err: "an error occured" });
    });
});

// Update User
router.post("/dashboard", (req, res, next) => {
  const { name, lastname, email, phone } = req.body;
  const userId = req.session.currentUser;
  User.findByIdAndUpdate(userId, { name, lastname, email, phone })
    .then(user => {
      res.redirect("/dashboard");
      console.log("Modified succesfully!");
    })
    .catch(error => {
      console.log(error);
    });
});

// Delete User
router.get("/delete/:id", function(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      console.log(user);
      res.redirect("/");
    })
    .catch(err => {
      res.render("dashboard/my_profile", { err: "an error occured" });
    });
  //res.send(req.body.data);
});

// Cats Page
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});
router.get("/dashboard/cats", (req, res, next) => {
  Cat.find({ owner: req.session.currentUser._id }).then(dbRes => {
    console.log(dbRes);
    res.render("dashboard/my_cats", { cats: dbRes });
  });
});

// Create Cats
router.post("/dashboard/cats", uploader.single("catavatar"), (req, res) => {
  const userId = req.session.currentUser._id;
  const { catname, age, genre, personality } = req.body;
  if (req.file) var catavatar = req.file.secure_url;
  Cat.create({
    owner: userId,
    catname,
    age,
    genre,
    personality,
    catavatar
  })
    .then(createdCat => {
      res.redirect("/dashboard/cats");
    })
    .catch(err => {
      res.render("dashboard/my_cats", { errorMsg: "Incomplete fields" });
    });
});

// Get to Cat Page
router.get("/dashboard/cats/:id", (req, res, next) => {
  const catId = req.params.id;
  Cat.findById(catId)
    .then(cat => {
      res.render("dashboard/my_cat", { cat });
    })
    .catch(err => res.redirect("/"));
});

// Update Cat
router.post("/dashboard/cats/:id", (req, res, next) => {
  const { catname, age } = req.body;
  const catId = req.params.id;
  Cat.findByIdAndUpdate(catId, { catname, age })
    .then(cat => {
      res.redirect("/dashboard/cats");
      console.log("Modified succesfully!");
    })
    .catch(error => {
      console.log(error);
    });
});

// Delete Cat
router.get("/dashboard/delete/cats/:id", function(req, res) {
  Cat.findByIdAndDelete(req.params.id)
    .then(user => {
      console.log(user);
      res.redirect("/dashboard/cats");
    })
    .catch(err => {
      res.render("/dashboard/cats", { err: "an error occured" });
    });
});

// Got to Cats Page
router.get("/dashboard/cats", (req, res, next) => {
  Cat.findById(req.session.currentUser._id)
    .then(cats => {
      res.render("/dashboard/my_cats", { cats });
    })
    .catch(err => {
      res.render("/dashboard/my_cats", { err: "an error occured" });
    });
});

// Booking Page
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});
router.get("/dashboard/bookings", (req, res, next) => {
  res.render("dashboard/my_bookings");
});

/* 
	User.findOne({ username }, 'username', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The username already exists' });
			return;
		} 
	});*/

module.exports = router;
