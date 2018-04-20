var config = require("../config");

var http = require("http");
var observableModule = require("data/observable");

function Comment(params) {

  params = params || {};

  var viewModel = new observableModule.fromObject({
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
        comment: { message: this.get("message"), post_id: this.get("postId") },
        remember_token: Session.getKey("rememberToken")
      })
    }).then(function(res) {
      var result = res.content.toJSON();
      if(res.statusCode !== 200) { throw result.errors; }
      return result;
    }, function(e) {
      console.log(e);
    });
  };

  viewModel.update = function() {
    return http.request({
      url: config.apiUrl + "comments/" + this.get("id") + ".json",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        comment: { message: this.get("message") },
        remember_token: Session.getKey("rememberToken")
      })
    }).then(function(res) {
      var result = res.content.toJSON();
      if(res.statusCode !== 200) { throw result.errors; }
      return result;
    }, function(e) {
      console.log(e);
    });
  };

  return viewModel;

}


/* List */

Comment.delete = function(id) {
  var token = Session.getKey("rememberToken");
  return http.request({
    url: config.apiUrl + "comments/" + id + ".json?remember_token=" + token,
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  }).then(function(res) {
    var result = res.content.toJSON();
    if(res.statusCode !== 200) { throw result.errors; }
    return result;
  }, function (e) {
    console.log(e);
  });
}


/* /*/

module.exports = Comment;
