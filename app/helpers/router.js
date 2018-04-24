var frameModule = require("ui/frame");

var Router = {

  navigateTo: function(pageName, pagePath, options = {}, contextOpts = {}) {
    var topmost = frameModule.topmost();
    var context = Object.assign({ pageName: pageName, pagePath: pagePath }, contextOpts);
    var entry = Object.assign({ moduleName: "views/pages/base/base", context: context }, options);
    topmost.navigate(entry);
  }

};

module.exports = Router;
