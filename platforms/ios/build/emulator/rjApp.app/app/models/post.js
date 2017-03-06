var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

function Post(params) {

    params = params || {};

    var viewModel = new Observable({
        message: params.message || ""
    });

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
      throw Error();
    });
  };

  return viewModel

}
/* */

module.exports = Post;
