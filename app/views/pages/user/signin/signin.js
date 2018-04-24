var frameModule = require("ui/frame");
var observableModule = require("data/observable");

var Dialogs = require("../../../../helpers/dialogs");
var User = require("../../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "Signin";

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
    var topmost = frameModule.topmost();
    topmost.navigate({ moduleName: "views/tabs/base/base", context: { reload: true }, clearHistory: true });
  });
}

exports.toSignUp = function() {
  Router.navigateTo("signup", "user/signup")
}
