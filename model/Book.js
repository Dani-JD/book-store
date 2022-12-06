const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      index: true,
      unique: [true, 'Book title alredy exists'],
      required: [true, "Book Title field Can't be empty"],
    },
    catagory: {
      type: String,
      trim: true,
      required: [true, "Catagory field Can't be empty"],
      enum: [
        // Fictional
        'Fantasy',
        'Adventure',
        'Romance',
        'Contemporary',
        'Dystopian',
        'Mystery',
        'Horror',
        'Thriller',
        'Paranormal',
        'Historical fiction',
        'Science Fiction',
        'Childrens',
        // Non Fictional
        'Memoir',
        'Cookbook',
        'Art',
        'Self-help',
        'Development',
        'Motivational',
        'Health',
        'History',
        'Travel',
        'Guide / How-to',
        'Families & Relationships',
        'Humor',
      ],
    },
    author: {
      type: String,
      trim: true,
      minLength: [2, 'author name must be atleast two letters'],
      required: [true, "Author field Can't be empty"],
    },
    language: {
      type: String,
      trim: true,
      required: [true, "Language field Can't be empty"],
    },
    description: {
      type: String,
      trim: true,
      minLength: [5, 'description must be atleast 5 letters'],
      maxLength: [1000, 'description must be less than 100 letters'],
      required: [true, "Description field Can't be empty"],
    },
    summary: {
      type: String,
      trim: true,
      minLength: [10, 'description must be atleast 20 letters'],
      maxLength: [3000, 'description must be less than 1000 letters'],
      required: [true, "summary field Can't be empty"],
    },
    pages: {
      type: Number,
      min: [5, 'Number of pages is less than expected (5)'],
      max: [10000, 'Number of pages is more than than expected (10,000)'],
      required: [true, "Pages field Can't be empty"],
    },
    price: {
      type: Number,
      min: [1, 'Price is less than expected (1$)'],
      required: [true, "Price field Can't be empty"],
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    publisher: {
      type: String,
      min: [5, 'publisher less than expected (5)'],
      max: [50, 'publisher more than than expected (50)'],
      required: [true, "Pages field Can't be empty"],
    },
    publishedDate: {
      type: Date,
      required: [true, "Published Date field Can't be empty"],
    },
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
    coverImage: {
      type: String,
      required: [true, 'Uplode Cover Image'],
    },
    likes: Number,
    sold: Number,
  },
  {
    toJSON: { getters: true },
    timestamps: true,
  }
);

module.exports = mongoose.model('books', bookSchema);
