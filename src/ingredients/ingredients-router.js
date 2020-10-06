const path = require('path');
const express = require('express');
const IngredientsService = require('./ingredients-service');
const IngredientsRouter = express.Router();
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');
const xss = require('xss')
const uuid = require

const serializeIngredients = ingredient => ({
  ingredient_id: ingredient.ingredient_id,
  name: xss(ingredient.name),
  add_date: ingredient.add_date.toString(),
  expiration_date: ingredient.add_date.toString(),
  quantity: xss(ingredient.quantity),
  quantity_type: ingredient.quantity_type
});



IngredientsRouter
  .route('/')
  .get((req, res, next) => {//get ingredients
    const knexInstance = req.app.get('db');
    IngredientsService.list(knexInstance)
      .then(ingredients => {
        res.json(ingredients.map(serializeIngredients));
      })
      .catch(next);
  })
  .post(jsonParser, async (req, res, next) => {
    const db = req.app.get('db');
    const { name, quantity, quantity_type, expiration_date} = req.body;
    let newIngredient = {name, quantity, quantity_type, expiration_date};

    for (const [key, value] of Object.entries(newIngredient)) {
      if (value === null) {
        return next({status: 400, message: `Missing '${key}' in request body`});
      }
    }

    newIngredient = sanitizeFields(newIngredient);
    try {
      const ingredients = await IngredientsService.insert(db, newIngredient);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/:${ingredients.ingredient_id}`))
        .json(ingredients);
    } catch(err){
      next(err);
    }
  })
;
IngredientsRouter
  .route('/expired')
  .get((req,res, next) =>{
    const knexInstance = req.app.get('db');
    IngredientsService.getExpired(knexInstance)
      .then(types=> {
        res.json(types);
      })
      .catch(next);
  })
;
IngredientsRouter
  .route('/:ingredient_id')
  .all((req, res, next) => {
    IngredientsService.findById(req.app.get('db'), req.params.ingredient_id)
      .then(ingredients => {
        if (!ingredients) {
          return res.status(404).json({
            error: { message: 'No matching ingredients' }
          });
        }
        res.ingredients = ingredients;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeIngredients(res.ingredients));
  })
  .delete(async (req, res, next) => {
    try {
      await IngredientsService.delete(req.app.get('db'), req.params.ingredient_id);
      res.status(200).json({});
    } catch(err) {
      next(err);
    }
  })


module.exports = IngredientsRouter;
