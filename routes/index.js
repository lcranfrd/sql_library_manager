var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('/ Route Called');
  res.redirect('/books/page/1');
});

module.exports = router;
