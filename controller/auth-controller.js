const bcrypt = require('bcrypt');
const User = require('../model/User');
/*
Get: /api/v1/auth/login    
Res: render login page
*/
const loginPage = (req, res) => {
  res.render('auth/login');
};

/*
Post: /api/v1/auth/login    
Res: authenticate user and login
*/
const login = (req, res) => {
  res.send(req.body);
};

/*
Get: /api/v1/auth/register    
Res: render register page
*/
const registerPage = (req, res) => {
  res.render('auth/register');
};

/*
Post: /api/v1/auth/register    
Res: register user
*/
const register = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    city,
    street,
    house_no,
    phone,
    email,
    password1,
    password2,
  } = req.body;
  if (
    !email ||
    !password1 ||
    !password2 ||
    !country ||
    !city ||
    !street ||
    !house_no ||
    !phone ||
    !firstName ||
    !lastName
  ) {
    req.flash('login_error', 'Fileds can not be empty');
    res.status(501).redirect('/api/v1/auth/register');
  }
  if (password1 !== password2) {
    req.flash('login_error', "Passwords did't confirm seccussfully");
    res.status(501).redirect('/api/v1/auth/register');
  }

  const hashedPassword = await bcrypt.hash(password1, 10);

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address: {
        country,
        city,
        street,
        house_no,
      },
    });
    await user.save();
    console.log(user);

    req.flash('registerd_message', 'User Registerd Successfuly');
    res.status(200).redirect('/api/v1/auth/login');
  } catch (error) {
    console.log(error);
    req.flash('login_error', error.message);
    res.status(200).redirect('/api/v1/auth/register');
  }
};

module.exports = {
  loginPage,
  registerPage,
  login,
  register,
};
