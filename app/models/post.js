var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

function Post(params) {

    params = params || {};

    var viewModel = new Observable({
        message: params.message || ""
    });

    viewModel.save = function() {
      return http.request({
        url: config.apiUrl + "posts",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          post: { message: this.message },
          remember_token: Session.getKey("rememberToken")
        })
      }).then(function(res) {}, function (e) {
        console.log(e);
      });
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
      })
    }, function(e) {
      console.log(e);
    });
  };

  viewModel.empty = function() {
    while (viewModel.length) {
      viewModel.pop();
    }
  };

  return viewModel

}
/* */

module.exports = Post;
