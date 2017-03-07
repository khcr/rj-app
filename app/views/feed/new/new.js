var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;

var Post = require("../../../models/post");

var page;
var post = new Post();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = post;
};

exports.newPost = function() {
  var message = page.bindingContext.get("message");

  if(message.trim() === "") {
    dialogsModule.alert({
      message: "Enter a message",
      okButtonText: "OK"
    });
    return;
  }

  post.save();
  page.bindingContext.set("message", "");

  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/feed");
}
