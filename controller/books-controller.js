const Book = require('../model/Book');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, path.join(__dirname, '../public/img/cover'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uplode = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
}).single('coverImage');

/**
 * get: /api/v1/books/newbook
 * Post book
 * */
const newBook = async (req, res) => {
  res.render('books/newbook');
};

/**
 * post: /api/v1/books/
 * Add new Book
 * */
const addBook = (req, res) => {
  // Uplode function returns req.file
  uplode(req, res, async (err) => {
    if (err) {
      return res.send(err.message);
    }
    req.body.coverImage = req.file.filename;
    req.body.postedBy = req.user._id;

    try {
      const book = await Book.create(req.body);
      res.redirect('/api/v1/books');
    } catch (error) {
      res.send(error);
    }
  });
};

/**
 * get: /api/v1/books/
 * Get All Book
 * */

const getAllBooks = async (req, res) => {
  var search = new RegExp(req.query.search, 'i');
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: search } },
        { summary: { $regex: search } },
        { author: { $regex: search } },
      ],
    })
      .sort({ _id: -1 })
      .limit(15)
      .populate('postedBy'); // Sort by newest
    res.status(200).render('books/view-all-books', { books });
    books.forEach(() => {});
  } catch (error) {
    res.send(error.message);
  }
};

/**
 * get: /api/v1/books/id
 * Get a Book
 * */
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('postedBy');
    // res.send(book);
    res.status(200).render('books/view-book', { book });
  } catch (error) {
    res.send(error.message);
  }
};

/**
 * patch: /api/v1/books/id
 * Update Book
 * */
const updateBookPage = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/editbook', { book });
};

/**
 * patch: /api/v1/books/id
 * Update Book
 * */
const updateBook = async (req, res) => {
  uplode(req, res, async (err) => {
    if (err) {
      return res.send(err.message);
    }
    req.body.coverImage = req.file.filename;
    req.body.postedBy = req.user._id;
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/api/v1/books/' + req.params.id);
    } catch (error) {
      res.send(error);
    }
  });
};

/**
 * delete: /api/v1/books/id
 * Delete Book
 * */
const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  // res.send(book);
  res.redirect('/api/v1/books');
};

module.exports = {
  getAllBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook,
  newBook,
  updateBookPage,
};
