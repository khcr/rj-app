var Imagepicker = require("../../../../helpers/imagepicker");
var Observable = require("data/observable").Observable;
var dialogsModule = require("ui/dialogs");

var User = require("../../../../../models/user");

var page;
var user = new User();

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "Image";

  page.bindingContext = new Observable({
    isLoading: false,
    imageUrl: Session.getKey("imageUrl")
  });
  Imagepicker.permission();
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
    page.bindingContext.set("isLoading", true);
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
  } else {
    dialogsModule.alert({
      message: "Veuillez prendre ou sélectionner une photo.",
      okButtonText: "Compris"
    });
  }
}
