var BackButton = require("../../helpers/back_button");

var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");

var Testimony = require("../../models/testimony");
var TestimonyList = new Testimony.List()

var page;
var testimony = new Testimony();

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = testimony;
  page.bindingContext.set("testimonies", TestimonyList);
  page.bindingContext.set("isSignedIn", Session.getKey("isSignedIn"));

  new BackButton(page).hide();

  TestimonyList.empty();
  TestimonyList.all();
};

exports.newTestimony = function() {
  var message = testimony.get("message");

  if(message.trim() === "") {
    dialogsModule.alert({
      message: "Enter a message",
      okButtonText: "OK"
    });
    return;
  }

  testimony.save().then(function(res) {
    TestimonyList.unshift(res);
    testimony.set("message", "");
  });

}
