require('dotenv').config()
const { expect } = require("chai")
const IngredientsService = require('../src/ingredients-service')
const knex = require('knex')

describe (`Ingredients service object`, function () {
    let db
    //SAMPLE
    let testIngredients = [
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
    ]
    //BEFORE//
    before(() => {
        db = knex ({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    before(() => {
        return db 
            .into('ingredients')
            .insert(testIngredients)
    })
    //AFTER//
    afterEach(() => db.destroy())
    //TESTS//
    it (`resolves all ingredients from ingredients`, () =>{
        return IngredientsService.getAllIngredients(db)
            .then(actual => { //expect to fail because data is different
                expect(actual).to.eql(testIngredients)
            })
    })
})