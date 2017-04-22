var frameModule = require("ui/frame");

var container;

exports.loaded = function(args) {
  container = args.object;

  // Set layout position in GridLayout
  stackLayout = container.getViewById("navbar");
  stackLayout.row = container.row;

  var className = container.pageName;
  var button = container.getViewById(className);
  button.className = button.className + " current";
}

exports.toAgenda = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/agenda/agenda");
}

exports.toFeed = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/feed/feed");
}

exports.toTestimonies = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/testimonies/testimonies");
}

exports.toPlus = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/plus/plus");
}
