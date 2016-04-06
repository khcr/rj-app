import { Meteor } from 'meteor/meteor';

import { Images } from './images.js';

Meteor.users.helpers({
  image() {
    return Images.findOne({ _id: this.profile.imageId });
  }
});
