import { Template } from 'meteor/templating';

import './signup.html';

Template.Signup.events({
  'submit .register'(event) {

    if (! Meteor.userId() || ! Meteor.user().isAdmin) {
      throw new Meteor.Error('not-authorized');
    }

    event.preventDefault();

    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    const pwdConfirmation = target.pwdConfirmation.value;

    if (pwdConfirmation !== password) {
      FlashMessages.sendError("Les mots de passe ne correspondent pas");
      return
    }

    Accounts.createUser({username, password, profile: {}}, function(error) {
      if(error){
        FlashMessages.sendError("Veuillez remplir correctement les champs");
      } else {
        FlashMessages.sendSuccess("Compte créé");
        Router.go("/");
      }
    });
  }
});
