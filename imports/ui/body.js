import { Template } from 'meteor/templating';
import { Recipes } from '../api/recipes';
import { Ingredients } from '../api/ingredients.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import { createQuery } from 'meteor/cultofcoders:grapher'


import './ingredient.js';
import './recipe.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('recipes');
    Meteor.subscribe('ingredients');
  });

//These are the methods my templates calls in with the {{}}
Template.body.helpers({
  recipes() {
      const instance = Template.instance();
      if (instance.state.get('showMyRecipes')) {
        // return Recipes.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } });
        const query = Recipes.createQuery({
           owner: Meteor.userId()
        });
        return query.fetch();
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
  'submit .new-ingredient'(event){
    event.preventDefault();

    const target = event.target
    const name = target.ingredient.value

    Meteor.call('ingredients.insert', name);

    target.ingredient.value = '';
  },
  'change .show-my-recipes'(event, instance) {
    instance.state.set('showMyRecipes', event.target.checked);
  },
});
