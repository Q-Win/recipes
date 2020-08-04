import { createQuery } from 'meteor/cultofcoders:grapher'
import { Meteor } from 'meteor/meteor';

export default userRecipes = Recipes.createQuery({
  $filters: {
       owner: Meteor.userId(),
   },
   name: 1,
   instructions: 1,
});
