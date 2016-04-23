import { Testimonies } from '../../api/testimonies.js';

import './testimonies.html';

import { Template } from 'meteor/templating';

Template.Testimonies.onCreated(function TestimoniesOnCreated() {
  Meteor.subscribe('testimonies', true);
});

Template.Testimonies.helpers({
  testimonies() {
    return Testimonies.find();
  },
});

Template.Testimonies.events({
  'submit .new-testimony'(event) {

    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const content = target.content.value;

    Meteor.call('testimony.insert', name, content);

    target.reset();
  },
});
