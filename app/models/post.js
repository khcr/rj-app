var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var Upload = require("./upload");

function Post(params) {

    params = params || {};

    var viewModel = new Observable({
        id: params.id || null,
        message: params.message || "",
        author: params.author || "",
        imageId: params.imageId || null,
        lastComment: params.lastComment || "",
        comments: params.comments || []
    });

    viewModel.save = function() {
      var post = this;

      upload = new Upload(post.imageField);
      task = upload.save();

      var promise = new Promise(function(resolve, reject) {

        task.on("error", function(e) {
          // TODO: dialogs
        });
        task.on("responded", function(e) {

          var response = JSON.parse(e.data);
          http.request({
            url: config.apiUrl + "posts.json",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
              post: { message: post.message, image_id: response.id },
              remember_token: Session.getKey("rememberToken")
            })
          }).then(function(res) { resolve(res); }, function (e) {
            reject(e);
          });
        });
      });

      return promise;

    }

    return viewModel;
}

/* List */

Post.List = function() {

  var viewModel =  new ObservableArray();

  viewModel.all = function() {
    return http.getJSON(config.apiUrl + "posts.json").then(function(res) {
      res.forEach(function(post) {
        viewModel.push(post);
      });
    }, function(e) {
      console.log(e);
    });
  };

  viewModel.empty = function() {
    while (viewModel.length) {
      viewModel.pop();
    }
  };

  return viewModel;

}

Post.find = function(id) {
  return http.getJSON(config.apiUrl + "posts/" + id + ".json").then(function(res) {
    return new Post(res);
  }, function (e) {
    console.log(e);
  });
}
/* */

module.exports = Post;
