var express = require('express');
const {Book} = require('../models');
const book = require('../models/book');
const {limit} = {limit: 5};

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
    console.log(req.params)
    const offset = (req.params.pageId !== undefined) ? (+req.params.pageId -1) * limit : 0; 
    console.log('Offset is ' + offset)
    const books = await Book.findAndCountAll({
      attributes: ['id', 'title', 'author', 'genre', 'year'],
      order: [['title', 'ASC']],
      offset: offset,
      limit
    });
    (books)
      ? res.render("books", {
          title: 'Books',
          books: books.rows.map((v) => v.toJSON()),
          count: books.count,
          limit,
          offset
        })
      : next();
  }),

  //GET SINGLE BOOK
  book: asyncHandler(async (req, res, next) => {
    console.log('books/:bookId Route Called');
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
      res.redirect('book/' + book.id);
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
        res.redirect('/book/' + book.id);
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