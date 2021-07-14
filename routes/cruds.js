var express = require('express');
const {Op} = require('sequelize');
const {Book} = require('../models');
// const book = require('../models/book');
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
    const offset = (req.params.pageId !== undefined) ? (+req.params.pageId -1) * limit : 0; 
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

  
  //GET NEW BOOK FORM
  newBookForm: (req, res) => {
    res.render('books/new-book', {book: {}, title: 'New Book'});
  },
  
  //POST/SHOW NEW BOOK
  newBookPost: asyncHandler(async (req, res) => {
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
  
  //GET UPDATE BOOK FORM
  updateForm: asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.bookId);
    (book)
      ? res.render('books/update-book', { book, title: 'Edit Book '})
      : next()
  }),
  
  //POST UPDATE BOOK
  update: asyncHandler(async (req, res, next) => {
    let book;
    try {
      book = await Book.findByPk(req.params.bookId);
      if(book) {
        await book.update(req.body);
        res.redirect('/books/page/1');
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
  
  //POST BOOK SEARCH
  searchBooks: asyncHandler(async (req, res, next) => {
    const {search} = req.body;
    console.log(Boolean(search))
    const books = await Book.findAndCountAll({
      attributes: ['id', 'title', 'author', 'genre', 'year'],
      where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`
              }
            },
            {
              author: {
                [Op.like]: `%${search}%`
              }
            },
            {
              genre: {
                [Op.like]: `%${search}%`
              }
            },
            {
              year: {
                [Op.like]: `%${search}%`
              }
            }
        ]
      },
      order: [['title', 'ASC']],
      // offset: offset,
      // limit: 100
    });
    (books)
      ? res.render("books", {
          title: 'Books Search Results',
          books: books.rows.map((v) => v.toJSON()),
          search,
          count: books.count,
        })
      : next();
  }),

  //POST DESTROY THE BOOK
  destroyBook: asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.bookId);
    (book)
      ? await book.destroy()
      : next()
    res.redirect('/');
  })
}

module.exports = {books};