import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Ingredients } from '../api/ingredients.js';

import './ingredient.html';



Template.ingredient.events({

});

window.Ingredients = Ingredients;
