import { Template } from 'meteor/templating';
import { Recipes } from '../api/recipes.js';

import './recipe.js';
import './body.html';

Template.body.helpers({
  recipes() {
      return Recipes.find({}, { sort: { createdAt: -1 } });
    },
});

Template.body.events({
    'submit .new-recipe'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const name = target.recipe.value;

      // Insert a task into the collection
      Recipes.insert({
        name,
        createdAt: new Date(), // current time
      });

      // Clear form
      target.recipe.value = '';
    },
  });
