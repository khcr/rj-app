var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");

var User = require("../../../models/user");

var page;

var pageData = new Observable({
  firstname: Session.getKey("firstname"),
  lastname: Session.getKey("lastname"),
  email: Session.getKey("email")
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
};

exports.signOut = function() {
  User.signOut();
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/feed");
};
