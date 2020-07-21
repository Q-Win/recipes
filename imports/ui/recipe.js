import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Recipes } from '../api/recipes.js';

import './recipe.html';

Template.recipe.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
  });

Template.recipe.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('recipes.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
     Meteor.call('recipes.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('recipes.setPrivate', this._id, !this.private);
},
});
