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
      children: [
        {
          find(post) {
            return Images.find({ _id: post.imageId }, { limit: 1 });
          },
        },
        {
          find(post) {
            return Meteor.users.find({ _id: post.owner }, { limit: 1, fields: { profile: 1 } });
          },
          children: [
            {
              find(user, post) {
                return Images.find({ _id: user.profile.imageId }, { limit: 1 })
              },
            },
          ],
        },
      ],
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
  },
  user() {
    return Meteor.users.findOne({ _id: this.owner })
  }
});
