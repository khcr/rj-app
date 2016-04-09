import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Posts } from '../../api/posts.js';
import { Images } from '../../api/images.js';

import './feed.html';
import '../components/post.js';
import '../components/picture-upload.js';

Template.Feed.onCreated(function bodyOnCreated() {
  const template = this;
  const increment = 20;
  template.scrolling = new ReactiveDict();
  template.scrolling.set('limit', increment);

  Deps.autorun(function() {
    Meteor.subscribe('posts', template.scrolling.get('limit'));
  });

  window.addEventListener("scroll", function() {
    loadMore(template, increment);
  });
});

Template.Feed.helpers({
  posts() {
    return Posts.find({}, { sort: { createdAt: -1 }});
  },
  hasMoreResults() {
    return hasMoreResults(Template.instance());
  },
  images() {
    return Images.find();
  },
});

Template.Feed.events({
  'submit .new-post'(event) {

    event.preventDefault();

    const target = event.target;
    const message = target.message.value;
    const image = target.image.files[0];

    let imageId = null;
    if (image) {
      imageId = Images.insert(image)._id;
    }

    Meteor.call('posts.insert', message, imageId);

    target.reset();
  },
});

function hasMoreResults(instance) {
  return Posts.find().count() >= instance.scrolling.get("limit");
}

function loadMore(instance, increment) {
  if (hasMoreResults(instance) && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    instance.scrolling.set("limit", instance.scrolling.get("limit") + increment);
  }
}
