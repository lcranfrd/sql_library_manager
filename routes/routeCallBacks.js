/**========================================================================
 * *                                routeCallBacks.js
 *   
 *   Defines object 'books' containing callbacks for the routes defined in
 *   books.js. Separation of callbacks is a choice made for ease of
 *   reading.
 * 
 *========================================================================**/

'use strict';

const {Op} = require('sequelize');
const {Book} = require('../models');
const {limit} = {limit: 6};

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

const books = {

  //GET ALL BOOKS
  list: asyncHandler(async (req, res, next) => {
    const offset = (req.params.pageId !== undefined) ? (+req.params.pageId -1) * limit : 0; 
    const books = await Book.findAndCountAll({
      attributes: ['id', 'title', 'author', 'genre', 'year'],
      order: [['title', 'ASC']],
      offset: offset,
      limit
    });
    (books.rows.length !== 0)
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
    const book = await Book.findByPk(req.params.id);
    (book)
      ? res.render('books/update-book', { book, title: 'Edit Book '})
      : next()
  }),
  
  //POST UPDATE BOOK
  update: asyncHandler(async (req, res, next) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if(book) {
        await book.update(req.body);
        res.redirect('/books/page/1');
      } else {
        next();
      }
    } catch (error) {
      if(error.name === 'SequelizeValidationError') {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render('books/update-book', {book, errors: error.errors, title: 'Edit Book'})
      } else {
        throw error;
      }
    }
  }),
  
  //POST BOOK SEARCH
  searchBooks: asyncHandler(async (req, res, next) => {
    const searchCased = req.body.search.toLowerCase();
    const {search} = req.body;
    const books = await Book.findAndCountAll({
      attributes: ['id', 'title', 'author', 'genre', 'year'],
      where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${searchCased}%`
              }
            },
            {
              author: {
                [Op.like]: `%${searchCased}%`
              }
            },
            {
              genre: {
                [Op.like]: `%${searchCased}%`
              }
            },
            {
              year: {
                [Op.like]: `%${searchCased}%`
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
    const book = await Book.findByPk(req.params.id);
    (book)
      ? await book.destroy()
      : next()
    res.redirect('/');
  })
}

module.exports = {books};