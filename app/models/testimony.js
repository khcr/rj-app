var config = require("../config");

var http = require("tns-core-modules/http");
var observableModule = require("tns-core-modules/data/observable");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

function Testimony(params) {

    params = params || {};

    var viewModel = new observableModule.fromObject({
      id: params.id || null,
      message: params.message || "",
      author: params.author || ""
    });

    viewModel.save = function() {
      return http.request({
        url: config.apiUrl + "testimonies.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          testimony: { message: this.get("message") },
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
        url: config.apiUrl + "testimonies/" + this.get("id") + ".json",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          testimony: { message: this.get("message") },
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

Testimony.List = function() {

  this._items = new ObservableArray();

  this.items = function() {
    return this._items;
  };

  this.pageNumber = 1;

  this.load = function() {
    var list = this;
    var token = Session.getKey("rememberToken");
    return http.getJSON(config.apiUrl + "testimonies.json?page=" + list.pageNumber + "&remember_token=" + token).then(function(res) {
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

Testimony.delete = function(id) {
  var token = Session.getKey("rememberToken");
  return http.request({
    url: config.apiUrl + "testimonies/" + id + ".json?remember_token=" + token,
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

module.exports = Testimony;
