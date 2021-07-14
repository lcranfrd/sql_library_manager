'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // static associate(models) {

    // }
  };

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{msg: "'title' cannot be null"},
        notEmpty: {msg: 'You Forgot the Title: You Really Need It!'}
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "'author' cannot be null"},
        notEmpty: {msg: 'You Forgot the Author\s Name: You Need to Enter It!'}
      }
    },
    genre: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    }
  },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};