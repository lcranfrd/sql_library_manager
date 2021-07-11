var express = require('express');
var router = express.Router();
const {books} = require('./cruds');


// GET All BOOKS
router.get('/', books.list);

//GET SINGLE BOOK
router.get("/:bookId", books.book);

// GET NEW BOOK FORM
router.get('/newbook', books.newBookForm);

// POST NEW BOOK THEN SHOW NEW BOOK
router.post('/', books.newBookPost);

// EDIT BOOK FORM
router.get("/edit/:bookId", books.updateForm);

//UPDATE BOOK
router.post('/update/:bookId', books.update);

//DELETE THE BOOK
router.post('/delete/:bookId', books.destroyBook);
module.exports = router;