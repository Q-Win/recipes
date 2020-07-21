import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Ingredients = new Mongo.Collection('ingredients');
Ingredients.attachSchema(new SimpleSchema({
  name: {
    type: String,
    min: 1}
}

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('ingredients', function ingredientsPublication() {
    return Ingredients.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
