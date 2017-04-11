var BackButton = require("../../helpers/back_button");
var Observable = require("data/observable").Observable;

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
  
  var isLoading = new Observable(true);
  page.bindingContext.set("isLoading", isLoading);

  new BackButton(page).hide();

  TestimonyList.empty();
  TestimonyList.all().then(function() {
    page.bindingContext.set("isLoading", false);
  });
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

exports.editTestimony = function(e) {
  var testimonyTag = e.object.parent.getViewById("testimony");
  var text = testimonyTag.text;
  var id = testimonyTag.testimonyId;
  dialogsModule.prompt({
    title: "Edit",
    okButtonText: "Save",
    cancelButtonText: "Cancel",
    defaultText: text,
    inputType: dialogsModule.inputType.text
  }).then(function(r) {
      if(r.text.trim() === "") {
        dialogsModule.alert({
          message: "Enter a message",
          okButtonText: "OK"
        });
      } else if(r.result) {
        var comment = new Testimony({ message: r.text, id: id });
        comment.update().then(function(res) {
          testimonyTag.text = r.text;
        });
      }
  });
};

exports.deleteTestimony = function(e) {
  var testimonyTag = e.object;
  var id = testimonyTag.testimonyId;
  dialogsModule.confirm("Do you really want to delete this testimony ?").then(function(result) {
    if(result) {
      Testimony.delete(id).then(function() {
        testimonyTag.parent.parent.parent.visibility = "collapse";
      });
    }
  });

};
