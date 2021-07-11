var express = require('express');
var router = express.Router();
// const {Book} = require('../models');
const {books} = require('./cruds');

// function asyncHandler(db) {
//   return async(req, res, next) => {
//     try{
//       await db(req, res, next)
//     } catch(error) {
//       console.log('AsyncHandler Called');
//       next(error);
//     }
//   }
// }

// GET All BOOKS
router.get('/', books.list
// asyncHandler(async (req, res) => {
//   console.log('/books Route Called');
//   const books = await Book.findAll({
//     attributes: ['id', 'title', 'author', 'genre', 'year']
//   });
//   (books)
//     ? res.render("books/index", {title: 'Books', books: books.map((v)=> v.toJSON())})
//     : next();
// })
);

//GET SINGLE BOOK
router.get("/:bookId", books.book
//  asyncHandler(async (req, res, next) => {
//   console.log('/:bookId Route Called');
//   const book = await Book.findByPk(req.params.bookId);
//   (book)
//     ? res.render("books/book", {title: book.title, book: book.toJSON()})
//     : next();
// })
);

// GET NEW BOOK FORM
router.get('/newbook', books.newBookForm
// (req, res) => {
//   console.log('/newbook Get Called');
//   res.render('books/new-book', {book: {}, title: 'New Book'});
// }
);

// POST NEW BOOK THEN SHOW NEW BOOK
router.post('/', books.newBookPost
// asyncHandler(async (req, res) => {
//   console.log('/ New Book Post Route Called');
//   let book;
//   try {
//     book = await Book.create(req.body);
//     res.redirect('/books/' + book.id);
//   } catch(error) {
//     if(error.name === "SequelizeValidationError") {
//       book = await Book.build(req.body);
//       res.render('books/new-book', {book, errors: error.errors, title: 'New Book'})
//     } else {
//       throw error;
//     }
//   }
// })
);

// EDIT BOOK FORM
router.get("/edit/:bookId", books.updateForm
// asyncHandler(async (req, res, next) => {
//   console.log('/edit/:bookId GET Route Called')
//   const book = await Book.findByPk(req.params.bookId);
//   (book)
//     ? res.render('books/update-book', { book, title: 'Edit Book '})
//     : next()
// })
);

//UPDATE BOOK
router.post('/update/:bookId', books.update
//  asyncHandler(async (req, res, next) => {
//   console.log('/edit/:bookID POST Route Called')
//   let book;
//   try {
//     book = await Book.findByPk(req.params.bookId);
//     if(book) {
//       await book.update(req.body);
//       res.redirect('/books/' + book.id);
//     } else {
//       next();
//     }
//   } catch (error) {
//     if(error.name === 'SequelizeValidationError') {
//       console.log('/update/:bookId POST Validation Error Called')
//       book = await Book.build(req.body);
//       book.id = req.params.bookId;
//       res.render('books/update-book', {book, errors: error.errors, title: 'Edit Book'})
//     } else {
//       throw error;
//     }
//   }
// })
);

//DELETE BOOK FORM
//router.get('/delete/:bookId', books.deleteForm
// asyncHandler(async (req, res, next) => {
//   const book = await Book.findByPk(req.params.bookId);
//   (book)
//     ? res.render('books/delete', {book, title: 'Delete Book'})
//     : next();
// })
//);

//DELETE THE BOOK

router.post('/delete/:bookId', books.destroyBook
//  asyncHandler(async (req, res, next) => {
//   const book = await Book.findByPk(req.params.id);
//   (book)
//     ? await book.destroy()
//     : next()
//   res.redirect('/books');
// })
);
module.exports = router;
