var frameModule = require("ui/frame");

var Router = {

  navigateTo: function(pageName, pagePath, options = {}) {
    var topmost = frameModule.topmost();
    topmost.navigate({ moduleName: "views/pages/base/base", context: { pageName: pageName, pagePath: pagePath }, clearHistory: options["clearHistory"], animated: options["animated"] });
  }

};

module.exports = Router;
