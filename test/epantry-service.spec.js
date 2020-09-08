require('dotenv').config()
const { expect } = require("chai")
const ePantryService = require('../src/epantry-service')
const knex = require('knex')

describe (`ePantry service object`, function () {
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
            quantity: '20',
        },
        {
            add_date: '2020-09-04',
            ingredient_id : 3,
            ingredient : 'Grapes',
            quantity: '20',
        },
        {
            add_date: '2020-09-04',
            ingredient_id : 4,
            ingredient : 'Baking Powder',
            quantity: '20',
        },
        {
            add_date: '2020-09-04',
            ingredient_id : 5,
            ingredient : 'Carrots',
            quantity: '20',
        },
        {
            add_date: '2020-09-04T05:00:00.000Z',
            ingredient_id : 6,
            ingredient : 'Tangerine',
            quantity: '20',
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
            .into('epantry')
            .insert(testIngredients)
    })
    //AFTER//
    afterEach(() => db.destroy())
    //TESTS//
    it (`resolves all ingredients from epantry`, () =>{
        return ePantryService.getAllIngredients(db)
            .then(actual => { //expect to fail because data is different
                expect(actual).to.eql(testIngredients)
            })
    })
})