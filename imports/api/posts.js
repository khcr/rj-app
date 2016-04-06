import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Images } from './images.js';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publishComposite('posts', function(limit) {
    return {
      find() {
        return Posts.find({}, { sort: { createdAt: -1 }, limit: limit });
      },
      children: [{
        find(post) {
          return Images.find({ _id: post.imageId }, { limit: 1 });
        },
      }],
    };
  });
}

Meteor.methods({
  'posts.insert'(message, imageId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      message,
      imageId,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(),
    });
  },
});

Posts.helpers({
  image() {
    return Images.findOne({ _id: this.imageId });
  }
});
