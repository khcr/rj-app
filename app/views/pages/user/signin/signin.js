var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var User = require("../../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "Signin";

  page.bindingContext = user;
  page.bindingContext.set("isLoading", false);
};

exports.signIn = function() {
  page.bindingContext.set("isLoading", true);
  user.signIn().catch(function(e) {
    dialogsModule.alert({
      message: "Nous n'avons pas pu trouvé votre compte.",
      okButtonText: "Compris"
    });
    page.bindingContext.set("isLoading", false);
    return Promise.reject();
  }).then(function() {
    var topmost = frameModule.topmost();
    topmost.navigate({ moduleName: "views/feed/feed", clearHistory: true });
  });
}

exports.toSignUp = function() {
  var topmost = frameModule.topmost();
  topmost.navigate({ moduleName: "views/user/signup/signup", animated: true });
}
