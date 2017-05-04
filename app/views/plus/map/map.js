var vmModule = require("./main-view-model");
var observableModule = require("data/observable");
var mapsModule = require("nativescript-google-maps-sdk");

function wait(milliSeconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(milliSeconds);
    }, milliSeconds);
  });
}

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;



function onMapReady(args) {
  console.log("onMapReady");

  
}

exports.onMapReady = onMapReady;
exports.onCoordinateTapped = onCoordinateTapped;
exports.onMarkerEvent = onMarkerEvent;
exports.onCameraChanged = onCameraChanged;