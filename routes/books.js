var express = require('express');
var router = express.Router();
const {books} = require('./cruds');

//GET PAGE # OF BOOKS
router.get('/page/:pageId', books.list)

// GET UPDATE BOOK FORM
router.get("/:bookId", books.updateForm);

// POST UPDATE BOOK THEN SHOW PAGE 1 BOOKS
router.post('/:bookId', books.update);

// GET NEW BOOK FORM
router.get('/new', books.newBookForm);

// POST NEW BOOK THEN SHOW NEW BOOK
router.post('/new', books.newBookPost);

//POST SEARCH BOOKS

router.post('/search', books.searchBooks);

//DELETE THE BOOK
router.post('/delete/:bookId', books.destroyBook);

module.exports = router;

//GET SINGLE BOOK
// router.get("/book/:bookId", books.book);