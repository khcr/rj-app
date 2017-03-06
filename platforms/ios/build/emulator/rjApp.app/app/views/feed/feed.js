var observableModule = require("data/observable");
var frameModule = require("ui/frame");

var Post = require("../../models/post");

var PostList = new Post.List()

var page;

var pageData = new observableModule.fromObject({
    posts: PostList
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  PostList.all();
};

exports.newPost = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/new/new");
}
