var page;

exports.onNavigatingTo = function(args) {
  page = args.object;
  page.bindingContext = {
    isSignedIn: Session.getKey("isSignedIn")
  }
};

var toAccount = function() {
  if(Session.getKey("isSignedIn")) {
    page.frame.navigate("views/user/account/account");
  } else {
    page.frame.navigate("views/user/signin/signin");
  }
}
exports.toAccount = toAccount;

exports.toTips = function(e) {
  page.frame.navigate("views/tips/tips");
};

exports.toAbout = function() {
  page.frame.navigate("views/about/about");
};

exports.toMap = function () {
  page.frame.navigate("views/map/map");
};
