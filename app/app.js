const application = require("tns-core-modules/application");
const Session = require("./helpers/session");
const Push = require("./helpers/push");

if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyD1mWpWTelqXo9WEgWqddzMgdeNUem_hqE");
}

global.Session = new Session();

application.on(application.launchEvent, function(args) {
  Push.register();
});

// application.on(application.launchEvent, (args) => {
//   if (args.android) {
//       // For Android applications, args.android is an android.content.Intent class.
//       console.log("Launched Android application with the following intent: " + args.android + ".");
//   } else if (args.ios !== undefined) {
//       // For iOS applications, args.ios is NSDictionary (launchOptions).
//       console.log("Launched iOS application with options: " + args.ios);
//   }
// });


application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
