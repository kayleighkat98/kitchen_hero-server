require('dotenv').config()
const { expect } = require("chai")
const IngredientsService = require('../src/ingredients/ingredients-service')
const knex = require('knex')
const app = require('../src/app')
const { test } = require('mocha')
const helpers = require("./test-helpers");

describe (`Ingredients Endpoints`, function () {
    let db
    const testUsers = helpers.makeUsersArray();
    const [testUser] = testUsers;
    const [...testIngredients] = helpers.makeIngredients(testUser);
    
    before("make knex instance", () => {
        db = helpers.makeKnexInstance();
        app.set("db", db);
    });
    
    after("disconnect from db", () => db.destroy());

    before("cleanup", () => helpers.cleanTables(db));
  
    afterEach("cleanup", () => helpers.cleanTables(db));
    
    /**
     * @description Get languages for a user
     **/
    describe(`GET /api/ingredients`, () => {
        const [userIngredients] = testIngredients.filter(
            (item) => item.user_id === testUser.id
        );
       
        beforeEach("insert users and ingredients", () => {
        return helpers.seedUsersIngredients(
            db,
            testUsers,
            testIngredients
        );
        });

        it(`responds with 200 and user's ingredients`, () => {
        return supertest(app)
            .get(`/api/ingredients`)
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect((res) => {
            expect(res.body).to.be.a('array');
            });
        }); 
    });
})