const IngredientsService = {
    list(knex) {
        return knex.select('*').from('ingredients')
    },
    
    insert(knex, newIngredient) {
        return knex
          .insert(newIngredient)
          .into('ingredients')
          .returning('*')
          .then(rows => {
            return rows[0]
        })
    },
    
    findById(knex, ingredient_id) {
        return knex
          .from('ingredients')
          .select('*')
          .where({ingredient_id})
          .first('*')
    },
    delete(knex, ingredient_id) {
        return knex('ingredients')
          .where({ ingredient_id })
          .delete()
    },
    updateIngredient(knex, ingredient_id, newIngredientFields) {
        return knex('ingredients')
          .where({ ingredient_id })
          .update(newIngredientFields)
      },

}

module.exports = IngredientsService