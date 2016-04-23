import { Testimonies } from '../../api/testimonies.js';

import './testimonies.html';

import { Template } from 'meteor/templating';

Template.Testimonies.onCreated(function TestimoniesOnCreated() {
  Meteor.subscribe('testimonies');
});

Template.Testimonies.helpers({
  testimonies() {
    return Testimonies.find();
  },
});
