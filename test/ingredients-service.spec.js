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
     * @description Get Ingredients for a user
     **/
    describe(`GET /api/ingredients`, () => {
       
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
            expect(res.body[0].ingredient_id).to.eql(1)
            expect(res.body[0]).to.have.property('expiration_date').to.eql(null)
            });
        }); 
    });
    /**
     * @description Get Expired Ingredients for a user
     **/
    describe(`GET /api/ingredients/expired`, () => {
       
        beforeEach("insert users and ingredients", () => {
        return helpers.seedUsersIngredients(
            db, 
            testUsers,
            testIngredients
        );
        });

        it(`responds with 200 and user's ingredients`, () => {
        return supertest(app)
            .get(`/api/ingredients/expired`)
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect((res) => {
            expect(res.body).to.be.a('array');
            expect(res.body[0]).to.have.property('expiration_date').to.eql('2000-11-05')
            });
        }); 
    });
    /**
     * @description Submit a new ingredient
     **/
    describe(`POST /api/ingredients`, () => {

        beforeEach("insert users and ingredients", () => {
            return helpers.seedUsersIngredients(
                db,
                testUsers
            );
            });

        it(`responds with 400 required error when data is missing`, () => {
        const postBody = {
            test: 'test',
        };

        return supertest(app)
            .post(`/api/ingredients`)
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .send(postBody)
            .expect({
                message: "Missing 'user_id' in request body",
                error: { status: 400, message: "Missing 'user_id' in request body" }
            });
        });
    })
    /**
     * @description Delete a ingredient
     **/
    describe(`DELETE /api/ingredients`, () => {

        beforeEach("insert users and ingredients", () => {
            return helpers.seedUsersIngredients(
                db,
                testUsers,
                testIngredients
            );
        });

        it(`responds with 400 required error when data is missing`, () => {

        return supertest(app)
            .delete(`/api/ingredients/1`)
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect((res) => {
                expect(res.body).to.be.a('string');
                expect(res.body).to.eql('sucessfully deleted ingredient')
                });
        });
    })
});