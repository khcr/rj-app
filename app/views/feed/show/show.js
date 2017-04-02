var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var dialogsModule = require("ui/dialogs");

var Post = require("../../../models/post");
var Comment = require("../../../models/comment");

var page, post, comment, comments;

exports.loaded = function(args) {
  page = args.object;

  var postId = page.navigationContext.postId;
  comment = new Comment({ postId: postId });

  page.bindingContext = new Observable({
    comment: comment,
    isSignedIn: Session.getKey("isSignedIn")
  });

  Post.find(postId).then(function(res) {
    post = res;
    comments = new ObservableArray(post.comments)
    page.bindingContext.set("post", res);
    page.bindingContext.set("comments", comments);
  });
};

exports.newComment = function() {

  var message = comment.get("message");

  if(message.trim() === "") {
    dialogsModule.alert({
      message: "Enter a message",
      okButtonText: "OK"
    });
    return;
  }

  comment.save().then(function(res) {
    comments.unshift(res);
    comment.set("message", "");
  });
};

exports.editComment = function(e) {
  var commentTag = e.object.parent.getViewById("comment");
  var text = commentTag.text;
  var id = commentTag.commentId;
  dialogsModule.prompt({
    title: "Edit",
    okButtonText: "Save",
    cancelButtonText: "Cancel",
    defaultText: text,
    inputType: dialogsModule.inputType.text
  }).then(function(r) {
      if(r.result) {
        var comment = new Comment({ message: r.text, id: id });
        comment.update().then(function(res) {
          commentTag.text = r.text;
        });
      }
  });
};
