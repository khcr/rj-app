var frameModule = require("ui/frame");

var page;

exports.start = function(args) {

  page = args.object;
  page.bindingContext = {
    isSignedIn: Session.getKey("isSignedIn")
  }
};

var toAccount = function() {
  if(Session.getKey("isSignedIn")) {
    Router.navigateTo("account", "user/account");
  } else {
    Router.navigateTo("signin", "user/signin");
  }
}
exports.toAccount = toAccount;

exports.toTips = function() {
  Router.navigateTo("tips");
};

exports.toAbout = function() {
  Router.navigateTo("about");
};

exports.toMap = function () {
  Router.navigateTo("map");
};
