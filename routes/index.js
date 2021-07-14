/**========================================================================
 * *                                index.js
 *   
 *   base routes '/' and '/books are defined.
 *
 *========================================================================**/

'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('/ Route Called');
  res.redirect('/books/page/1');
});

router.get('/books', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
