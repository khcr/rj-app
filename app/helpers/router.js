var frameModule = require("ui/frame");

var Router = {

  navigateTo: function(pageName, pagePath) {
    var topmost = frameModule.topmost();
    topmost.navigate({ moduleName: "views/pages/base/base", context: { pageName: pageName, pagePath: pagePath }});
  }

};

module.exports = Router;
