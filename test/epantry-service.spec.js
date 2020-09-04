require('dotenv').config()
const { expect } = require("chai")
const ePantryService = require('../src/epantry-service')
const knex = require('knex')

describe.only (`ePantry service object`, function () {
    let db
    //SAMPLE
    let testIngredients = [
        {   
            ingredient : 'Apples',
            add_date: '2020-08-31',
            quantity: '20',
        },
        {
            ingredient : 'Soda',
            add_date: '2020-06-20',
            quantity: '20',
        },
        {
            ingredient : 'Grapes',
            add_date: '2020-05-05',
            quantity: '20',
        },
        {
            ingredient : 'Baking Powder',
            add_date: '2020-04-05',
            quantity: '20',
        },
        {
            ingredient : 'Carrots',
            add_date: '2020-03-05',
            quantity: '20',
        },
        {
            ingredient : 'Tangerine',
            add_date: '2020-02-05',
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
    after(() => db.destroy())
    //TESTS//
    it (`resolves all ingredients from epantry`, () =>{
        return ePantryService.getAllIngredients(db)
            .then(actual => { //expect to fail because data is different
                expect(actual).to.eql(testIngredients)
            })
    })
})