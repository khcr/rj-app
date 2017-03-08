var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;

function User(params) {

    params = params || {};

    var viewModel = new Observable({
        _genders: ["male", "female"],
        genders: ["Homme", "Femme"],
        gender: params.gender || "",
        firstname: params.firstname || "",
        lastname: params.firstname || "",
        email: params.email || "",
        password: params.password || "",
        password_confirmation: params.passwordConfirmation || "",
        isSignedIn: params.isSignedIn || false,
        isAdmin: params.isAdmin || false,
    });

    viewModel.setGender = function(index) {
      this.gender = this._genders[index];
    }

    viewModel.signIn = function() {
      return http.request({
        url: config.apiUrl + "users/signin",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ user: { email: this.email, password: this.password }})
      }).then(function(res) {
        if(res.statusCode !== 200) { throw Error() };
        var result = res.content.toJSON();
        Session.set(result);
      }, function(e) {
        console.log(e);
      });
    }

    viewModel.signUp = function() {
      return http.request({
        url: config.apiUrl + "users",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ user: this })
      }).then(function(res) {
        var result = res.content.toJSON();
        if(res.statusCode !== 200) { throw result.errors; }
      }, function(e) {
        console.log(e);
      });
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
