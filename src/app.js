require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
//SERVICES//
const ePantryService = require('./epantry-service');




//ROUTES//
app.get('/epantry', (req,res,next)=>{
  const knexInstance = req.app.get('db')
  ePantryService.getAllIngredients(knexInstance)
    .then(ingredients =>{
      res.json(ingredients)
    })
    .catch(next)
})




const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
//MIDDLEWARE//
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

module.exports = app;