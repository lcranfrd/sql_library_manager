var express = require('express');
var router = express.Router();
const {books} = require('./cruds');

//GET PAGE # OF BOOKS
router.get('/page/:pageId', books.list)

// GET NEW BOOK FORM
router.get('/new', books.newBookForm);

// POST NEW BOOK THEN SHOW NEW BOOK
router.post('/new', books.newBookPost);

// GET UPDATE BOOK FORM
router.get("/:id", books.updateForm);

// POST UPDATE BOOK THEN SHOW PAGE 1 BOOKS
router.post('/:id', books.update);

//POST SEARCH BOOKS
router.post('/search', books.searchBooks);

//DELETE THE BOOK
router.post('/:id/delete', books.destroyBook);

module.exports = router;