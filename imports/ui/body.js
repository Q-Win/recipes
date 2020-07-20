import { Template } from 'meteor/templating';
import { Recipes } from '../api/recipes.js';

import './body.html';

Template.body.helpers({
  recipes() {
      return Recipes.find({});
    },
});
