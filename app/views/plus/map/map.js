var mapsModule = require("nativescript-google-maps-sdk");
var Color = require("color").Color;

var points = [
  {
    lat: 46.615451,
    lng: 7.057727,
    title: "Salut",
    content: "text..."
  },
  {
    lat: 46.615451,
    lng: 7.067727,
    title: "Salut",
    content: "text..."
  }
];

exports.loaded = function(args) {
  var page = args.object;
  console.log("Page Loaded");
}

exports.mapReady = function(args) {
  console.log("Map Ready");

  var mapView = args.object;

  var polygon = new mapsModule.Polygon();
  polygon.addPoints([
    mapsModule.Position.positionFromLatLng(46.615257, 7.047751),
    mapsModule.Position.positionFromLatLng(46.614675, 7.047987),
    mapsModule.Position.positionFromLatLng(46.614933, 7.049425),
    mapsModule.Position.positionFromLatLng(46.615560, 7.049167)
  ]);
  polygon.visible = true;
  polygon.fillColor = new Color('#329597');
  polygon.strokeColor = new Color('#ffffff');
  polygon.strokeWidth = 5;
  mapView.addPolygon(polygon);

  points.forEach(function(point) {
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(point.lat, point.lng);
    marker.title = point.title;
    marker.snippet = point.content;
    mapView.addMarker(marker);
  })

}