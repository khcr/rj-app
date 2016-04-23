import { Template } from 'meteor/templating';

import { Testimonies } from '../../../api/testimonies.js';

import './testimonies.html';

Template.UsersTestimonies.onCreated(function UsersTestimoniesOnCreated() {
  Meteor.subscribe('testimonies', false);
});

Template.UsersTestimonies.helpers({
  testimonies() {
    return Testimonies.find();
  },
});

Template.UsersTestimonies.events({
  'click .validate-testimony'() {
    Meteor.call('testimony.validate', this._id);
  },
});
