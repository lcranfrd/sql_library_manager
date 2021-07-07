var express = require('express');
var router = express.Router();
const {Book} = require('../models');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('/ Route Called');
  res.redirect('/books');
});

module.exports = router;
