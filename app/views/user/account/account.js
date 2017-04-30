var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");

var User = require("../../../models/user");

var page;

exports.loaded = function(args) {

  var pageData = {
    firstname: Session.getKey("firstname"),
    lastname: Session.getKey("lastname"),
    email: Session.getKey("email")
  };

  page = args.object;
  page.bindingContext = pageData;
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
  var topmost = frameModule.topmost();
  topmost.navigate({ moduleName: "views/feed/feed", clearHistory: true });
};
