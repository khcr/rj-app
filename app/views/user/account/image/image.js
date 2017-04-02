var Imagepicker = require("../../../../helpers/imagepicker");
var User = require("../../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;
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
  if(user.get("imageField") !== undefined) {
    user.saveImage().then(function(res) {
      var imageTag = page.getViewById("profile");
      imageTag.imageSource = res.source;
    });
  }
}
