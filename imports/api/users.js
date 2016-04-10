import { Meteor } from 'meteor/meteor';

import { Images } from './images.js';

if (Meteor.isServer) {
  Meteor.publishComposite('userData', {
    find() {
      return Meteor.users.find({ _id: this.userId }, { limit: 1, fields: { profile: 1, isAdmin: 1, username: 1 }});
    },
    children: [
      {
        find(user) {
          return Images.find({ _id: user.profile.imageId }, { limit: 1 });
        }
      }
    ]
  });
}

Meteor.users.helpers({
  image() {
    return Images.findOne({ _id: this.profile.imageId });
  }
});
