const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Cat = require('../models/Cat');
// const Host = require('../models/Host');

router.get('/dashboard', (req, res) => {
	res.render('dashboard/my_profile');
	User.find()
		.then((user) => {
			res.render('dashboard/my_profile', { user });
		})
		.catch((err) => {
			res.render('dashboard/my_profile', { err: 'an error occured' });
		});
});

// Cats
router.get('/dashboard/cats', (req, res) => {
	res.render('dashboard/my_cats');
});

router.post('/dashboard/cats', (req, res) => {
	console.log(req.body);
	const { catname, age, genre, personality, catavatar } = req.body;
	Cat.create({
		catname,
		age,
		genre,
		personality,
		catavatar
	})
		.then((dbRes) => {
			res.redirect('/dashboard/cats');
		})
		.catch((err) => {
			res.redirect('/dashboard/cats', err);
		});
});

router.get('/bookings', (req, res) => {
	res.render('dashboard/my_bookings');
});

module.exports = router;
