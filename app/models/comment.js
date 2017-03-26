var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;

function Comment(params) {

  params = params || {};

  var viewModel = new Observable({
      id: params.id || null,
      message: params.message || "",
      author: params.author || "",
      postId: params.postId || null
  });

  viewModel.save = function() {
    return http.request({
      url: config.apiUrl + "comments.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        comment: { message: this.message, post_id: this.postId },
        remember_token: Session.getKey("rememberToken")
      })
    }).then(function(res) {
      var result = res.content.toJSON();
      if(res.statusCode !== 200) { throw result.errors; }
      return result;
    }, function(e) {
      console.log(e);
    });
  }

  return viewModel;

}

module.exports = Comment;
