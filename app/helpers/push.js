var dialogsModule = require("ui/dialogs");
var pushPlugin = require("nativescript-push-notifications");
var appSettings = require("application-settings");

var Device = require("../models/device");

var Push = {

  pushSettings: {
    senderID: "45207150261",
    notificationCallbackAndroid: function (stringifiedData, fcmNotification) {
      var notificationBody = fcmNotification && fcmNotification.getBody();
      dialogsModule.alert({
        message: notificationBody,
        okButtonText: "Compris"
      });
    }
  },

  register: function() {
    var arePushRegistred = appSettings.getBoolean("arePushRegistred");
    if(!arePushRegistred) {
      pushPlugin.register(Push.pushSettings, function(token) {
        var device = new Device(token);
        device.save();
        appSettings.setBoolean("arePushRegistred", true);
      }, function(){});
    }
  }

}
module.exports = Push;
