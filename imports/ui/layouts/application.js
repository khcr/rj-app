import { Template } from 'meteor/templating';

import './application.html'

Template.ApplicationLayout.helpers({
  attributes(route) {
    let className;
    if (Router.current().route.path() === route) { className = "current"; }
    return {
      class: className
    };
  }
});
