const path = require('path');
const express = require('express');
const IngredientsService = require('./ingredients-service');
const IngredientsRouter = express.Router();
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');
const xss = require('xss')
const uuid = require
const { requireAuth } = require("../middleware/jwt-auth");
const e = require('cors');
const serializeIngredients = ingredient => ({//RUN XSS ON NECESARY FIELDS
  ingredient_id: ingredient.ingredient_id,
  name: xss(ingredient.name),
  expiration_date: ingredient.expiration_date,
  quantity: ingredient.quantity,
  quantity_type: ingredient.quantity_type
});
IngredientsRouter.use(requireAuth).route('/')//ROUTES FOR INGREDIENTS
  .get((req, res, next) => {//GET ALL INGREDIENTS
    const knexInstance = req.app.get('db');
    IngredientsService.getUsersIngredients(knexInstance,req.user.id)
      .then(ingredients => {
        res.json(ingredients.map(serializeIngredients));
      })
      .catch(next);
  })
  .post(jsonParser, async (req, res, next) => {//POST AN INGREDIENT
    const db = req.app.get('db');
    const { user_id, name, expiration_date, quantity, quantity_type} = req.body;
    let newIngredient = {user_id, name, expiration_date, quantity, quantity_type};

    for (const [key, value] of Object.entries(newIngredient)) {
     if (!value && key !== {expiration_date} ) {
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
IngredientsRouter.use(requireAuth).route('/expired')//ROUTES FOR EXPIRED ONLY INGREDIENTS
  .get((req,res, next) =>{//GET ALL EXPIRED
    const knexInstance = req.app.get('db');
    IngredientsService.getExpired(knexInstance,req.user.id)
      .then(types=> {
        res.json(types);
      })
      .catch(next);
  })
;
IngredientsRouter.route('/:ingredient_id')//ROUTES FOR INDIVIDUAL INGREDIENTS
  .all((req, res, next) => {//FIND INGREDIENT
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
  .get((req, res, next) => {//GET INGREDIENT
    res.json(serializeIngredients(res.ingredients));
  })
  .delete(async (req, res, next) => {//DELETE INGREDIENT
    try {
      await IngredientsService.delete(req.app.get('db'), req.params.ingredient_id);
      res.status(200).json(`sucessfully deleted ingredient`);
    } catch(err) {
      next(err);
    }
  });
module.exports = IngredientsRouter;
