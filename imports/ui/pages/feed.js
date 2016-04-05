import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './feed.html';
import '../components/post.js';

Template.Feed.onCreated(function bodyOnCreated() {
  Meteor.subscribe('posts');
});


Template.Feed.helpers({
  posts() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  },
});

Template.Feed.events({
  'submit .new-post'(event) {

    event.preventDefault();

    const target = event.target;
    const message = target.message.value;

    Meteor.call('posts.insert', message);

    target.reset();
  },
});
