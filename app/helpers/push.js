var dialogsModule = require("ui/dialogs");
var pushPlugin = require("nativescript-push-notifications");

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
    pushPlugin.register(Push.pushSettings, function(){}, function(){});
  }

}
module.exports = Push;
