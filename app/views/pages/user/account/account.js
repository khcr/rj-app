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
  var topmost = frameModule.topmost();
  topmost.navigate("views/user/account/edit/edit");
}

exports.toImage = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/user/account/image/image");
}

exports.signOut = function() {
  User.signOut();
  Router.navigateTo("signin", "user/signin", { clearHistory: true });
};
