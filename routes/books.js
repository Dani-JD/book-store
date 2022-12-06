const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const {
  isAuthenticated,
  isNotAuthenticated,
} = require('../middleware/Authentication');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/cover');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uplode = multer({
  storage,
  limits: { fileSize: 3000000 }, // 3Mb
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

const {
  getAllBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook,
  newBook,
  updateBookPage,
} = require('../controller/books-controller');

router.route('/').get(getAllBooks).post(addBook);
router.get('/newbook', isAuthenticated, newBook);
router.get('/edit/:id', updateBookPage);
router
  .route('/:id')
  .get(isAuthenticated, getBook)
  .patch(isAuthenticated, updateBook)
  .delete(isAuthenticated, deleteBook);

module.exports = router;
