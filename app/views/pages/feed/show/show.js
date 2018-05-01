var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

var Dialogs = require("../../../../helpers/dialogs");
var HelperFunctions = require("../../../../helpers/helper_functions");
var Post = require("../../../../models/post");
var Comment = require("../../../../models/comment");

var page, post, comment, comments;

exports.loaded = function(args) {

  page = args.object;

  page.actionBar.title = "Post";

  var postId = page.navigationContext.postId;
  comment = new Comment({ postId: postId });

  page.bindingContext = new observableModule.fromObject({
    post: new Post(),
    comment: comment,
    isSignedIn: Session.getKey("isSignedIn"),
    isLoading: true
  });

  Post.find(postId).then(function(res) {
    post = res;
    comments = new ObservableArray(post.comments)
    page.bindingContext.set("post", res);
    page.bindingContext.set("comments", comments);
    page.bindingContext.set("isLoading", false);
  });
};

exports.newComment = function() {

  var message = comment.get("message");

  if(message.trim() === "") {
    Dialogs.error("Entrez un message");
    return;
  }

  page.getViewById("new-comment").dismissSoftInput();

  comment.save().then(function(res) {
    comments.unshift(res);
    comment.set("message", "");
  });
};

exports.editComment = function(e) {
  var commentTag = e.object.parent.parent.getViewById("comment");
  var text = commentTag.text;
  var id = commentTag.commentId;
  Dialogs.update(text).then(function(r) {
    if(r.text.trim() === "") {
      Dialogs.error("Entrez un message");
    } else if(r.result) {
      var comment = new Comment({ message: r.text, id: id });
      comment.update().then(function(res) {
        commentTag.text = r.text;
      });
    }
  });
};

exports.deleteComment = function(e) {
  var commentTag = e.object;
  var id = commentTag.commentId;
  Dialogs.delete("ce commentaire").then(function(result) {
    if(result) {
      Comment.delete(id).then(function() {
        var indexOfComment = HelperFunctions.findByIdInArray(comments, id);
        comments.splice(indexOfComment, 1);
      });
    }
  });

};
