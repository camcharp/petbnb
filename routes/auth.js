const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Host = require("../models/Host");
const uploader = require("./../config/cloudinary");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { scripts: ["form-register.js"] });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both fields to sign up."
    });
    return;
  }
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "This email isn't linked to any account."
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/dashboard");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

// Create User
router.post("/signup", uploader.single("avatar"), (req, res) => {
  //console.log(req.file);
  //console.log(req.body);
  const {
    name,
    lastname,
    email,
    avatar,
    phone,
    password,
    catsitter
  } = req.body;
  const newUser = {
    name,
    lastname,
    email,
    phone
  };
  if (req.file) {
    newUser.avatar = req.file.secure_url;
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  newUser.password = hashPass;

  User.create(newUser)
    .then(user => {
      if (catsitter === "yes") {
      }
      const {
        homeType,
        hasGarden,
        howManyAnimals,
        hasAnimals,
        zipcode,
        city,
      } = req.body;
      Host.create({
        user_id: user._id,
        homeType,
        hasGarden,
        howManyAnimals,
        hasAnimals,
        zipcode,
        city,
      });
      //}

      res.redirect("/dashboard");
    })
    .catch(err => {
      res.redirect("/dashboard", err);
    });
  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }
});

// Log Out
router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
});

module.exports = router;
