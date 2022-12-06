const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    books: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'books',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('likes', likeSchema);
