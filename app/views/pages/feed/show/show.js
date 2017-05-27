var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var dialogsModule = require("ui/dialogs");

var Post = require("../../../../models/post");
var Comment = require("../../../../models/comment");

var page, post, comment, comments;

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "Post";

  var postId = page.navigationContext.postId;
  comment = new Comment({ postId: postId });

  page.bindingContext = new Observable({
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
    dialogsModule.alert({
      message: "Entrez un message",
      okButtonText: "Compris"
    });
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
  dialogsModule.prompt({
    title: "Modifier",
    okButtonText: "Enregistrer",
    cancelButtonText: "Annuler",
    defaultText: text,
    inputType: dialogsModule.inputType.text
  }).then(function(r) {
    if(r.text.trim() === "") {
      dialogsModule.alert({
        message: "Entrez un message",
        okButtonText: "Compris"
      });
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
  dialogsModule.confirm({
    title: "Confirmation",
    message: "Supprimer ce commentaire ?",
    cancelButtonText: "Annuler",
    okButtonText: "Confirmer"
  }).then(function(result) {
    if(result) {
      Comment.delete(id).then(function() {
        commentTag.parent.parent.visibility = "collapse";
      });
    }
  });

};
