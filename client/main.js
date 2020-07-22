import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';
import { Recipes } from '../imports/api/recipes.js';
import '../imports/api/ingredients.js';

Template.insertRecipeForm.helpers({
  recipes(){
    return Recipes;
  }
});
