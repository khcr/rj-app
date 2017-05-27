var page;

exports.loaded = function(args) {
  page = args.object;

  page.actionBar.title = "About";
}
