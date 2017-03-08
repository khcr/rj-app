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

exports.toAccount = function() {
  var topmost = frameModule.topmost();
  if(Session.getKey("isSignedIn")) {
    topmost.navigate({ moduleName: "views/user/account/account", animated: true });
  } else {
    topmost.navigate({ moduleName: "views/user/signin/signin", animated: true });
  }
}
