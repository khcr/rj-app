var builderModule = require('ui/builder');
var Observable = require("data/observable").Observable;

var page, container;
var pageData = new Observable({
  isNavigating: false
})

exports.loaded = function(args) {

  page = args.object;
  page.bindingContext = pageData;
  container = page.getViewById("container");

  page.on("navigatingFrom", function() {
    pageData.set("isNavigating", true);
  });

  page.on("navigatedFrom", function() {
    pageData.set("isNavigating", false);
  });

  var pageName = page.navigationContext.pageName;
  var pagePath = page.navigationContext.pagePath || pageName;

  var view = builderModule.load({
    path: "views/pages/" + pagePath,
    name: pageName,
    page: page,
    attributes: {
      navigationContext: page.navigationContext,
      actionBar: page.actionBar
    }
  });

  container.removeChildren();
  container.addChild(view);

}
