import { Meteor } from 'meteor/meteor';

import { Images } from './images.js';

if (Meteor.isServer) {
  Meteor.publish('userData', function() {
    return Meteor.users.find({ _id: this.userId }, { fields: { isAdmin: 1 }});
  });
}

Meteor.users.helpers({
  image() {
    return Images.findOne({ _id: this.profile.imageId });
  }
});
