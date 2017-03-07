var frameModule = require("ui/frame");

var BackButton = require("../../helpers/back_button");
var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = {
    isSignedIn: Session.getKey("isSignedIn")
  }

  new BackButton(page).hide();
};

exports.toLogin = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/user/signin/signin");
};

exports.toAccount = function() {
  var topmost = frameModule.topmost();
  if(Session.getKey("isSignedIn")) {
    topmost.navigate("views/user/account/account");
  } else {
    topmost.navigate("views/user/signin/signin");
  }
}
