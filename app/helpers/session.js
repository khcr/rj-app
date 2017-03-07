var appSettings = require("application-settings");

var Session = {

  get: function() {
    return JSON.parse(appSettings.getString("Session", "{}"));
  },

  getKey: function(key) {
    return this.get()[key];
  },

  set: function(params) {
    appSettings.setString("Session", JSON.stringify(params));
  },

  setKey: function(key, value) {
    var session = this.get();
    session[key] = value;
    this.set(session);
  },

  clear: function() {
    appSettings.remove("Session");
  }

}

module.exports = Session;
