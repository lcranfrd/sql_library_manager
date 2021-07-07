var express = require('express');
var router = express.Router();
const {Book} = require('../models');

function asyncHandler(db) {
  return async(req, res, next) => {
    try{
      await db(req, res, next)
    } catch(error) {
      console.log('AsyncHandler Called');
      next(error);
    }
  }
}

// GET All BOOKS
router.get('/', asyncHandler(async(req, res) => {
  console.log('/books Route Called');
  const books = await Book.findAll({
    attributes: ['id', 'title', 'author', 'genre', 'year']
  });
  (books)
    ? res.render("books/index", {title: 'Books', books: books.map((v)=> v.toJSON())})
    : next();
}));

//GET SINGLE BOOK
router.get("/:bookId", asyncHandler(async (req, res, next) => {
  console.log('/:bookId Route Called');
  const book = await Book.findByPk(req.params.bookId);
  (book)
    ? res.render("books/book", {title: book.title, book: book.toJSON()})
    : next();
}));

// GET NEW BOOK FORM
router.get('/newbook', (req, res) => {
  console.log('/newbook Get Called');
  res.render('books/new-book', {book: {}, title: 'New Book'});
});

// POST NEW BOOK THEN SHOW NEW BOOK
router.post('/', asyncHandler(async (req, res) => {
  console.log('/ New Book Post Route Called');
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books/' + book.id);
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('books/new', {book, errors: error.errors, title: 'New Book'})
    } else {
      throw error;
    }
  }
}));


module.exports = router;
