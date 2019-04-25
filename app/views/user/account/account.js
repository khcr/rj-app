var User = require("../../../models/user");

var page;

exports.onNavigatingTo = function(args) {

  page = args.object;
  page.bindingContext = {
    firstname: Session.getKey("firstname"),
    lastname: Session.getKey("lastname"),
    email: Session.getKey("email")
  };;
};

exports.toEdit = function() {
  page.frame.navigate("views/user/account/edit/edit");
}

exports.toImage = function() {
  page.frame.navigate("views/user/account/image/image");
}

exports.signOut = function() {
  User.signOut();
  page.frame.goBack();
};
