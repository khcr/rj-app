var dialogsModule = require("tns-core-modules/ui/dialogs");
var messaging = require("nativescript-plugin-firebase/messaging").messaging;
var appSettings = require("tns-core-modules/application-settings");
var platformModule = require("tns-core-modules/platform");

var Device = require("../models/device");

var Push = {

  ask: function() {
    appSettings.hasKey("arePushRegistred");
    var hasAnswered = appSettings.hasKey("arePushRegistred");
    if (!hasAnswered) {
      dialogsModule.confirm({
        title: "Notifications",
        message: "Voulez-vous recevoir les notifications push ?",
        okButtonText: "Oui !",
        cancelButtonText: "Non merci",
        neutralButtonText: "Annuler"
      }).then(function(answer) {
        if (answer == true) {
          Push.register();
        } else if (answer == false) {
          appSettings.setBoolean("arePushRegistred", false);
        }
      });
    }
  },

  register: function() {
    messaging.registerForPushNotifications({
      onPushTokenReceivedCallback: Push.onTokenReceived,
      onMessageReceivedCallback: Push.onNotificationReceived
    });
  },

  callbacks: function() {
    if (appSettings.getBoolean("arePushRegistred", false)) {
      messaging.addOnPushTokenReceivedCallback(Push.onTokenReceived);
      messaging.addOnMessageReceivedCallback(Push.onNotificationReceived);
    }
  },

  onTokenReceived: function(token) {
    var device = new Device(token, platformModule.device.os);
    device.save().then(function() {
      appSettings.setBoolean("arePushRegistred", true);
    });
  },

  onNotificationReceived: function(message) {
    if (platformModule.isAndroid) {
      message = (message !== undefined && message.body !== undefined ? message.body : "");
    } else {
      message = (message !== undefined && message.data.aps.alert !== undefined ? message.data.aps.alert : "");
    }
    //dialogsModule.alert(JSON.stringify(message));
    setTimeout(() => {
      dialogsModule.alert({
        title: "Notification",
        message: message,
        okButtonText: "Compris"
      });
    }, 500);
  }

}
module.exports = Push;
