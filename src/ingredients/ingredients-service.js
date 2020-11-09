const IngredientsService = {
    getUsersIngredients(knex, user_id) {
        return knex
            .select('*')
            .from('ingredients')
            .where('ingredients.user_id', user_id)
    },

    list(knex) {
        return knex.select('*').from('ingredients')
    },
    
    getMeasurments(knex){
        return knex
            .select('quantity_type')
            .from('ingredients')
    },

    getExpired(knex, user_id){
        return knex 
            .select ('*')
            .from ('ingredients')
            .where('ingredients.user_id', user_id)
            .andWhere ('expiration_date', '<=', new Date())//LIMITS ONLY EXPIRED
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