var frameModule = require("ui/frame");
var observableModule = require("data/observable");

var Dialogs = require("../../../../helpers/dialogs");
var Imagepicker = require("../../../../helpers/imagepicker");
var Post = require("../../../../models/post");

var page, imageTag;
var post = new Post();

var pageData = observableModule.fromObject({
  post: post,
  isLoading: false,
  imageSrc: null
});

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "Nouveau";

  page.bindingContext = pageData

  Imagepicker.permission();
};

exports.newPost = function() {
  page.bindingContext.set("isLoading", true);
  var message = post.get("message");

  if(message.trim() === "") {
    Dialogs.error("Entrez un message");
    page.bindingContext.set("isLoading", false);
    return;
  }

  post.save().then(function() {
    page.bindingContext.set("isLoading", false);
    post.set("message", "");
    page.bindingContext.set("imageSrc", null);
    var topmost = frameModule.topmost();
    topmost.navigate({ moduleName: "views/tabs/base/base", context: { reload: true }});
  });

}

exports.selectImage = function() {
  Imagepicker.select().then(function(res) {
    page.bindingContext.set("imageSrc", res.source);
    post.set("imageField", res.path);
  });

}

exports.takeImage = function() {
  console.log("START PAGE");
  Imagepicker.take().then(function(res) {
    console.dir(res)
    page.bindingContext.set("imageSrc", res.source);
    post.set("imageField", res.path);
  });

}
