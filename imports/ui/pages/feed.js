import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Posts } from '../../api/posts.js';
import { Images } from '../../api/images.js';

import './feed.html';
import '../components/post.js';
import '../components/picture-upload.js';
import '../components/countdown.js';

Template.Feed.onCreated(function FeedOnCreated() {
  const template = this;
  const increment = 30;
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
    return Posts.find().count() >= Template.instance().scrolling.get("limit");
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

    const pictureUpload = Blaze.getView($('.picture-upload')[0]).templateInstance();
    const cameraImage = pictureUpload.upload.get('image');

    let imageId = null;
    if (cameraImage) {
      imageId = Images.insert(cameraImage)._id;
    } else if (image) {
      imageId = Images.insert(image)._id;
    }

    Meteor.call('posts.insert', message, imageId);

    pictureUpload.$('.camera-preview').attr('src', '');
    target.reset();
  },
});

function loadMore(instance, increment) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    instance.scrolling.set("limit", instance.scrolling.get("limit") + increment);
  }
}
