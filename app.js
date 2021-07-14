const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { error404, internalError } = require('./routes/errors');
const routes = require('./routes/index');
const books = require('./routes/books');
const {sequelize} = require('./models/index.js')

const app = express();

(async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database Synced on Start')
  } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
)();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/books', books);
app.use(error404);
app.use(internalError);

module.exports = app;