var config = require("../../../../config");

var page;

exports.loaded = function(args) {
  page = args.object;

  var url = config.rootUrl + "signup/new";

  page.bindingContext = {
    url: url
  };

  page.actionBar.title = "S'inscrire";

};
