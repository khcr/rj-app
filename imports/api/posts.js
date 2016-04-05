import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publish('posts', function postsPublication(limit) {
    return Posts.find({}, { sort: { createdAt: -1 }, limit: limit });
  });
}

Meteor.methods({
  'posts.insert'(message) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      message,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(),
    });
  },
});
