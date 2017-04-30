var config = require("../config");

var http = require("http");
var Observable = require("data/observable").Observable;

var Upload = require("./upload");

function User(params) {

    params = params || {};

    var viewModel = new Observable({
        gender: params.gender || "",
        firstname: params.firstname || "",
        lastname: params.lastname || "",
        email: params.email || "",
        password: params.password || "",
        password_confirmation: params.passwordConfirmation || "",
        isSignedIn: params.isSignedIn || false,
        isAdmin: params.isAdmin || false,
        imageUrl: params.imageUrl || ""
    });

    viewModel._genders = ["male", "female"];
    viewModel.genders = ["Homme", "Femme"];

    viewModel.setGender = function(index) {
      this.gender = this._genders[index];
    };

    viewModel.getGenderIndex = function(name) {
      return this._genders.indexOf(name);
    };

    viewModel.getGenderName = function(name) {
      return this.genders[this.getGenderIndex(name)];
    };

    viewModel.signIn = function() {
      return http.request({
        url: config.apiUrl + "users/signin.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ user: { email: this.get("email"), password: this.get("password") }})
      }).then(function(res) {
        if(res.statusCode !== 200) { throw Error() };
        var result = res.content.toJSON();
        Session.set(result);
        return result;
      }, function(e) {
        console.log(e);
      });
    };

    viewModel.signUp = function() {
      return http.request({
        url: config.apiUrl + "users.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ user: this })
      }).then(function(res) {
        var result = res.content.toJSON();
        if(res.statusCode !== 200) { throw result.errors; }
        return result;
      }, function(e) {
        console.log(e);
      });
    };

    viewModel.update = function() {
      var token = Session.getKey("rememberToken");
      return http.request({
        url: config.apiUrl + "users/" + token + ".json",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ user: this })
      }).then(function(res) {
        var result = res.content.toJSON();
        if(res.statusCode !== 200) { throw result.errors; }
        Session.set(result);
        return result;
      }, function(e) {
        console.log(e);
      });
    };

    viewModel.saveImage = function() {
      var user = this;

      var upload = new Upload(user.get("imageField"));
      var task = upload.save();

      var promise = new Promise(function(resolve, reject) {

        task.on("error", function(e) {
          // TODO: dialogs
        });
        task.on("responded", function(e) {

          var response = JSON.parse(e.data);
          var token = Session.getKey("rememberToken");

          http.request({
            url: config.apiUrl + "users/" + token + ".json",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ user: { image_id: response.id }})
          }).then(function(res) {
            var result = res.content.toJSON();
            if(res.statusCode !== 200) { throw result.errors; }
            Session.set(result);
            resolve(result);
          }, function (e) {
            reject(e);
          });
        });
      });
      return promise;
    };

    return viewModel;
}

/* Class methods */

User.find = function(token) {
  return http.getJSON(config.apiUrl + "users/" + token + ".json").then(function(res) {
    return new User(res);
  }, function (e) {
    console.log(e);
  });
}

User.signOut = function() {
  Session.clear()
}

/* */

module.exports = User;
