require('dotenv').config()
const { expect } = require("chai")
const IngredientsService = require('../src/ingredients/ingredients-service')
const knex = require('knex')
const app = require('../src/app')

describe.only (`Ingredients Endpoints`, function () {
    let db

    before(() => {
        db = knex ({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    before('clean the table', () => db('ingredients').truncate())

    after('disconnect from db', () => db.destroy())
    
    context('Given there are ingredients in the database',() => {
      const testIngredients = [
        {   
            ingredient_id : 1,
            user_id: 1,
            name : 'Apples',
            expiration_date: null,
            quantity: '20',
            quantity_type: 'pounds'
        },
        {   
            ingredient_id : 2,
            user_id: 1,
            name : 'Soda',
            expiration_date: '2000-11-05',
            quantity: '2',
            quantity_type: 'liters'
        },
        {
            ingredient_id : 3,
            user_id: 1,
            name : 'Grapes',
            expiration_date: '2030-10-07',
            quantity: '10',
            quantity_type: 'ounces'
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