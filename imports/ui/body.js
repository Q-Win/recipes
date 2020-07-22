import { Template } from 'meteor/templating';
import { Recipes } from '../api/recipes.js';
import { Ingredients } from '../api/ingredients.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';


import './ingredient.js';
import './recipe.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('recipes');
    Meteor.subscribe('ingredients');
  });

Template.body.helpers({
  recipes() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
        // If hide completed is checked, filter tasks
        return Recipes.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      }
      return Recipes.find({}, { sort: { createdAt: -1 } });
    },
    ingredients() {
          return Ingredients.find({});
        },
});

Template.body.events({
    'submit .new-recipe'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const name = target.recipe.value;
      const instructions = target.instructions.value

      // Insert a task into the collection
       Meteor.call('recipes.insert', name, instructions);

      // Clear form
      target.recipe.value = '';
      target.instructions.value = '';
    },
    'change .hide-completed input'(event, instance) {
      instance.state.set('hideCompleted', event.target.checked);
  },
});
