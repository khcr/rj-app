var scrollViewModule = require("ui/scroll-view");

var BackButton = require("../../helpers/back_button");

var page;

exports.loaded = function(args) {
  page = args.object;

  new BackButton(page).hide();
}
