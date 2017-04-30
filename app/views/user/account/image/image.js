var Imagepicker = require("../../../../helpers/imagepicker");
var Observable = require("data/observable").Observable;

var User = require("../../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = new Observable( {isLoading: false} );

  User.find(Session.getKey("rememberToken")).then(function(user) {
    console.log(user.imageUrl);
    page.bindingContext.set("imageUrl", user.imageUrl);
  });
};

exports.selectImage = function() {
  Imagepicker.select().then(function(res) {
    var imageTag = page.getViewById("preview");
    imageTag.imageSource = res.source;
    user.set("imageField", res.path);
  });

}

exports.takeImage = function() {
  Imagepicker.take().then(function(res) {
    var imageTag = page.getViewById("preview");
    imageTag.imageSource = res.source;
    user.set("imageField", res.path);
  });

}

exports.updateImage = function() {
  page.bindingContext.set("isLoading", true);
  if(user.get("imageField") !== undefined) {
    user.saveImage().then(function(res) {
      var imageTag = page.getViewById("preview");
      imageTag.imageSource = null;
      var imageTag = page.getViewById("profile");
      imageTag.imageSource = res.source;
      page.bindingContext.set("isLoading", false);
    });
  }
}
