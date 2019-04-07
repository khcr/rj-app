var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var utilityModule = require("utils/utils");

var Dialogs = require("../../../helpers/dialogs");
var User = require("../../../models/user");

var page;
var user = new User();

exports.onNavigatingTo = function(args) {
  page = args.object;

  page.bindingContext = observableModule.fromObject({
    user: user,
    isLoading: false
  });
};

exports.signIn = function() {
  page.bindingContext.set("isLoading", true);
  user.signIn().catch(function(e) {
    Dialogs.error("Email ou/et mot de passe incorrect. Réessayer.")
    page.bindingContext.set("isLoading", false);
    return Promise.reject();
  }).then(function() {
    page.frame.goBack();
  });
}

exports.toSignUp = function() {
  page.frame.navigate("views/user/signup/signup");
}
