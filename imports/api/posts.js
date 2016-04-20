import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Validator } from '../lib/validator.js'

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

    Validator.isNotEmptyString(message);

    Posts.insert({
      message,
      imageId,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(),
    });

    const notificationMessage = message.substring(0, 40) + '...';

    Push.send({
      from: Meteor.user().username,
      title: 'RJ: Nouveau message !',
      text: notificationMessage,
      badge: 1,
      query: {}
    });
  },
  'posts.remove'(postId) {
    check(postId, String);

    if (! Meteor.userId() || ! Meteor.user().isAdmin) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.remove(postId);
  },
});

Posts.helpers({
  image() {
    return Images.findOne({ _id: this.imageId });
  },
  user() {
    return Meteor.users.findOne({ _id: this.owner });
  },
  date() {
    return moment(this.createdAt).fromNow();
  }
});
