var Observable = require("data/observable");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var connectivity = require("connectivity");

var Post = require("../../../models/post");

var PostList = new Post.List();

var page, seeMoreTag;

exports.start = function(args) {
  page = args.object;
  page.bindingContext = new Observable.fromObject({
    posts: PostList.items(),
    isAdmin: Session.getKey("isAdmin")
  });
  seeMoreTag = page.getViewById("see-more");

  page.on("navigatedTo", function(){
    loadPosts();
    page.off("navigatedTo");
  });

  page.actionBar.title = "Feed";
};

exports.refresh = function(args) {
  loadPosts();
};

exports.newPost = function() {
  Router.navigateTo("new", "feed/new");
};

exports.toPost = function(e) {
  var postId = e.object.postId;
  var topmost = frameModule.topmost();
  topmost.navigate({ moduleName: "views/pages/base/base", context: { pageName: "show", pagePath: "feed/show", postId: postId }});
};

exports.loadMore = function(args) {
  seeMoreTag.visibility = "collapse"
  page.bindingContext.set("loadingMore", true);
  PostList.load().then(function(res) {
    if(res) {
      seeMoreTag,visibility = "visible";
    }
    page.bindingContext.set("loadingMore", false);
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
        postTag.parent.parent.visibility = "collapse";
      });
    }
  });
};

function loadPosts() {
  seeMoreTag.visibility = "collapse"
  var connectionType = connectivity.getConnectionType();
  if (connectionType == connectivity.connectionType.none) {
    dialogsModule.alert({
      message: "Pas de connexion internet",
      okButtonText: "Compris"
    });
  } else {
    PostList.empty();
    page.bindingContext.set("isLoading", true);
    PostList.load().then(function() {
      page.bindingContext.set("isLoading", false);
      seeMoreTag.visibility = "visible"
    });
  }
}
