import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


export const Recipes = new Mongo.Collection('recipes');
Recipes.attachSchema(new SimpleSchema({
  name: {
    type: String,
    min: 1},
  instructions: {
    type: String,
    min: 5},
  owner: {
    type: String,
    min: 1},
  username: {
    type: String,
    min: 1}},  
    { tracker: Tracker }))


if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('recipes', function recipesPublication() {
    return Recipes.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = 'validation-error';
  ddpError.details = error.details;
  return ddpError;
});

// const myMethodObjArgSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1},
//   instructions: {
//     type: String,
//     min: 1}
//   },
//   { check }
// );

Meteor.methods({
  'recipes.insert'(name, instructions) {
    check(name, String);
    check(instructions, String)
    // myMethodObjArgSchema.validate({name: name, instructions: instructions});
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Recipes.insert({
      name,
      instructions,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'recipes.remove'(recipeId) {
    check(recipeId, String);

    const recipe = Recipes.findOne(recipeId);
    if (recipe.owner !== this.userId) {
     // If the task is private, make sure only the owner can delete it
     throw new Meteor.Error('not-authorized');
    }

    Recipes.remove(recipeId);
  },
  'recipes.setChecked'(recipeId, setChecked) {
    check(recipeId, String);
    check(setChecked, Boolean);

    const recipe = Recipes.findOne(recipeId);
    if (recipe.private && recipe.owner !== this.userId) {
      // If the recipe is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Recipes.update(recipeId, { $set: { checked: setChecked } });
  },

  'recipes.setPrivate'(recipeId, setToPrivate) {
    check(recipeId, String);
    check(setToPrivate, Boolean);

    const recipe = Recipes.findOne(recipeId);

    // Make sure only the recipe owner can make a recipe private
    if (recipe.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Recipes.update(recipeId, { $set: { private: setToPrivate } });
  },
});
