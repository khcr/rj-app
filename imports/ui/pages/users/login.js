import { Template } from 'meteor/templating';

import './login.html';

Template.Login.events({
  'submit .login'(event) {

    event.preventDefault();

    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password, function(error) {
      if(error){
        FlashMessages.sendError("Identifiants incorrects");
      } else {
        Router.go("/");
      }
    });

  }
});
