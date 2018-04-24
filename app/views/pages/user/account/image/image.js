var Imagepicker = require("../../../../../helpers/imagepicker");
var observableModule = require("data/observable");

var Dialogs = require("../../../../../helpers/dialogs");
var User = require("../../../../../models/user");

var page;
var user = new User();

var pageData = observableModule.fromObject({
  isLoading: false,
  imageSrc: null
});

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "Image";

  page.bindingContext = pageData;
  page.bindingContext.set("imageUrl", Session.getKey("imageUrl"));

  Imagepicker.permission();
};

exports.selectImage = function() {
  Imagepicker.select().then(function(res) {
    page.bindingContext.set("imageSrc", res.source);
    user.set("imageField", res.path);
  });
}

exports.takeImage = function() {
  Imagepicker.take().then(function(res) {
    page.bindingContext.set("imageSrc", res.source);
    user.set("imageField", res.path);
  });
}

exports.updateImage = function() {
  if(user.get("imageField") !== undefined) {
    page.bindingContext.set("isLoading", true);
    user.saveImage().catch(function (e) {
      page.bindingContext.set("isLoading", false);
      Dialogs.error(e.join("\r\n"));
      return Promise.reject();
    }).then(function(res) {
      Dialogs.success("Image mise à jour.");
      page.bindingContext.set("imageSrc", null);
      page.bindingContext.set("imageUrl", res.imageUrl);
      page.bindingContext.set("isLoading", false);
    });
  } else {
    Dialogs.error("Veuillez prendre ou sélectionner une photo.");
  }
}
