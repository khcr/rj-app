const application = require("tns-core-modules/application");
const Session = require("./helpers/session");
const Push = require("./helpers/push");

if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyD1mWpWTelqXo9WEgWqddzMgdeNUem_hqE");
}

global.Session = Session;

application.on(application.launchEvent, function(args) {
  Push.register();
});

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
