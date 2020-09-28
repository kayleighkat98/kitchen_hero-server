require('dotenv').config()
const { expect } = require("chai")
const IngredientsService = require('../src/ingredients/ingredients-service')
const knex = require('knex')

describe (`Ingredients service object`, function () {
    let db
    //SAMPLE
    let testIngredients = [
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