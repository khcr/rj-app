var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");

var User = require("../../../../models/user");

var page;

exports.loaded = function(args) {

  page = args.object;
  page.bindingContext = {
    firstname: Session.getKey("firstname"),
    lastname: Session.getKey("lastname"),
    email: Session.getKey("email")
  };;

  page.actionBar.title = "Compte";
};

exports.toEdit = function() {
  Router.navigateTo("edit", "user/account/edit");
}

exports.toImage = function() {
  Router.navigateTo("image", "user/account/image");
}

exports.signOut = function() {
  User.signOut();
  var topmost = frameModule.topmost();
  topmost.navigate({ moduleName: "views/tabs/base/base", context: { reload: true }, clearHistory: true });
};
