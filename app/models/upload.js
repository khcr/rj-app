var config = require("../config");

var bghttp = require("nativescript-background-http");
var Observable = require("data/observable").Observable;

function Upload(imageUrl) {

    var viewModel = new Observable({
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
