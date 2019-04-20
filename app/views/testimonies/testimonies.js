var observableModule = require("data/observable");
var connectivity = require("connectivity");

var Dialogs = require("../../helpers/dialogs");
var HelperFunctions = require("../../helpers/helper_functions");
var Testimony = require("../../models/testimony");
var TestimonyList = new Testimony.List()

var page, testimony, testimonies, seeMoreTag;

exports.onNavigatingTo = function(args) {

  page = args.object;

  testimony = new Testimony();
  testimonies = TestimonyList.items()

  page.bindingContext = new observableModule.fromObjectRecursive({
    testimonies: testimonies,
    testimony: testimony,
  });
  
  connect = page.getViewById("connect");
  connect.bind({
    expression: "isSignedIn ? 'collapse' : 'visible'",
    sourceProperty: "isSignedIn",
    targetProperty: "visibility"
  }, Session.viewModel)

  seeMoreTag = page.getViewById("see-more");

  loadTestimonies();
};

exports.loadMore = function(args) {
  seeMoreTag.visibility = "collapse"
  page.bindingContext.set("loadingMore", true);
  TestimonyList.load().then(function(res) {
    if(res) {
      seeMoreTag.visibility = "visible";
    }
    page.bindingContext.set("loadingMore", false);
  });
};

exports.newTestimony = function() {
  var message = testimony.get("message");

  if(message.trim() === "") {
    Dialogs.error("Entrez un message");
    return;
  }

  page.getViewById("new-testimony").dismissSoftInput();

  testimony.save().then(function(res) {
    testimonies.unshift(res);
    testimony.set("message", "");
  });

}

exports.editTestimony = function(e) {
  var testimonyTag = e.object.parent.parent.getViewById("testimony");
  var text = testimonyTag.text;
  var id = testimonyTag.testimonyId;
  Dialogs.update(text).then(function(r) {
      if(r.text.trim() === "") {
        Dialogs.error("Entrez un message");
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
  Dialogs.delete("ce témoignage").then(function(result) {
    if(result) {
      Testimony.delete(id).then(function() {
        var indexOfTestimony = HelperFunctions.findByIdInArray(testimonies, id);
        testimonies.splice(indexOfTestimony, 1);
      });
    }
  });

};

function loadTestimonies() {
  seeMoreTag.visibility = "collapse"
  var connectionType = connectivity.getConnectionType();
  if (connectionType == connectivity.connectionType.none) {
    Dialogs.no_internet();
  } else {
    TestimonyList.empty();
    page.bindingContext.set("isLoading", true);
    TestimonyList.load().then(function() {
      page.bindingContext.set("isLoading", false);
      seeMoreTag.visibility = "visible"
    });
  }
}
