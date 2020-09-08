require('dotenv').config()
const { expect } = require("chai")
const ePantryService = require('../src/epantry-service')
const knex = require('knex')
const app = require('../src/app')

describe.only (`ePantry service object`, function () {
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
    //BEFORE EACH//
    beforeEach(() => {
        return db 
            .into('epantry')
            .insert(testIngredients)
    })
    //BEFORE//
    before(() => {
        db = knex ({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })
    before('clean the table', () => db('epantry').truncate())

    //AFTER//
    after('disconnect from db', () => db.destroy())
    //TESTS//
    it('GET /epantry responds with 200 and all of the articles', () => {
        return supertest(app)
            .get('/epantry')
            .expect(200)
        // TODO: add more assertions about the body
    })
})