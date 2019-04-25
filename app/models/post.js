var config = require("../config");

var http = require("tns-core-modules/http");
var observableModule = require("tns-core-modules/data/observable");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

var Upload = require("./upload");

function Post(params = {}) {

    var viewModel = new observableModule.fromObject({
      id: params.id || null,
      message: params.message || "",
      author: params.author || "",
      imageId: params.imageId || null,
      createdAtDate: params.createdAtDate || "",
      createdAtTime: params.createdAtTime || "",
      lastComment: params.lastComment || "",
      comments: params.comments || []
    });

    viewModel.save = function() {
      var post = this;

      if (post.get("imageField") === undefined) {

        return viewModel.request().then(function(res) {
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

            viewModel.request(response.id).then(function(res) {
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

    viewModel.request = function(image_id) {
      return http.request({
        url: config.apiUrl + "posts.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          post: { message: this.get("message"), image_id: image_id },
          remember_token: Session.getKey("rememberToken")
        })
      });
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

  this._items = new ObservableArray();

  this.items = function() {
    return this._items;
  };

  this.pageNumber = 1;

  this.load = function() {
    var list = this;
    var token = Session.getKey("rememberToken");
    return http.getJSON(config.apiUrl + "posts.json?page=" + list.pageNumber + "&remember_token=" + token).then(function(res) {
      if(!res.length) {
        return false;
      }
      list.pageNumber++;
      res.forEach(function(post) {
        list._items.push(post);
      });
      return list._items;
    }, function(e) {
      console.log(e);
    });
  };

  this.empty = function() {
    this.pageNumber = 1;
    this._items.splice(0);
  };
}

Post.find = function(id) {
  var token = Session.getKey("rememberToken");
  return http.getJSON(config.apiUrl + "posts/" + id + ".json?remember_token=" + token).then(function(res) {
    return new observableModule.fromObject(res);
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
