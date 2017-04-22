var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var User = require("../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user;
  page.bindingContext.set("isLoading", false);
};

exports.signIn = function() {
  page.bindingContext.set("isLoading", true);
  user.signIn().catch(function(e) {
    dialogsModule.alert({
      message: "Unfortunately we could not find your account.",
      okButtonText: "OK"
    });
    page.bindingContext.set("isLoading", false);
    return Promise.reject();
  }).then(function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/feed/feed");
  });
}

exports.toSignUp = function() {
  var topmost = frameModule.topmost();
  topmost.navigate({ moduleName: "views/user/signup/signup", animated: true });
}
