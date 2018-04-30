var application = require("application");
var frameModule = require("ui/frame");
var Session = require("./helpers/session");
var Router = require("./helpers/router");
var Push = require("./helpers/push");

if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyD1mWpWTelqXo9WEgWqddzMgdeNUem_hqE");
}

global.Session = Session;
global.Router = Router;

application.on(application.launchEvent, function(args) {
  Push.register();
});

application.start({ moduleName: "views/tabs/base/base" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
