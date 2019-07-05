const express = require("express");
const router = express.Router();
const Host = require("./../models/Host");
const User = require("./../models/User");

router.get("/booking", (req, res) => {
  // console.log(req.query.host);
  // console.log(req.query.client);
  Promise.all([Host.findOne({_id: req.query.host}).populate("user_id"), User.findOne({_id: req.query.client})])
  .then(dbResults => {
    // console.log(dbResults);
    res.render("bookings/makedeal", {host: dbResults[0], client: dbResults[1]});
  })
  .catch(dbErrors => console.log(dbErrors))

});

module.exports = router;