var BackButton = require("../../../helpers/back_button");

var Tabs = require("../../../helpers/tabs");

var page;
var tabs = new Tabs();

exports.loaded = function(args) {

  page = args.object;

  new BackButton(page).hide();

  tabs.load(page);

}

exports.toAgenda = function() {
  tabs.navigateTo("agenda");
}

exports.toFeed = function() {
  tabs.navigateTo("feed");
}

exports.toTestimonies = function() {
  tabs.navigateTo("testimonies");
}

exports.toPlus = function() {
  tabs.navigateTo("plus");
}
