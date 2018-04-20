var builderModule = require('ui/builder');
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var application = require("application");

function Tabs() {

  // register start event
  StackLayout.startEvent = "start";

  var page;

  var containers = {};
  var tabs = ["feed", "agenda", "testimonies", "plus"];
  var currentTab = "feed";
  var container;

  var isLoaded = false;
  application.on(application.exitEvent, function() {
    isLoaded = false;
  });

  this.load = function(pageObject) {
    page = pageObject;
    container = page.getViewById("container");
    if (pageReload() || !isLoaded) {
      tabs.forEach(function(tab) {
        loadModule("views/tabs/" + tab, tab);
        containers[tab] = page.getViewById(tab);
        containers[tab].notify({ eventName: "start", object: containers[tab] });
      });
      this.navigateTo(currentTab);
      isLoaded = true;
    }
  };

  this.navigateTo = function(tab) {
    containers[currentTab].visibility = "collapse";
    containers[tab].notify({ eventName: "navigatedTo" })
    containers[tab].visibility = "visible";
    currentTab = tab;
  };

  var loadModule = function(path, name) {
    var view = builderModule.load({
      path: path,
      name: name,
      page: page,
      attributes: { actionBar: page.actionBar }
    });

    container.addChild(view);
  };

  var pageReload = function() {
    if (page.navigationContext) {
      var reload = page.navigationContext.reload;
      page.navigationContext.reload = false;
    }
    return reload;
  }

}

module.exports = Tabs;
