const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
  });
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'kay',
      name: 'kayleigh',
      password: 'pass',
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      password: 'password',
    },
  ]
}

/**
 * generate fixtures of ingredients for a given user
 * @param {object} user - contains `id` property
 * @returns {Array(ingredients)} - array of ingredients
 */
function makeIngredients(user) {
  const ingredients = [
    {   
        ingredient_id : 1,
        user_id: user.id,
        name : 'Apples',
        expiration_date: null,
        quantity: 20,
        quantity_type: 'pounds'
    },
    {   
        ingredient_id : 2,
        user_id: user.id,
        name : 'Soda',
        expiration_date: '2000-11-05',
        quantity: 2,
        quantity_type: 'liters'
    },
    {
        ingredient_id : 3,
        user_id: user.id,
        name : 'Grapes',
        expiration_date: '2030-10-07',
        quantity: 10,
        quantity_type: 'ounces'
    }
  ]
  return ingredients
}

/**
 * make a bearer token with jwt for authorization header
 * @param {object} user - contains `id`, `username`
 * @param {string} secret - used to create the JWT
 * @returns {string} - for HTTP authorization header
 */
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        "ingredients",
        "user"`
      )
  )
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.transaction(async trx => {
    await trx.into('user').insert(preppedUsers)
  })
}

/**
 * seed the databases with ingredients 
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @param {array} ingredients - array of ingredients objects for insertion
 * @returns {Promise} - when all tables seeded
 */
async function seedUsersIngredients(db, users, ingredients) {
  await seedUsers(db, users)

  await db.transaction(async trx => {
    await trx.into('ingredients').insert(ingredients)
  })
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeIngredients,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  seedUsersIngredients,
}
