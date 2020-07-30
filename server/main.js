import { Meteor } from 'meteor/meteor';
import '../imports/api/recipes.js';
import '../imports/api/ingredients.js';

Meteor.startup(() => {

  // code to run on server at startup
  Meteor.publish('recipes.user', function userRecipesPublication() {
    const query = Recipes.createQuery({
      $filters: {
           owner: Meteor.userId(),
       },
       name: 1,
       instructions: 1,
    });
    return query.fetch();
  });

});
