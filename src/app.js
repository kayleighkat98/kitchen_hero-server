require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const IngredientsRouter = require('./ingredients/ingredients-router');
//const {CLIENT_ORIGIN} = require('./config');

//MIDDLEWARE//
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption));
app.use(helmet());


  var whitelist = ['http://localhost:3000', 'https://kitchen-hero.kayleighkat98.vercel.app', 'https://kitchen-hero.vercel.app']
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }


  app.use(cors(corsOptions));


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