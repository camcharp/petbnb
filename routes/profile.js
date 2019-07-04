const express = require('express');
const router = express.Router();
const uploader = require('./../config/cloudinary');

const User = require('../models/User');
const Cat = require('../models/Cat');
// const Host = require('../models/Host');

// User Page
router.use((req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		res.redirect('/login');
	}
});
router.get('/dashboard', (req, res, next) => {
	User.findById(req.session.currentUser._id)
	.then((user) => {
		res.render('dashboard/my_profile', { user });
	})
	.catch((err) => {
		res.render('dashboard/my_profile', { err: 'an error occured' });
	});
});

// Update User
router.post('/dashboard', (req, res, next) => {
	const { name, lastname, email, phone } = req.body;
	const userId = req.session.currentUser;
	User.findByIdAndUpdate(userId, { name, lastname, email, phone })
		.then((user) => {
			res.redirect('/dashboard');
			console.log('Modified succesfully!');
		})
		.catch((error) => {
			console.log(error);
		});
});

// Delete User
router.get('/delete/:id', function(req, res) {
	User.findByIdAndDelete(req.params.id)
		.then((user) => {
			console.log(user)
			res.redirect("/");
		})
		.catch((err) => {
			res.render('dashboard/my_profile', { err: 'an error occured' });
		});
	//res.send(req.body.data);
});

// Cats Page
router.use((req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		res.redirect('/login');
	}
});
router.get('/dashboard/cats', (req, res, next) => {
	res.render('dashboard/my_cats');
});

// Create Cats
router.post('/dashboard/cats', uploader.single('catavatar'), (req, res) => {
	console.log(req.file);
	console.log(req.body);
	const { catname, age, genre, personality } = req.body;
	const newCat = {
		catname,
		age,
		genre,
		personality
	};
	if (req.file) {
		newCat.catavatar = req.file.secure_url;
	}
	Cat.create(newCat)
		.then((dbRes) => {
			res.redirect('/dashboard/cats'),{ dbRes };
		})
		.catch((err) => {
			res.redirect('/dashboard/cats', err);
		});
});

// Update Cats
/* router.use((req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		res.redirect('/login');
	}
});
router.get('/dashboard/cats', (req, res, next) => {
	Cat.findById(req.session.currentUser._id)
		.then((cats) => {
			res.render('/dashboard/my_cats', { cats });
		})
		.catch((err) => {
			res.render('/dashboard/my_cats', { err: 'an error occured' });
		});
}); */

// Booking Page
router.use((req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		res.redirect('/login');
	}
});
router.get('/dashboard/bookings', (req, res, next) => {
	res.render('dashboard/my_bookings');
});

/* 
	User.findOne({ username }, 'username', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The username already exists' });
			return;
		} 
	});*/

module.exports = router;
