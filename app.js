require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// const flatpickr = require("flatpickr");

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.locals.siteurl = process.env.SITE_URL

// Express View engine setup

app.use(
	require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
	if (arguments.length < 2) throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
	if (typeof value !== undefined) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

// default value for title local
app.locals.title = 'CatBnb';

// Enable authentication using session + passport
app.use(
	session({
		secret: 'basic-auth-secret',
		cookie: { maxAge: 60000 },
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		})
	})
);

function checkloginStatus(req, res, next) {
	res.locals.user = req.session.currentUser ? req.session.currentUser : null;
	// access this value @ {{user}} or {{user.prop}} in .hbs
	res.locals.isLoggedIn = Boolean(req.session.currentUser);
	// access this value @ {{isLoggedIn}} in .hbs
	next();
}
app.use(checkloginStatus);

const index = require('./routes/index');
app.use('/', index);

// Routers
const basePageRouter = require('./routes/index');
app.use(basePageRouter);

const authRouter = require('./routes/auth');
app.use(authRouter);

const profileRouter = require('./routes/profile');
app.use(profileRouter);

module.exports = app;
