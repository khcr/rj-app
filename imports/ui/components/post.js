import { Template } from 'meteor/templating';

import './post.html';

Template.post.events({
  'click .delete-post'() {
    Meteor.call('posts.remove', this._id);
  },
});
