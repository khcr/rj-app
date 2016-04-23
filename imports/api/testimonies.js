import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Testimonies = new Mongo.Collection('testimonies');

if (Meteor.isServer) {
  Meteor.publish('testimonies', function testimoniesPublication() {
    return Testimonies.find();
  });
}

Meteor.methods({
  'testimony.insert'(name, message) {

  }
});
