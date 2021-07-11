var express = require('express');
// var router = express.Router();
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

books = {

  //GET ALL BOOKS
  list: asyncHandler(async (req, res) => {
    console.log('/books Route Called');
    const books = await Book.findAll({
      attributes: ['id', 'title', 'author', 'genre', 'year']
    });
    (books)
      ? res.render("books/index", {title: 'Books', books: books.map((v)=> v.toJSON())})
      : next();
  }),

  //GET SINGLE BOOK
  book: asyncHandler(async (req, res, next) => {
    console.log('/:bookId Route Called');
    const book = await Book.findByPk(req.params.bookId);
    (book)
      ? res.render("books/book", {title: book.title, book: book.toJSON()})
      : next();
  }),

  //GET NEW BOOK FORM
  newBookForm: (req, res) => {
    console.log('/newbook Get Called');
    res.render('books/new-book', {book: {}, title: 'New Book'});
  },

  //POST/SHOW NEW BOOK
  newBookPost: asyncHandler(async (req, res) => {
    console.log('/ New Book Post Route Called');
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect('/books/' + book.id);
    } catch(error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render('books/new-book', {book, errors: error.errors, title: 'New Book'})
      } else {
        throw error;
      }
    }
  }),

  //GET EDIT BOOK FORM
  updateForm: asyncHandler(async (req, res, next) => {
    console.log('/edit/:bookId GET Route Called')
    const book = await Book.findByPk(req.params.bookId);
    (book)
      ? res.render('books/update-book', { book, title: 'Edit Book '})
      : next()
  }),

  //POST UPDATE BOOK
  update: asyncHandler(async (req, res, next) => {
    console.log('/edit/:bookID POST Route Called')
    let book;
    try {
      book = await Book.findByPk(req.params.bookId);
      if(book) {
        await book.update(req.body);
        res.redirect('/books/' + book.id);
      } else {
        next();
      }
    } catch (error) {
      if(error.name === 'SequelizeValidationError') {
        console.log('/update/:bookId POST Validation Error Called')
        book = await Book.build(req.body);
        book.id = req.params.bookId;
        res.render('books/update-book', {book, errors: error.errors, title: 'Edit Book'})
      } else {
        throw error;
      }
    }
  }),

  //GET DELETE FORM
  deleteForm: asyncHandler(async (req, res, next) => {
    console.log('GET /delete/:bookId Route Called')
    const book = await Book.findByPk(req.params.bookId);
    (book)
      ? res.render('books/delete', {book, title: 'Delete Book'})
      : next();
  }),

  //POST DESTROY THE BOOK
  destroyBook: asyncHandler(async (req, res, next) => {
    console.log('POST /delete/:bookId Route Called', req.params.bookId)
    const book = await Book.findByPk(req.params.bookId);
    console.log(book.toJSON());
    (book)
      ? await book.destroy()
      : next()
    res.redirect('/books');
  })

}
module.exports = {books};