const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

<<<<<<< HEAD
router.get("/services", (req, res) => {
  console.log(req);
  res.render("services/services");
=======
router.get('/services', (req, res) => {
  res.render('services/services');
>>>>>>> 6080a8ccc80c861eafdff722d6188dfdaa127f27
});

module.exports = router;
