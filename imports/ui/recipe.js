import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Recipes } from '../api/recipes.js';
import { Ingredients } from '../api/ingredients.js';
import { createQuery } from 'meteor/cultofcoders:grapher'

import './recipe.html';

Template.recipe.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
  
    allIngredients() {
          return Ingredients.find({});
        },
  });

Template.recipe.events({

  'click .delete'() {
     Meteor.call('recipes.remove', this._id);
  },

  'submit .add-ingredient-to-recipe'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const ingredient = target.ingredient.value;
    Meteor.call('recipes.add-ingredient',this._id,ingredient);
  },
});

window.Recipes = Recipes;
