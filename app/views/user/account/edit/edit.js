var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var User = require("../../../../models/user");

var page, user, genderPicker;

exports.loaded = function(args) {
  page = args.object;
  genderPicker = page.getViewById("gender");

  User.find(Session.getKey("rememberToken")).then(function(res) {
    user = res;
    page.bindingContext = user;
    genderPicker.selectedIndex = res.getGenderIndex(user.gender);

    page.bindingContext.set("isLoading", false);
  });

};

exports.updateAccount = function() {
  page.bindingContext.set("isLoading", true);
  var genderIndex = page.getViewById("gender").selectedIndex;
  user.setGender(genderIndex);
  user.update().catch(function(e) {
    page.bindingContext.set("isLoading", false);
    dialogsModule.alert({
      message: e.join("\r\n"),
      okButtonText: "OK"
    });
    return Promise.reject();
  }).then(function(res) {
    page.bindingContext.set("isLoading", false);
    dialogsModule.alert({
      message: "Mise à jour effectuée.",
      okButtonText: "OK"
    });
    var topmost = frameModule.topmost();
    topmost.navigate("views/user/account/account");
  });
};
