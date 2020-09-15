require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const IngredientsRouter = require('./ingredients/ingredients-router');

//MIDDLEWARE//
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//ROUTES//
app.use('/api/ingredients', IngredientsRouter);

//ERRORS//
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    //basic error on production
    response = { error: { message: 'server error' } };
  } else {
    //more complex error for development
    response = { message: error.message, error };
  }
  console.error(error);
  res.status(500).json(response);
});


module.exports = app;