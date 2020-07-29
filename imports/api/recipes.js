import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


export const Recipes = new Mongo.Collection('recipes');
const Schemas = {};
Schemas.Recipe = new SimpleSchema({
  name: {
    type: String,
    min: 1},
  instructions: {
    type: String,
    min: 5,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 2,
        class: "foo"
      }
    }
  },
  owner: {
    type: String,
    min: 1,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  username: {
    type: String,
    min: 1,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  ingredientIds: {
    type: Array,
    autoform: {
      type: "hidden"
    },
    optional: true
    },

    "ingredientIds.$": {
    type: String
    },

  },
    { tracker: Tracker })

Recipes.attachSchema(Schemas.Recipe)

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('recipes', function recipesPublication() {
    return Recipes.find({
    });
  });
}


Meteor.methods({
  'recipes.insert'(doc) {
    const { name, instructions } = doc
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
  'recipes.add-ingredient'(recipeId, ingredientId){
    _id = recipeId
    modifier = {
        $addToSet: {
            ingredientIds: ingredientId
        }
    }
    Recipes.update(_id, modifier)
    // Recipes.update(recipeId, { $set: { private: setToPrivate } });
  },


});
