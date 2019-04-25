var fs = require('tns-core-modules/file-system');
var imagepickerModule = require("nativescript-imagepicker");
var permissions = require( "nativescript-permissions");
var platformModule = require("tns-core-modules/platform");
var camera = require("nativescript-camera");
var imageSource = require("tns-core-modules/image-source");
var bitmapFactory = require("nativescript-bitmap-factory");

var Imagepicker = {

  permission: function() {
    camera.requestPermissions();
  },

  select: function() {
    if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
      return permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
      .then(function() {
        return Imagepicker._start();
      })
      .catch(function() {
        console.log("Unauthorized to access external storage")
      });
    } else {
      return Imagepicker._start();
    }
  },

  take: function() {
    console.log("START")
    return camera.takePicture().then(function(imageAsset) {
      return imageSource.fromAsset(imageAsset).then(function(imageSource) {
        return Imagepicker._saveTempfile(imageSource);
      });
    }).catch(function(e) {
      console.log(e);
    });
  },

  _start: function() {

    var context = imagepickerModule.create({
      mode: "single"
    });

    return context.authorize().then(function() {
      return context.present();
    }).then(function(selection) {
      var source = new imageSource.ImageSource();
      return source.fromAsset(selection[0]).then(function(imageSource) {
        return Imagepicker._saveTempfile(imageSource)
      });
    }).catch(function (e) {
      console.log(e);
    });
  },

  _saveTempfile: function(imageSource) {

    var folder = fs.knownFolders.documents();
    var filename = "img_" + new Date().getTime() + ".jpeg";
    var path = fs.path.join(folder.path, filename);
    var saved = Imagepicker.resize(imageSource).saveToFile(path, "jpeg");
    if(saved) {
      return { path: path, source: imageSource };
    }

    return false;
  },

  resize: function(imageSource) {

    var mutableSource = bitmapFactory.makeMutable(imageSource);
    var factory = bitmapFactory.create(imageSource.width, imageSource.height);

    return factory.dispose(function(b) {
      b.insert(mutableSource);
      var b2 = b.resizeMax(1200);
      var imageResized = b2.toImageSource();
      return imageResized;
    });
  }

}

module.exports = Imagepicker;
