const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Host = require('../models/Host');
const uploader = require('./../config/cloudinary');

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

router.post('/signup', uploader.single('avatar'), (req, res) => {
	//console.log(req.file);
	//console.log(req.body);
	const { name, lastname, email, avatar, phone, password, catsitter } = req.body;
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
		.then((user) => {
			if (catsitter === 'yes') {
			}
			const { homeType, hasGarden, howManyAnimals, hasAnimals, zipcode} = req.body;
			Host.create({
				user_id: user._id,
				homeType,
				hasGarden,
				howManyAnimals,
				hasAnimals,
				zipcode
			});
			//}

			res.redirect('/dashboard');
		})
		.catch((err) => {
			res.redirect('/dashboard', err);
		});
	if (email === '' || password === '') {
		res.render('auth/signup', { message: 'Indicate username and password' });
		return;
	}

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
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
