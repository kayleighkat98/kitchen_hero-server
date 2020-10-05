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
            connection: process.env.TEST_DATABASE_URL,
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
              name : 'Apples',
              quantity: '20',
          },

          {   
              add_date: '2020-09-04',
              ingredient_id : 2,
              name : 'Soda',
              quantity: '2',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 3,
              name : 'Grapes',
              quantity: '10',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 4,
              name : 'Baking Powder',
              quantity: '5',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 5,
              name : 'Carrots',
              quantity: '6',
          },
          {
              add_date: '2020-09-04',
              ingredient_id : 6,
              name : 'Tangerine',
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