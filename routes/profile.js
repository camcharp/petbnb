const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Cat = require('../models/Cat');
// const Host = require('../models/Host');

// Dashboard Page
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

// Cats Page
router.get('/dashboard/cats', (req, res) => {
	res.render('dashboard/my_cats');
});

// Create Cats
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

// Booking Page
router.get('/dashboard/bookings', (req, res) => {
	res.render('dashboard/my_bookings');
});

/* 	router.post('/dashboard', (req, res, next) => {
		const userId = req.body._id;
		const name = req.body.name;
		const lastname = req.body.lastname;
		const email = req.body.email;
		const phone = req.body.phone;
		const avatar = req.body.avatar;

		User.updateOne(
			{ _id: userId },
			{
				name: name,
				lastname: lastname,
				email: email,
				phone: phone,
				avatar: avatar
			}
		)
			.then((user) => {
				console.log('Modified ' + user.name + ' succesfully !');
				res.redirect('/index');
			})
			.catch((err) => {
				res.redirect('/index', err);
			});
	}); */
	/* 
	User.findOne({ username }, 'username', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The username already exists' });
			return;
		} 
	});*/

module.exports = router;
