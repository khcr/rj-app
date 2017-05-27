var builderModule = require('ui/builder');
var StackLayout = require("ui/layouts/stack-layout").StackLayout;

var BackButton = require("../../../helpers/back_button");

var page, container, isLoaded;

var containers = {};
var isLoaded = false;
var tabs = ["feed", "agenda", "testimonies", "plus"];
var currentTab = "feed";

StackLayout.startEvent = "start";

exports.loaded = function(args) {
  page = args.object;
  container = page.getViewById("container");

  if(!isLoaded) {
    tabs.forEach(function(tab) {
      loadModule("views/tabs/" + tab, tab);
      containers[tab] = page.getViewById(tab);
      containers[tab].notify({ eventName: "start", object: containers[tab] });
    });
    navigateTo(currentTab);
    isLoaded = true;
  }

  new BackButton(page).hide();

}

function loadModule(path, name) {
  var view = builderModule.load({
    path: path,
    name: name,
    page: page,
    attributes: { actionBar: page.actionBar }
  });

  container.addChild(view);
}

function navigateTo(tab) {
  containers[currentTab].visibility = "collapse";
  containers[tab].notify({ eventName: "navigatedTo" })
  containers[tab].visibility = "visible";
  currentTab = tab;
}

exports.toAgenda = function() {
  navigateTo("agenda");
}

exports.toFeed = function() {
  navigateTo("feed");
}

exports.toTestimonies = function() {
  navigateTo("testimonies");
}

exports.toPlus = function() {
  navigateTo("plus");
}
