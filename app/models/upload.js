var config = require("../config");

var bghttp = require("nativescript-background-http");
var observableModule = require("data/observable");

function Upload(imageUrl) {

    var viewModel = new observableModule.fromObject({
      imageUrl: imageUrl
    });

    console.log(imageUrl)

    viewModel.save = function() {
      var session = bghttp.session("image-upload");

      var request = {
          url: config.apiUrl + "images.json",
          method: "POST",
          headers: {
              "Content-Type": "image/jpeg"
          },
      };

      console.log(this.get("imageUrl"))
      return session.uploadFile(this.get("imageUrl"), request);

    }

    return viewModel;

}

/* */


module.exports = Upload;
