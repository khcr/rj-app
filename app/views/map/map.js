var mapsModule = require("nativescript-google-maps-sdk");
var Color = require("color").Color;
var Marker = require("../../models/marker");

var page, points;

exports.onNavigatingTo = function(args) {
  page = args.object;
}

exports.mapReady = function(args) {
  var mapView = args.object;
  mapView.zoom = 16;
  mapView.latitude = 46.614952;
  mapView.longitude = 7.049605;

  // Marker.all().then(function (res) {
  //   points = res;

  //   var polygon = new mapsModule.Polygon();
  //   polygon.addPoints([
  //     mapsModule.Position.positionFromLatLng(46.615257, 7.047751),
  //     mapsModule.Position.positionFromLatLng(46.614675, 7.047987),
  //     mapsModule.Position.positionFromLatLng(46.614933, 7.049425),
  //     mapsModule.Position.positionFromLatLng(46.615560, 7.049167)
  //   ]);
  //   polygon.visible = true;
  //   polygon.fillColor = new Color('#fffb00');
  //   polygon.strokeColor = new Color('#555');
  //   polygon.strokeWidth = 1;
  //   mapView.addPolygon(polygon);

  //   points.forEach(function(point) {
  //     var marker = new mapsModule.Marker();
  //     marker.position = mapsModule.Position.positionFromLatLng(point.lat, point.lng);
  //     marker.title = point.title;
  //     marker.snippet = point.content;
  //     mapView.addMarker(marker);
  //   });
  // });

}
