var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;

function User(params) {

    params = params || {};

    var viewModel = new Observable({
        name: params.name || "",
        email: params.email || "",
        password: params.password || ""
    });

    viewModel.signIn = function() {
      return http.request({
        url: config.apiUrl + "users/signin",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({user: { email: this.email, password: this.password }})
      }).then(function(res) {
        var result = res.content.toJSON();
        Session.set(result);
      }, function (e) {
        console.log(e);
        throw Error();
      });
    }

    viewModel.signUp = function() {

    }

    return viewModel;
}

/* Class methods */

User.find = function(token) {
  return http.getJSON(config.apiUrl + "users/" + token + ".json").then(function(res) {
    return new User(res);
  }, function (e) {
    console.log(e);
    throw Error();
  });
}

User.signOut = function() {
  Session.clear()
}

/* */

module.exports = User;
