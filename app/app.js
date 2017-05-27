var application = require("application");
var Session = require("./helpers/session");
var Router = require("./helpers/router");

if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyDvStGlE8wti9VDbJ9YTbn58ljwWI1hQQU");
}

global.Session = Session;
global.Router = Router;

application.start({ moduleName: "views/tabs/base/base" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
