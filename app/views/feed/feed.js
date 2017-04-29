var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var colorModule = require("color");

var BackButton = require("../../helpers/back_button");
var Post = require("../../models/post");

var PostList = new Post.List();

var page;

var pageData = new observableModule.fromObject({
  posts: PostList.items(),
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  pageData.set("isAdmin", Session.getKey("isAdmin"));

  pageData.set("isLoading", true);
  PostList.load().then(function() {
    pageData.set("isLoading", false);
  });

  new BackButton(page).hide();
};

exports.refresh = function(args) {
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/feed");
};


exports.newPost = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/new/new");
};

exports.toPost = function(e) {
  var postId = e.object.postId;
  var topmost = frameModule.topmost();
  topmost.navigate({moduleName: "views/feed/show/show", context: { postId: postId }});
};

exports.loadMore = function(args) {
  PostList.load().then(function(res) {
    args.object.notifyLoadOnDemandFinished()
    if(!res) {
      args.object.loadOnDemandMode = "None";
    }
  });
};

exports.editPost = function(e) {
  var postTag = e.object.parent.parent.getViewById("post");
  var text = postTag.text;
  var id = postTag.postId;
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
      var post = new Post({ message: r.text, id: id });
      post.update().then(function(res) {
        postTag.text = r.text;
      });
    }
  });
};

exports.deletePost = function(e) {
  var postTag = e.object;
  var id = postTag.postId;
  dialogsModule.confirm({
    title: "Confirmation",
    message: "Supprimer ce post ?",
    cancelButtonText: "Annuler",
    okButtonText: "Confirmer"
  }).then(function(result) {
    if(result) {
      Post.delete(id).then(function() {
        postTag.parent.parent.parent.visibility = "collapse";
      });
    }
  });
};
