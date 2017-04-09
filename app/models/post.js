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

      if (post.get("imageField") === undefined) {

        return http.request({
          url: config.apiUrl + "posts.json",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify({
            post: { message: post.get("message") },
            remember_token: Session.getKey("rememberToken")
          })
        }).then(function(res) {
          var result = res.content.toJSON();
          if(res.statusCode !== 200) { throw result.errors; }
          return result;
        }, function (e) {
          console.log(e);
        });

      } else {

        var upload = new Upload(post.get("imageField"));
        var task = upload.save();

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
                post: { message: post.get("message"), image_id: response.id },
                remember_token: Session.getKey("rememberToken")
              })
            }).then(function(res) {
              var result = res.content.toJSON();
              if(res.statusCode !== 200) { throw result.errors; }
              resolve(result);
            }, function (e) {
              reject(e);
            });
          });
        });

        return promise;
      }

    };

    viewModel.update = function() {
      return http.request({
        url: config.apiUrl + "posts/" + this.get("id") + ".json",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          post: { message: this.get("message") },
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

Post.List = function() {

  var viewModel =  new ObservableArray();

  viewModel.pageNumber = 1;

  viewModel.load = function() {
    var token = Session.getKey("rememberToken");
    return http.getJSON(config.apiUrl + "posts.json?page=" + this.pageNumber + "&remember_token=" + token).then(function(res) {
      if(!res.length) {
        return false;
      }
      viewModel.pageNumber++;
      res.forEach(function(post) {
        viewModel.push(post);
      });
      return viewModel;
    }, function(e) {
      console.log(e);
    });
  };

  viewModel.empty = function() {
    this.pageNumber = 1;
    while (this.length) {
      this.pop();
    }
  };

  return viewModel;

}

Post.find = function(id) {
  var token = Session.getKey("rememberToken");
  return http.getJSON(config.apiUrl + "posts/" + id + ".json?remember_token=" + token).then(function(res) {
    return new Post(res);
  }, function (e) {
    console.log(e);
  });
}

Post.delete = function(id) {
  var token = Session.getKey("rememberToken");
  return http.request({
    url: config.apiUrl + "posts/" + id + ".json?remember_token=" + token,
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

/* */

module.exports = Post;
