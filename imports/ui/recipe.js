import { Template } from 'meteor/templating';

import { Recipes } from '../api/recipes.js';

import './recipe.html';

Template.recipe.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Recipes.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Recipes.remove(this._id);
  },
});
