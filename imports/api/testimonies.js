import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Validator } from '../lib/validator.js'

export const Testimonies = new Mongo.Collection('testimonies');

if (Meteor.isServer) {
  Meteor.publish('testimonies', function testimoniesPublication(isValid) {
    return Testimonies.find({ isValid: isValid });
  });
}

Meteor.methods({
  'testimony.insert'(name, content) {

    Validator.isNotEmptyString(name);
    Validator.isNotEmptyString(content);

    Testimonies.insert({
      name,
      content,
      isValid: false,
      createdAt: new Date()
    });

  },
  'testimony.validate'(testimonyId) {
    Testimonies.update(testimonyId, { $set: { isValid: true } });
  },
  'testimony.delete'(testimonyId) {
    Testimonies.remove(testimonyId);
  }
});
