var config = require("../config");

var bghttp = require("nativescript-background-http");
var observableModule = require("data/observable");

function Upload(imageUrl) {

    var viewModel = new observableModule.fromObject({
      imageUrl: imageUrl
    });

    viewModel.save = function() {
      var session = bghttp.session("image-upload");

      var request = {
          url: config.apiUrl + "images.json",
          method: "POST",
          headers: {
              "Content-Type": "image/jpeg"
          },
      };

      return session.uploadFile(this.get("imageUrl"), request);

    }

    return viewModel;

}

/* */


module.exports = Upload;
