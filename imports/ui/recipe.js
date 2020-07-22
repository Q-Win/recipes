import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Recipes } from '../api/recipes.js';

import './recipe.html';

Template.recipe.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
    Recipes(){
      return Recipes;
    }
  });

Template.recipe.events({
  
  'click .delete'() {
     Meteor.call('recipes.remove', this._id);
  },
});

window.Recipes = Recipes;
