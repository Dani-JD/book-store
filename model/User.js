const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: [2, 'first Name name must be atleast two letters'],
      required: [true, "first Name field Can't be empty"],
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [2, 'last Name name must be atleast two letters'],
      required: [true, "last Name field Can't be empty"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email address is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      minLength: [2, 'password must be more than 6 characters'],
      required: 'password  is required',
    },
    address: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      street: {
        type: String,
      },
      house_no: {
        type: String,
      },
    },
    phone: {
      type: String,
      required: 'phone address is required',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userSchema);
