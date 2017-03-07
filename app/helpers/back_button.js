var frameModule = require("ui/frame");

function BackButton(page) {

  this.page = page;

  this.hide = function() {

    if(page.ios) {
      var controller = frameModule.topmost().ios.controller;
      var navigationItem = controller.visibleViewController.navigationItem;
      navigationItem.setHidesBackButtonAnimated(true, false);
    }
  }
}

module.exports = BackButton;
