var appSettings = require("tns-core-modules/application-settings");
var observableModule = require("tns-core-modules/data/observable");

function Session() {

  var defaultOptions = {
    "rememberToken": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "imageUrl": "",
    "isAdmin": false,
    "isSignedIn": false,
    "imageUrl": ""
  };

  var setSettings = function(params) {
    appSettings.setString("Session", JSON.stringify(params));
  };

  var getSettings = function() {
    return JSON.parse(appSettings.getString("Session"));
  };

  if (!appSettings.hasKey("Session")) {
    setSettings(defaultOptions);
  }

  this.viewModel = new observableModule.fromObject(getSettings());

  this.set = function(params) {
    var settings = getSettings();
    for (var key in params) {
      this.viewModel.set(key, params[key]);
      settings[key] = params[key]
    }
    setSettings(settings);
  };

  this.getKey = function(key) {
    return this.viewModel.get(key);
  };

  this.setKey = function(key, value) {
    this.viewModel.set(key, value);
    var settings = getSettings();
    settings[key] = value
    setSettings(settings);
  };

  this.clear = function() {
    for (var key in defaultOptions) {
      this.viewModel.set(key, defaultOptions[key])
    } 
    setSettings(defaultOptions);
  };

  this.observable = this.viewModel;

}

module.exports = Session;
