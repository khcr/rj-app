import './testimonies.html';

import { Template } from 'meteor/templating';

Template.Testimonies.onCreated(function TestimoniesOnCreated() {
  Meteor.subscribe('testimonies');
});
