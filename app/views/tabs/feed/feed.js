var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var connectivity = require("connectivity");

var Dialogs = require("../../../helpers/dialogs");
var HelperFunctions = require("../../../helpers/helper_functions");
var Post = require("../../../models/post");

var PostList = new Post.List();

var page, posts, seeMoreTag;

exports.start = function(args) {

  page = args.object;

  posts = PostList.items();

  page.bindingContext = new observableModule.fromObject({
    posts: posts,
    isAdmin: Session.getKey("isAdmin")
  });

  seeMoreTag = page.getViewById("see-more");

  page.on("navigatedTo", function(){
    loadPosts();
    page.off("navigatedTo");
  });
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
      seeMoreTag.visibility = "visible";
    }
    page.bindingContext.set("loadingMore", false);
  });
};

exports.editPost = function(e) {
  var postTag = e.object.parent.parent.getViewById("post");
  var text = postTag.text;
  var id = postTag.postId;
  Dialogs.update(text).then(function(r) {
    if(r.text.trim() === "") {
      Dialogs.error("Entrez un message");
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
  Dialogs.delete("ce post").then(function(result) {
    if(result) {
      Post.delete(id).then(function() {
        var indexOfPost = HelperFunctions.findByIdInArray(posts, id);
        posts.splice(indexOfPost, 1);
      });
    }
  });
};

function loadPosts() {
  seeMoreTag.visibility = "collapse"
  var connectionType = connectivity.getConnectionType();
  if (connectionType == connectivity.connectionType.none) {
    Dialogs.no_internet();
  } else {
    PostList.empty();
    page.bindingContext.set("isLoading", true);
    PostList.load().then(function() {
      page.bindingContext.set("isLoading", false);
      seeMoreTag.visibility = "visible"
    });
  }
}
