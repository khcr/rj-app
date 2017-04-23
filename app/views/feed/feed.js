var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");

var BackButton = require("../../helpers/back_button");
var Post = require("../../models/post");

var PostList = new Post.List();

var page, postsView;

var pageData = new observableModule.fromObject({
    posts: PostList,
    isLoading: true
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  page.bindingContext.set("isAdmin", Session.getKey("isAdmin"));

  pageData.set("isLoading", true);
  PostList.empty();
  PostList.load().then(function() {
    pageData.set("isLoading", false);
  });

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

exports.updateMessage = function(args) {
  labelLineHeight(args.object);
}

function labelLineHeight(nsLabel) {

  if (page.ios) {
    var label = nsLabel.ios;

    var attributedString;
    if (label.atributedText) {
      attributedString = label.atributedText;
    } else {
      attributedString = NSMutableAttributedString.alloc().initWithString(label.text);
    }

    var paragraphStyle = NSMutableParagraphStyle.alloc().init();
    paragraphStyle.lineSpacing = 55;
    var range = { location: 0, length: label.text.length };
    attributedString.addAttributeValueRange(NSParagraphStyleAttributeName, paragraphStyle, range);
    label.attributedText = attributedString;
  }
  if (page.android) {
    var label = nsLabel.android;

    //Default spacing is 20% of text size
    //setLineSpacing(add,multiplyby);
    label.setLineSpacing(14, 1);
  }
}

exports.editPost = function(e) {
  var postTag = e.object.parent.getViewById("post");
  var text = postTag.text;
  var id = postTag.postId;
  dialogsModule.prompt({
    title: "Edit",
    okButtonText: "Save",
    cancelButtonText: "Cancel",
    defaultText: text,
    inputType: dialogsModule.inputType.text
  }).then(function(r) {
    if(r.text.trim() === "") {
      dialogsModule.alert({
        message: "Enter a message",
        okButtonText: "OK"
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
  dialogsModule.confirm("Do you really want to delete this post ?").then(function(result) {
    if(result) {
      Post.delete(id).then(function() {
        postTag.parent.parent.parent.visibility = "collapse";
      });
    }
  });

};
