var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");

var Imagepicker = require("../../../helpers/imagepicker");
var Post = require("../../../models/post");

var page;
var post = new Post();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = post;
  page.bindingContext.set("isLoading", false);

  Imagepicker.permission();
};

exports.newPost = function() {
  page.bindingContext.set("isLoading", true);
  var message = post.get("message");

  if(message.trim() === "") {
    dialogsModule.alert({
      message: "Entrez un message",
      okButtonText: "Compris"
    });
    page.bindingContext.set("isLoading", false);
    return;
  }

  post.save().then(function() {
    page.bindingContext.set("isLoading", false);
    post.set("message", "");
    var topmost = frameModule.topmost();
    topmost.navigate("views/feed/feed");
  });

}

exports.selectImage = function() {
  Imagepicker.select().then(function(res) {
    var imageTag = page.getViewById("preview");
    imageTag.imageSource = res.source;
    post.set("imageField", res.path);
  });

}

exports.takeImage = function() {
  Imagepicker.take().then(function(res) {
    var imageTag = page.getViewById("preview");
    imageTag.imageSource = res.source;
    post.set("imageField", res.path);
  });

}
