var application = require("application");
var frameModule = require("ui/frame");
var ImageModule = require("ui/image");
var Session = require("./helpers/session");

if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyDvStGlE8wti9VDbJ9YTbn58ljwWI1hQQU");
}

frameModule.Frame.defaultAnimatedNavigation = false;

global.Session = Session;

application.start({ moduleName: "views/feed/feed" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/