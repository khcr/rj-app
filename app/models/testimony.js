var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

function Testimony(params) {

    params = params || {};

    var viewModel = new Observable({
      id: params.id || null,
      message: this.message || "",
      author: this.author || ""
    });

    viewModel.save = function() {
      return http.request({
        url: config.apiUrl + "testimonies.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          testimony: { message: this.message },
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

/* List */

Testimony.List = function() {

  var viewModel =  new ObservableArray();

  viewModel.all = function() {
    return http.getJSON(config.apiUrl + "testimonies.json").then(function(res) {
      res.forEach(function(testimony) {
        viewModel.push(testimony);
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
/* */

module.exports = Testimony;
