require('dotenv').config()
const { expect } = require("chai")
const IngredientsService = require('../src/ingredients-service')
const knex = require('knex')
const app = require('../src/app')

describe.only (`Ingredients Endpoints`, function () {
    let db
  //BEFORE//
    before(() => {
        db = knex ({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })
    before('clean the table', () => db('ingredients').truncate())
  //AFTER//
    after('disconnect from db', () => db.destroy())
  //TESTS//
    context('Given ther are ingredients in the database',() => {
      
      const testIngredients = [
          {   
              add_date: '2020-09-04',
              ingredient_id : 1,
              ingredient : 'Apples',
              quantity: '20',
          },

          {   
              add_date: '2020-09-04',
              ingredient_id : 2,
              ingredient : 'Soda',
              quantity: '2',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 3,
              ingredient : 'Grapes',
              quantity: '10',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 4,
              ingredient : 'Baking Powder',
              quantity: '5',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 5,
              ingredient : 'Carrots',
              quantity: '6',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 6,
              ingredient : 'Tangerine',
              quantity: '1',
          }
      ];
      beforeEach(() => {
        return db 
            .into('ingredients')
            .insert(testIngredients)
      })
      it('GET /ingredients responds with 200 and all of the articles', () => {
        return supertest(app)
            .get('/ingredients')
            .expect(200, testIngredients)
        // TODO: add more assertions about the body
    })
    })
})