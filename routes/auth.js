const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Host = require('../models/Host');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true,
		passReqToCallback: true
	})
);

router.post('/signup', (req, res, next) => {
	const name = req.body.name;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const phone = req.body.phone;
	const avatar = req.body.avatar;
	const cats = req.body.cats;
	const rate = req.body.rate;

	const password = req.body.password;
	const salt = bcrypt.genSaltSync(bcryptSalt);
	const hashPass = bcrypt.hashSync(password, salt);

	User.create({
		name,
		lastname,
		email,
		phone,
		password,
		avatar,
		cats,
		rate,
		password: hashPass
	})
		.then((user) => {
			const homeType = req.body.homeType;
			const hasGarden = req.body.hasGarden;
			const howManyAnimals = req.body.howManyAnimals;
			const hasAnimals = req.body.hasAnimals;
			if (document.getElementById('catsitter-yes').checked == true) {
				Host.create({
					user_id: user._id,
					homeType,
					hasGarden,
					howManyAnimals,
					hasAnimals
				})};
			console.log(req.body);
			res.redirect('/dashboard');
		})
		.catch((err) => {
			res.redirect('/dashboard', err);
		});
	if (email === '' || password === '') {
		res.render('auth/signup', { message: 'Indicate username and password' });
		return;
	}
/* 
	User.findOne({ username }, 'username', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The username already exists' });
			return;
		} 
	});*/
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
