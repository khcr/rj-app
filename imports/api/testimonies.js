import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Validator } from '../lib/validator.js'

export const Testimonies = new Mongo.Collection('testimonies');

if (Meteor.isServer) {
  Meteor.publish('testimonies', function testimoniesPublication() {
    return Testimonies.find();
  });
}

Meteor.methods({
  'testimony.insert'(name, content) {

    Validator.isNotEmptyString(name);
    Validator.isNotEmptyString(content);

    Testimonies.insert({
      name,
      content,
      createdAt: new Date()
    });

  }
});
