var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var User = require("../../../models/user");

var page;

var user = new User();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user;
};

exports.signUp = function() {
  var genderIndex = page.getViewById("gender").selectedIndex;
  user.setGender(genderIndex);
  user.signUp().catch(function(e) {
    dialogsModule.alert({
      message: e.join("\r\n"),
      okButtonText: "OK"
    });
    return Promise.reject();
  }).then(function(res) {
    var topmost = frameModule.topmost();
    topmost.navigate("views/user/signin/signin");
  });

}
