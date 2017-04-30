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

exports.signUp = function() {
  page.bindingContext.set("isLoading", true);
  var genderIndex = page.getViewById("gender").selectedIndex;
  user.setGender(genderIndex);
  user.signUp().catch(function(e) {
    page.bindingContext.set("isLoading", false);
    dialogsModule.alert({
      message: e.join("\r\n"),
      okButtonText: "OK"
    });
    return Promise.reject();
  }).then(function(res) {
    page.bindingContext.set("isLoading", false);
    var topmost = frameModule.topmost();
    dialogsModule.alert({
      message: "Nouveau compte créé, tu peux te connecter.",
      okButtonText: "OK"
    });
    topmost.navigate("views/user/signin/signin");
  });

}
