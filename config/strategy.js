const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');

function Initialize(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      const { password, ...data } = user._doc;
      done(err, data);
    });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          //   console.log(user);
          if (!user) {
            // console.log('No User by this email');
            return done(null, false, { message: 'Invalid email or Password' });
          }

          if (!(await bcrypt.compare(password, user.password))) {
            // console.log('Password incorrect');
            return done(null, false, { message: 'Invalid email or Password' });
          }
          //   console.log('Every thing Ok');
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

module.exports = Initialize;
