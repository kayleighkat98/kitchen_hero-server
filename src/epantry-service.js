const ePantryService = {
    getAllIngredients(knex) {
        return knex.select('*').from('epantry')
    }
}

module.exports = ePantryService