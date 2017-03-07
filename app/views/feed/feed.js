var observableModule = require("data/observable");
var frameModule = require("ui/frame");

var BackButton = require("../../helpers/back_button");
var Post = require("../../models/post");

var PostList = new Post.List()

var page;

var pageData = new observableModule.fromObject({
    posts: PostList
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  page.bindingContext.set("isAdmin", Session.getKey("isAdmin"));

  PostList.empty();
  PostList.all();

  new BackButton(page).hide();
};

exports.newPost = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/new/new");
}
