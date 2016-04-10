import { Template } from 'meteor/templating';

Template.body.onCreated(function bodyOnCreated() {
  Deps.autorun(function() {
    Meteor.subscribe('userData');
  });
});
