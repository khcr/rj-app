var dialogsModule = require("ui/dialogs");
var pushPlugin = require("nativescript-push-notifications");
var appSettings = require("application-settings");
var application = require("application");
var platformModule = require("tns-core-modules/platform");

var Device = require("../models/device");

var Push = {

  androidSettings: {
    senderID: "45207150261",
    notificationCallbackAndroid: function (stringifiedData, fcmNotification) {
      var notificationBody = fcmNotification && fcmNotification.getBody();
      dialogsModule.alert({
        message: notificationBody,
        okButtonText: "Compris"
      });
    }
  },

  iosSettings: {
    senderID: "45207150261",
    badge: true,
    sound: true,
    alert: true,
    notificationCallbackIOS: function(data) {
      console.dir(data);
      var notificationBody = data.alert;
      dialogsModule.alert({
        title: "Notification",
        message: notificationBody,
        okButtonText: "Compris"
      });
    }
  },

  getSettings: function() {
    if(application.android) {
       return Push.androidSettings;
    } else if(application.ios) {
       return Push.iosSettings;
    }
  },

  register: function() {
    var arePushRegistred = appSettings.getBoolean("arePushRegistred");
    if(!arePushRegistred) {
      pushPlugin.register(Push.getSettings(), function(token) {
        var device = new Device(token, platformModule.device.os);
        device.save().then(function() {
          appSettings.setBoolean("arePushRegistred", true);
        });
      }, function(){});
    }
  }

}
module.exports = Push;
