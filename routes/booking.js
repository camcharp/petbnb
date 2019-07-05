const express = require("express");
const router = express.Router();
const Host = require("./../models/Host");
const User = require("./../models/User");
const Booking = require("./../models/Booking");

router.get("/booking", (req, res) => {
  // console.log(req.query.client);
  Promise.all([Host.findOne({_id: req.query.host}).populate("user_id"), User.findOne({_id: req.query.client})])
  .then(dbResults => {
    // console.log(dbResults);
    res.render("bookings/makedeal", {scripts: ["booking-validate.js"], needCalendar: true, host: dbResults[0], client: dbResults[1]});
  })
  .catch(dbErrors => console.log(dbErrors))
});

router.post("/booking", (req, res) => {
  const { user_id, host_id, startDate, endDate } = req.body;
  Booking.create({
    user_id,
    host_id,
    startDate,
    endDate,
  })
    .then(booking => {
      res.render("bookings/booking_confirmed");
    })
    .catch(err => {
      console.log(err)
    });
});

module.exports = router;