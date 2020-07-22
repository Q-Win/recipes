import { Recipes } from '../../api/recipes.js';
import { Ingredients } from '../../api/ingredients.js';

Recipes.addLinks({
    'ingredients': {
        type: 'many',
        collection: Ingredients,
        field: 'ingredientIds',
    }
})

Ingredients.addLinks({
    'recipes': {
        collection: Recipes,
        inversedBy: 'ingredients'
    }
})
