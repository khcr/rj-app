var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var scrollEvent = require("ui/scroll-view").ScrollView.scrollEvent;

var BackButton = require("../../helpers/back_button");
var Post = require("../../models/post");

var PostList = new Post.List()

var page, postsView;

var pageData = new observableModule.fromObject({
    posts: PostList
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  page.bindingContext.set("isAdmin", Session.getKey("isAdmin"));

  PostList.empty();
  PostList.load();

  new BackButton(page).hide();
};

exports.refresh = function(args) {
  PostList.empty();
  PostList.load().then(function() {
    args.object.notifyPullToRefreshFinished();
  });
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
