// import dotenv file
require('dotenv').config();
// Connect to db
const connect = require('./db/connect');

// Setup express app
const express = require('express');
const app = express();
const expressLayout = require('express-layout');
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');

// Accept form data
app.use(express.urlencoded({ extended: false }));
// Accept json data
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// setup static folder
app.use(express.static('./public'));

// setup view engine
app.set('view engine', 'ejs');
app.use(expressLayout());
// method ovveride
app.use(methodOverride('_method'));
// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// Passport
require('./config/strategy')(passport);
app.use(passport.session());
app.use(passport.initialize());

app.use(flash());
app.use((req, res, next) => {
  res.locals.logout_message = req.flash('logout_message');
  res.locals.register_message = req.flash('registerd_message');
  res.locals.login_error = req.flash('login_error');
  res.locals.user = req.user;
  next();
});
// Routers
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);

app.use((req, res) => {
  res.render('404');
});
// get port from .env file
const port = process.env.PORT || 3000;
// check db connection and start server
connect
  .then(() => {
    app.listen(port, console.log(`Server listining at ${port} ...`));
  })
  .catch((e) => {
    console.log('Error starting server: ', e.message);
  });
