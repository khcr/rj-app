var config = require("../../../config");

var page;

exports.onNavigatingTo = function(args) {
  page = args.object;

  var url = config.rootUrl + "signup/new";

  page.bindingContext = {
    url: url
  };
};
