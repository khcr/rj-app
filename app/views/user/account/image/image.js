var Imagepicker = require("../../../../helpers/imagepicker");
var Observable = require("data/observable").Observable;
var dialogsModule = require("ui/dialogs");

var User = require("../../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = new Observable({
    isLoading: false,
    imageUrl: Session.getKey("imageUrl")
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
    user.saveImage().catch(function (e) {
      page.bindingContext.set("isLoading", false);
      dialogsModule.alert({
        message: e.join("\r\n"),
        okButtonText: "OK"
      });
      return Promise.reject();
    }).then(function(res) {
      dialogsModule.alert({
        message: "Image mise à jour.",
        okButtonText: "OK"
      });
      var imageTag = page.getViewById("preview");
      imageTag.imageSource = null;
      var imageTag = page.getViewById("profile");
      imageTag.src = res.imageUrl;
      page.bindingContext.set("isLoading", false);
    });
  }
}
