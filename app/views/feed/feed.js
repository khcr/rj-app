var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var scrollEvent = require("ui/scroll-view").ScrollView.scrollEvent;

var BackButton = require("../../helpers/back_button");
var Post = require("../../models/post");

var PostList = new Post.List();

var page, postsView;

var pageData = new observableModule.fromObject({
    posts: PostList,
    state: Post.State
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  page.bindingContext.set("isAdmin", Session.getKey("isAdmin"));

  PostList.empty();
  PostList.load();

  new BackButton(page).hide();

  postsView = page.getViewById("posts");
  // postsView.addEventListener(scrollEvent, loadMore); TODO
};

exports.refresh = function() {
  PostList.empty();
  PostList.load();
};


exports.newPost = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/new/new");
}

exports.toPost = function(e) {
  var postId = e.object.postId;
  var topmost = frameModule.topmost();
  topmost.navigate({moduleName: "views/feed/show/show", context: { postId: postId }});
}

var loadMore = function(e) {
  if((e.object.scrollableHeight - 20) <= e.scrollY) {
    postsView.removeEventListener(scrollEvent, loadMore);
    PostList.load().then(function() {
      postsView.addEventListener(scrollEvent, loadMore);
    });
  }
}
