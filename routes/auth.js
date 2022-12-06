const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  isAuthenticated,
  isNotAuthenticated,
} = require('../middleware/Authentication');

const {
  login,
  register,
  loginPage,
  registerPage,
} = require('../controller/auth-controller');

router
  .route('/login')
  .get(isNotAuthenticated, loginPage)
  .post((req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        req.flash('login_error', 'Something went wrong');
      }
      const red = req.session.red;
      req.session.red = null;
      req.logIn(user, (err) => {
        if (err) {
          req.flash('login_error', 'Invalid email or Password');
          return res.redirect('/api/v1/auth/login');
        }
        res.redirect(red || '/api/v1/books');
        return;
      });
    })(req, res, next);
  });
router.route('/register').get(isNotAuthenticated, registerPage).post(register);

// Logut
router.get('/logout', isAuthenticated, (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash('logout_message', 'You are logged out');
    res.redirect('/api/v1/auth/login');
  });
});

module.exports = router;

// (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     const red = req.session.red;
//     req.session.red = null;
//     req.logIn(user, (err) => {
//       res.redirect(red || '/api/v1/books');
//       return;
//     });
//   })(req, res, next);
//  }
